# cards
## Генерация SQL для загрузки словарей (стоим уровнем выше чем каталог dict)
```sql
find dict -not -name "* all" -not -type d -exec node scripts/makedict.js -f {} \; > inserts.sql
```

## Загрузка в БД
```sql
PGPASSWORD=cards_forever psql postgresql://cards@127.0.0.1/cards -f inserts.sql
```
