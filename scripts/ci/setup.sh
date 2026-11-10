#!/usr/bin/env bash
# Heavy setup for the scratch adopter: PostgreSQL with pgvector built from source, a role and a
# database, and DATABASE_URL exported for every later step. Takes minutes on a cold runner on
# purpose: it is the setup cost a sandbox image would remove.
set -euo pipefail
PGVECTOR_VERSION="${PGVECTOR_VERSION:-v0.8.1}"
# Every network or service call is bounded: a stalled mirror, dpkg lock or clone fails the step in minutes instead of
# holding a CI job (and the merge queue behind it) for an hour.
APT_OPTS=(-o Acquire::Retries=3 -o Acquire::http::Timeout=30 -o Acquire::https::Timeout=30 -o DPkg::Lock::Timeout=120)
apt_get() { timeout -k 10 300 sudo apt-get "${APT_OPTS[@]}" "$@"; }
if command -v pg_config >/dev/null 2>&1; then
  apt_get update -qq
  apt_get install -y -qq "postgresql-server-dev-$(pg_config --version | sed -E 's/PostgreSQL ([0-9]+).*/\1/')" build-essential git >/dev/null
else
  apt_get update -qq && apt_get install -y -qq postgresql postgresql-server-dev-all build-essential git >/dev/null
fi
timeout -k 10 120 sudo systemctl start postgresql || timeout -k 10 120 sudo service postgresql start
tmp="$(mktemp -d)"
timeout -k 10 180 git clone -q --depth 1 --branch "$PGVECTOR_VERSION" https://github.com/pgvector/pgvector.git "$tmp/pgvector"
make -s -C "$tmp/pgvector" with_llvm=no >/dev/null
sudo make -s -C "$tmp/pgvector" install with_llvm=no >/dev/null
sudo -u postgres psql -v ON_ERROR_STOP=1 -q <<'SQL'
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'factory') THEN CREATE ROLE factory LOGIN PASSWORD 'factory' SUPERUSER; END IF; END $$;
SQL
sudo -u postgres psql -q -tc "SELECT 1 FROM pg_database WHERE datname = 'factory'" | grep -q 1 || sudo -u postgres createdb -O factory factory
# The extension lives in public, created once, so test files that each migrate their own schema in
# parallel never race to create it and never drop it with their schema.
sudo -u postgres psql -v ON_ERROR_STOP=1 -q -d factory -c "CREATE EXTENSION IF NOT EXISTS vector SCHEMA public"
export DATABASE_URL="postgres://factory:factory@localhost:5432/factory"
if [ -n "${GITHUB_ENV:-}" ]; then echo "DATABASE_URL=$DATABASE_URL" >> "$GITHUB_ENV"; fi
echo "setup: postgres ready at $DATABASE_URL with pgvector $PGVECTOR_VERSION"
