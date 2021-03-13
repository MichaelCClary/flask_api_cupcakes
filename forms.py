from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, URL, Optional, NumberRange
from wtforms.widgets.html5 import NumberInput


class CupcakeForm(FlaskForm):
    flavor = StringField("Flavor", validators=[
        InputRequired(message="Flavor Required")])
    size = StringField("Size", validators=[
        InputRequired(message="Flavor Required")])
    image = StringField("URL for Cupcake Picture", validators=[
        Optional(), URL(message="Must be a valid URL")])
    rating = FloatField("Rating", widget=NumberInput(
        min=0, max=10, step=.5), validators=[Optional()])
