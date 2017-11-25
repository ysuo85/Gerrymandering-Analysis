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
pp = pprint.PrettyPrinter(depth=6)

stateFPs = {}
Neighbors = []

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
    initImportNeighbor()
    session.commit()
    return

def initImportNeighbor():
    for yr in range(2002, 2020):
        # find state by year
        states = findStatesByYear(yr)

        for stateId in states:
            districtBounds = findDistrictBoundariesBySId(stateId)

            if(len(districtBounds) > 0):
                # for each boundary in a state check if they are touching another boundary in that state
                for boundary1 in districtBounds:
                    for boundary2 in districtBounds:

                        if boundary1 != boundary2 and boundary1[0] != boundary2[0]:      # don't check a boundary against itself
                            isNeighbor = findNeighbors(boundary1[1], boundary2[1])       # and make sure they aren't from the same district

                            if isNeighbor == 1:
                                tempNeighbor = (boundary1[0], boundary2[0])
                                # check if that set of neighbors hasn't already be inserted.
                                if tempNeighbor not in Neighbors :
                                    # add to database
                                    Neighbors.append(tempNeighbor)
                                    importNeighbor(boundary1[0], boundary2[0])
    return

def importNeighbor(districtA, districtB):

    try:
        ins = " INSERT INTO gerrymandering.Neighbors(DistrictAId, DistrictBId)" \
              + " VALUES(" + str(districtA) + "," + str(districtB) + ")"

        session.execute(ins)
    except:
        return False    # failed to insert

    return True

def findDistrictBoundariesBySId(stateId):
    d = " SELECT Districts.Id, ST_AsText(Boundaries.Shape) " \
        + " FROM gerrymandering.DistrictBoundaries, gerrymandering.Boundaries, " \
        + " gerrymandering.States, gerrymandering.Districts" \
        + " WHERE DistrictBoundaries.BoundaryId = Boundaries.Id" \
        + " AND   DistrictBoundaries.DistrictId = Districts.Id" \
        + " AND	  States.Id = " + str(stateId) \
        + " AND   Districts.StateId = " + str(stateId)
    districtBounds = []
    for row2 in session.execute(d):
        tempDistrict = (row2[0], row2[1])
        districtBounds.append(tempDistrict)

    return districtBounds


def findStatesByYear(yr):
    s = " SELECT  States.Id " \
        + " FROM  gerrymandering.States" \
        + " WHERE States.Year = " + str(yr)

    states = []
    for row1 in session.execute(s):
        states.append(row1[0])

    return states

def findNeighbors(g1, g2):
    isNeighbor = 0

    s = " SELECT ST_TOUCHES(" \
        + " polygonfromtext(\'" + g1 + "\'),polygonfromtext(\'" + g2 + "\'))"

    for row in session.execute(s):
        isNeighbor = row[0]

    if isNeighbor == 0:
        s = " SELECT st_intersects(" \
            + " polygonfromtext(\'" + g1 + "\'),polygonfromtext(\'" + g2 + "\'))"

        for row in session.execute(s):
            isNeighbor = row[0]

    return isNeighbor




if __name__ == "__main__":
    main()

