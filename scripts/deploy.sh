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
#psql -f ./data/functions/verify_clientid_before_update_appointment.sql
#psql -f ./data/functions/insert_user.sql

#views
 psql -f ./data/views/views.sql