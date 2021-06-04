#################################################
# Import necessary libraries
#################################################
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    make_response)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class House_prices(db.Model):
    __tablename__ = 'house_prices'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    date = db.Column(db.Integer)
    suburb = db.Column(db.String)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    land_area= db.Column(db.Integer)

db.Model.metadata.reflect(db.engine)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        inputPrice = request.form["housePrice"]
        inputPlot = request.form["housePlot"]
        inputBedrooms = request.form["houseBedrooms"]
        inputBathrooms = request.form["houseBathrooms"]
        results = db.session.query(House_prices) \
            .filter((House_prices.price<=inputPrice) | \
                (House_prices.land_area>=inputPlot) | \
                (House_prices.bedrooms==inputBedrooms) | \
                (House_prices.bathrooms==inputBathrooms)).all()
        return make_response(jsonify(results))
    return ("/")

if __name__ == "__main__":
    app.run(debug=True)
