from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


default_url = "https://tinyurl.com/demo-cupcake"


class Cupcake(db.Model):
    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    flavor = db.Column(db.String(50), nullable=False)

    size = db.Column(db.String(40), nullable=False)

    image = db.Column(db.String(300), default=default_url)

    rating = db.Column(db.Float)

    def serialize(self):
        """Returns a dict representation of todo which we can turn into JSON"""
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'image': self.image,
            'rating': self.rating
        }

    def __repr__(self):
        c = self
        return f"<Cupcake id={c.id} flavor={c.flavor} size={c.size} image={c.image} rating={c.rating}>"
