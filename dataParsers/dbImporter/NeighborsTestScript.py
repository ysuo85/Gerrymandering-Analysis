from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.automap import automap_base
from geoalchemy2 import *
import pprint

connection_string = ''
engine = None
Session = None
session = None
#conn = None
metadata = None
Base = None

Boundaries = None
States = None
Districts = None
Population = None

PASS = "Pass!"
FAIL = "Fail!"

def connectToDB():
    global Session
    global session
    global engine
    global Boundaries
    global metadata
    global Base
    global States
    global Districts
    global Population

    conURL = open('../Connection', 'r')
    connection_string = conURL.readline()
    engine = create_engine(connection_string, echo=False)
    Session = sessionmaker(bind=engine)
    session = Session()
    #conn = engine.connect()
    metadata = MetaData()
    metadata.reflect(bind=engine)
    Base = automap_base()
    Base.prepare(engine, reflect=True)

    Boundaries = Base.classes.Boundaries
    States = Base.classes.States
    Districts = Base.classes.Districts
    Population = Base.classes.Population


def main():
    connectToDB()
    TestNeighbors()
    print("\n")
    TestNotNeighbors()
    return

def TestNeighbors():
    neighbors = open("./Neighbors.csv",'r')
    print("Testing for Neighbors...")
    for line in neighbors:
        line = line.split(',')
        d1 = line[0].replace("\n","")
        d2 = line[1].replace("\n","")

        if findNeighbors(d1,d2) == True:
            print(d1 + " : " + d2 + " = " + PASS)
        else:
            print(d1 + " : " + d2 + " = " + FAIL)

    neighbors.close()
    return

def TestNotNeighbors():
    notNeighbors = open("./NotNeighbors.csv",'r')
    print("Testing for Not Neighbors...")
    for line in notNeighbors:
        line = line.split(',')
        d1 = line[0].replace("\n","")
        d2 = line[1].replace("\n","")

        if findNeighbors(d1, d2) == False:
            print(d1 + " : " + d2 + " = " + PASS)
        else:
            print(d1 + " : " + d2 + " = " + FAIL)

    notNeighbors.close()
    return

def findNeighbors(id_A, id_B):

    s = " SELECT Id" \
        + " FROM Neighbors" \
        + " WHERE DistrictAId = " + str(id_A) \
        + " AND   DistrictBId = " + str(id_B)

    for row in session.execute(s):
        # Neighbor Found return true
        return True
    # Neighbor not Found
    return False

if __name__ == "__main__":
    main()

