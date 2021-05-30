#################################################
# Import necessary libraries
#################################################
import os
from flask_sqlalchemy import SQLAlchemy
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# class House_prices(db.Model):
    __tablename__ = 'house_prices'
    price = db.Column(db.Integer)
    date = db.Column(db.Integer)
    suburb = db.Column(db.String)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    land_area= db.Column(db.Integer)

# create route that renders index.html template
@app.route("/")
def home():
    print(request.form)
    # if request.form.get("form_input_1") has data 
    # return map with data in render_template
    # else
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/api/house_prices")
def house_prices():
    # results = db.session.query(House_prices.price, House_prices.date, House_prices.suburb, House_prices.bedrooms, House_prices.bathrooms, House_prices.land_area).all()
    return '5'
    
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)
