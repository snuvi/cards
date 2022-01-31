PGPASSWORD=postgres psql postgresql://postgres@127.0.0.1 -A -E -t -q -c "CREATE DATABASE cards WITH OWNER cards ENCODING 'UTF8';"
