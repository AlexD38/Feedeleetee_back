## Credentials for db connection : 

export PGUSER=fee
export PGPASSWORD=fee
export PGDATABASE=fee

# init configuration
#bash init_db.sh

# create tables 
psql -f ./data/tables.sql

#seed database
psql -f  ./data/data.sql

#functions
psql -f ./data/functions/getNextAppointments.sql
psql -f ./data/functions/quickView.sql

#views
 psql -f ./data/views/views.sql