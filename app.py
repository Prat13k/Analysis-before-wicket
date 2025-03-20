from flask import Flask, render_template, request, redirect, url_for
from database_connection import get_db_connection

app = Flask(__name__, template_folder = 'templates')

@app.route('/')
def main():
    db = get_db_connection()
    cursor = db.cursor(dictionary = True)
    cursor.execute("SELECT blog_title, blog_content FROM blog_details ORDER BY blog_publish_date DESC")
    blog_details = cursor.fetchall()
    db.close()
    return render_template("main.html", blog_details = blog_details)

@app.route('/aboutus.html')
def aboutus():
    return render_template("aboutus.html")

@app.route('/subscribe',methods = ['POST'])
def subscribe():
    print(request.form) 
    email = request.form['email']
    db = get_db_connection()
    cursor = db.cursor()
    try:
        cursor.execute('INSERT INTO subscriber_list(subscriber_email) VALUES (%s)',(email,))
        db.commit()
    except Exception as e:
        print(f'Error: {e}')
    finally:
        cursor.close()
        db.close() 
         
    return redirect(url_for('main'))
    
if __name__ == '__main__':
    app.run(debug = True) 