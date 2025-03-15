import mysql.connector
def get_db_connection():
    return mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = 'Pratik@99.13?!',
        database = 'analysis_before_wicket')