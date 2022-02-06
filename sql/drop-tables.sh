#!/bin/sh
PGPASSWORD=cards_forever psql postgresql://cards@127.0.0.1/cards -A -E -t -q -c \
"DROP TABLE dict_map_en_ru;
DROP TABLE dict_ru;
DROP TABLE dict_en;"
