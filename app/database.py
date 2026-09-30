from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base
import os

SECRET_FILE = "/run/secrets/db_password"

if os.path.exists(SECRET_FILE):
    with open(SECRET_FILE, "r") as f:
        db_password = f.read().strip()

    DATABASE_URL = URL.create(
        drivername="postgresql",
        username=os.getenv("POSTGRES_USER", "hub_user"),
        password=db_password,
        host=os.getenv("DB_HOST", "localhost"),
        port=5432,
        database=os.getenv("POSTGRES_DB", "hub_library"),
    )
else:
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql://hub_user:hub_password@localhost:5432/hub_library"
    )

engine = create_engine(
    DATABASE_URL,
    echo=False
)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()