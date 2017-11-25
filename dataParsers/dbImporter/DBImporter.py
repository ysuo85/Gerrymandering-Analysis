from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.sql import select
from sqlalchemy import text
from sqlalchemy.ext.automap import automap_base

connection_string = ''
engine = None
conn = None
metadata = None
Base = None

Boundaries = None
States = None
Districts = None
Population = None


stateFPs = {}

def main():

    connectToDB()

    # printTables()
    #buildStateFPMap()
    #importStateData()
    importStateBoundaryData()
    #importDistrictsAndVote('../parsedFiles/votingData.csv')

    #importPopulationData('../parsedFiles/VirginiaCensus.csv', "Virginia")
    #importPopulationData('../parsedFiles/NorthCarolinaCensus.csv', "North Carolina")
    #importPopulationData('../parsedFiles/nyCensus.csv', "New York")
    importDistrictBoundary("../parsedFiles/DistrictGeo_2016.csv", 2012)
    importDistrictBoundary("../parsedFiles/New_York_108_to_112.csv", 2001)    # Redistricting follows census so this file
    importDistrictBoundary("../parsedFiles/North_Carolina_108_to_112.csv", 2001)
    importDistrictBoundary("../parsedFiles/Virginia_108_to_112.csv", 2001)


def connectToDB():
    global conn
    global engine
    global Boundaries
    global metadata
    global Base
    global States
    global Districts
    global Population

    conURL = open('../Connection', 'r')
    connection_string = conURL.readline()
    engine = create_engine(connection_string, echo=True)
    conn = engine.connect()
    metadata = MetaData()
    metadata.reflect(bind=engine)
    Base = automap_base()
    Base.prepare(engine, reflect=True)

    Boundaries = Base.classes.Boundaries
    States = Base.classes.States
    Districts = Base.classes.Districts
    Population = Base.classes.Population

def buildStateFPMap():
    stateData = open("../parsedFiles/StateGeo.csv", 'r')

    for line in stateData:
        line = line.split(';')
        if line[1] not in stateFPs.keys():
            stateFPs[line[1]] = line[0]


    stateData.close()


def importStateData():
    # populate voting data
    #
    voteData  = open("../parsedFiles/votingData.csv", 'r')
    importedStatesYear = []

    for line in voteData:
        data = []
        line = line.split(',')
        for item in line:
            if '\n' in item:
                data.append(item[:-1])
            else:
                data.append(item)

        if len(data) == 5:
            # import data into database
            sName   = data[0]
            year    = data[1]

            stateYear = sName+str(year)
            if stateYear not in importedStatesYear:
                # get StateFp
                sId = stateFPs[sName]

                # import State Data
                ins = metadata.tables['States'].insert().values(StateId=sId, StateName=sName, Year=int(year), ClickCount=0)
                conn.execute(ins)
                importedStatesYear.append(sName+year)

    voteData.close()

def importStateBoundaryData():
    # import State Boundaries
    stateData = open("../parsedFiles/StateGeo.csv", 'r')

    for line in stateData:

        line = line.split(';')
        sId = int(line[0])
        polygons = line[2:]

        for yr in range(2000,2020):
            boundaryPKId = []
            for polygon in polygons:
                polygon = "PolygonFromText(\'POLYGON(" + polygon + ")\')"

                ins = metadata.tables['Boundaries'].insert().values(Shape = text(polygon))
                result = conn.execute(ins)
                boundPKId = result.inserted_primary_key

                # get pkId from last inserted for StateBoundary FK
                boundaryPKId.append(boundPKId)

            # find state by yea
            s = " SELECT Id " \
                + " FROM gerrymandering.States" \
                + " WHERE States.Year = " + str(yr) \
                + " AND States.StateId = " + str(sId)

            statePK = -1
            for row in conn.execute(s):
                statePK = row[0]

            if statePK != -1:
            # import StateBoundaries
                for pkId in boundaryPKId:
                    ins = metadata.tables['StateBoundaries'].insert().values(BoundaryId = pkId[0], StateId = statePK)
                    conn.execute(ins)


    stateData.close()
    return


def importDistrictBoundary(path, year):

    geoData = open(path, 'r')

    for line in geoData:
        boundaryPKId = []

        line     = line.split(';')
        sId      = int(line[0])
        dId      = int(line[1])
        #area     = int(line[2])
        polygons = line[3:]

        for polygon in polygons:
            polygon = "PolygonFromText(\'POLYGON(" + polygon + ")\')"

            ins = metadata.tables['Boundaries'].insert().values(Shape=text(polygon))
            result = conn.execute(ins)
            boundPKId = result.inserted_primary_key

            # get pkId from last inserted for StateBoundary FK
            boundaryPKId.append(boundPKId)
        # import District Boundary
        for yr in range(year, year+10):
            dFK = -1
            # find district by dId, year, sId
            s = "SELECT "\
                + " Districts.Id " \
                + " FROM " \
                + " gerrymandering.Districts, gerrymandering.States " \
                + " WHERE " \
                + " Districts.StateId = States.Id and " \
                + " States.Year = " + str(yr) + " and States.StateId = " + str(sId) + " and Districts.DistrictId = " + str(dId)

            for row in conn.execute(s):
                dFK = row[0]

            if dFK != -1:
                for pkId in boundaryPKId:
                    ins = metadata.tables['DistrictBoundaries'].insert().values(BoundaryId=pkId[0], DistrictId=dFK)
                    conn.execute(ins)

                # upd = " UPDATE "\
                #       + " gerrymandering.Districts SET Districts.Area  = " + str(area) \
                #       + " WHERE  Districts.Id = " + str(dFK)
                #
                # conn.execute(upd)

    geoData.close()
    return

def importDistrictsAndVote(path):

    # Districts
    # `DistrictId`
    # `Area`
    # `clickCount`
    # `StateId` FK
    sName = -1
    dId   = -1
    sFK   = -1

    districtData = open(path, 'r')

    for line in districtData:
        line = line.split(',')

        sName = line[0]
        year  = line[1]
        dId   = line[2]
        rVote = line[3]
        dVote = line[4].replace('\n','')

        if rVote == "Unopposed":            # Check if a party was unopposed if it is make -1 a FLAG that will mean unoppsed
            rVote = -1
            dVote =  0
        elif dVote == "Unopposed":
            rVote =  0
            dVote = -1


        # get fk using sName
        s = "SELECT States.Id FROM gerrymandering.States WHERE States.StateName = \'" + sName + "\' and States.Year = " + year
        for row in conn.execute(s):
            sFK = row[0]

        ins = metadata.tables['Districts'].insert().values(DistrictId = dId, clickCount = 0, StateId=sFK)
        result = conn.execute(ins)
        districtPK = result.inserted_primary_key

        # insert Vote data
        ins = metadata.tables['Votes'].insert().values(DistrictId = districtPK[0], Party = "Republican", voteCount=rVote)
        conn.execute(ins)
        ins = metadata.tables['Votes'].insert().values(DistrictId=districtPK[0], Party="Democrat", voteCount=dVote)
        conn.execute(ins)
    return



def importPopulationData(path, sName):
    # Population
    # `Id`
    # `Name` ENUM('Total', 'White', 'Black', 'Hispanic', 'Asian', 'PacificIslander', 'AmericanIndian', 'Other', 'Mixed')
    # `Population`
    # `DistrictId`
    censusData = open(path, 'r')
    races = ('Total', 'White', 'Black', 'Hispanic', 'Asian', 'PacificIslander', 'AmericanIndian', 'Other', 'Mixed')

    race = ''
    pop  = []
    dId  = -1

    for line in censusData:
        line = line.split(',')
        race = line[0]
        pop  = line[1:]

        if race == "Total population":
            race = "Total"
        elif race == "White":
            race = "White"
        elif race == "Asian":
            race = "Asian"
        elif race == "Black or African American":
            race = "Black"
        elif race == "American Indian and Alaska Native":
            race = "AmericanIndian"
        elif race == "Native Hawaiian and Other Pacific Islander":
            race = "PacificIslander"
        elif race == "Some other race":
            race = "Other"
        elif race == "Two or more races":
            race = "Mixed"
        elif race == "Hispanic or Latino (of any race)":
            race = "Hispanic"

        for year in range(2010, 2018):
            dIds = []
            # census data applies to the years 2010-2020, current year 2017
            # find district with by district id, year, and name
            s = "SELECT " \
                + "gerrymandering.Districts.Id " \
                + "FROM " \
                + "gerrymandering.Districts, gerrymandering.States " \
                + "WHERE " \
                + "States.Year = " + str(
                year) + " and States.StateName = \'" + sName + "\' and Districts.StateId = States.Id"

            for row in conn.execute(s):
                dIds.append(row[0])

            if len(dIds) != 0:
                for i in range(len(pop)):  # insert for the number of districts

                    ins = metadata.tables['Population'].insert().values(Name=race, Population=int(pop[i]),
                                                                        DistrictId=dIds[i])
                    conn.execute(ins)
    return



def printTables():
    for t in metadata.tables:
        for x in engine.execute(metadata.tables[t].select()):
            print(x)

    return


if __name__ == "__main__":
    main()

