# final-project

Where to buy a house in Perth?

By: thierzon and Spyrothebassist

-----

# Project description:

The final project in the UWA Boot Camp in Data Analytics is a collaborative effort by Thierry and Spiros. The goal is to create a dashboard that can be interacted with and is publicly accessible, which present information related to housing in Perth. It will rely on a publicly available dataset and a variety of software applications explored throughout the course, which are outlined below. 


The main question the user of this dashboard will be able to answer is: <br>

<i> Which Perth suburb to buy a house in based on specific input parameters? </i>

When the dashboard is loaded for the first time, the map of Perth will be shown with each of the suburbs in the dataset. Each suburb can be interacted with: a click will show a pop up with the average values of each parameter based on the date of the dataset used (Jan 2021).

The user is prompted to provide their input for a number of predefined variables (e.g. maximum house price, number of bedrooms, etc.). The application will use linear regression to predict which suburbs will match the user input, of which the results will be reflected on the map.

The map will show suburbs that either match the input entirely (green highlight), partially (orange highlight) or not at all (red highlight). The categories will be determined by normalising the different inputs per suburb and defining thresholds for categorisation.


## Datasets to be used:
Perth House Prices - https://www.kaggle.com/syuzai/perth-house-prices 

## Software applications to be used:
* Python/Pandas
* Flask/SQLAlchemy
* HTML/CSS/Bootstrap
* JS/Leaflet
* Heroku for deployment

## Design schema: 
![Dashboard_schema](/static/img/Dashboard_schema_final.jpg)