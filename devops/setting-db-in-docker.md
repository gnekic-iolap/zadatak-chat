docker run -p 3306:3306 --name MLM-BAZA -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=proba -d mysql:latest

docker exec -it MLM-BAZA bash
mysql -uroot -p

ALTER USER root IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';