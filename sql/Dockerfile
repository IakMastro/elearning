FROM postgres:14.2-alpine3.15

COPY *.csv /data/
COPY *.sql /docker-entrypoint-initdb.d/

EXPOSE 5432