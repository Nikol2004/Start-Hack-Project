from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://nikol2004:nikolnikol@localhost/mydatabase"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

###What this does:

### Connects to your PostgreSQL database
# Sets up a SQLAlchemy engine for database interaction
# Creates a session maker to handle database queries
# Defines Base, which your models (if needed) will inherit from 
