#!/bin/sh
PGPASSWORD=cards_forever psql postgresql://cards@127.0.0.1/cards -A -E -t -q -c \
"CREATE TABLE dict_en(id uuid PRIMARY KEY, word text NOT NULL);

CREATE TABLE dict_ru(id uuid PRIMARY KEY, word text NOT NULL);

CREATE TABLE dict_map_en_ru(id_en uuid NOT NULL,id_ru uuid NOT NULL,
       CONSTRAINT fk_dict_en FOREIGN KEY(id_en) REFERENCES dict_en(id),
       CONSTRAINT fk_dict_ru FOREIGN KEY(id_ru) REFERENCES dict_ru(id)
);
CREATE INDEX dict_en_word_idx ON dict_en (word);
CREATE INDEX dict_ru_word_idx ON dict_ru (word);
"
