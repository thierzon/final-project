from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)



@app.route("/")
def index():
    // mars = mongo.db.mars.find_one()
    // return render_template("index.html", mars=mars)

    if __name__ == "__main__":
    app.run()

    
      