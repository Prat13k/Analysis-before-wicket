from flask import Flask, render_template, request, redirect, url_for
from database_connection import get_db_connection

app = Flask(__name__)

@app.route('/')
def main():
    db = get_db_connection()
    cursor = db.cursor(dictionary = True)
    cursor.execute("SELECT blog_title, blog_content FROM blog_details")
    blog_details = cursor.fetchall()
    db.close()
    return render_template("main.html", blog_details = blog_details)

@app.route('/about-us')
def about():
    return render_template("aboutus.html", blog_details = blog_details)

@app.route('/subscribe',methods = ['POST'])
def subscribe(): 
    email = request.form['email']
    db = get_db_connection()
    cursor = db.cursor()
    try:
        cursor.execute('INSERT INTO subscriber_email values($s)',(email,))
        db.commit()
        db.close()

    except Exception as e:
        print(f'Error: {e}')
        
    finally:
        db.close() 
         
    return redirect(url_for('main'))
    
if __name__ == '__main__':
    app.run(debug = True) 