
# init 
#sudo -i -u postgres psql;
#owner creation script
CREATE ROLE IF NOT EXISTS fee
WITH LOGIN PASSWORD 'fee';

# database creation script
CREATE DATABASE IF NOT EXISTS fee
WITH OWNER = fee;