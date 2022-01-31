#!/bin/sh
PGPASSWORD=cards_forever psql postgresql://cards@127.0.0.1/cards -A -E -t -q -c \
          "DROP DATABASE CARDS;"
