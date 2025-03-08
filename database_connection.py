import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host = '127.0.0.1',
        user = 'root',
        password = 'Pratik@99.?!',
        database = 'analysis-before-wicket'
        )