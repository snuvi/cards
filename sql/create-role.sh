#!/bin/sh
PGPASSWORD=postgres psql postgresql://postgres@127.0.0.1 -A -E -t -q -c "CREATE ROLE cards WITH PASSWORD 'cards_forever' LOGIN;"
