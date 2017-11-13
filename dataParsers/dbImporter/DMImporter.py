from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.orm import sessionmaker
from sqlalchemy import inspect

# To test in memory no DB conn required right now
connection_string = "mysql+pymysql://johnsonlu:abc123@cse308.ch4xgfzmcq2l.us-east-1.rds.amazonaws.com:3306/gerrymandering"
engine = create_engine(connection_string, echo=True)
conn = engine.connect()
metadata = MetaData()
metadata.reflect(bind=engine)

StateBoundaries = []
states = []
districts = []
DistrictBoundaries = []
boundaries = []
population = []


def main():

    # print database tables
    inspector = inspect(engine)

    # printTables()
    importData()

def importData():
    # populate voting data
    #
    voteData  = open("../parsedFiles/votingData.csv", 'r')
    stateData = open("../parsedFiles/StateGeo.csv", 'r')


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
            sId     = -1
            polygons = []
            sName   = data[0]
            year    = data[1]
            dId     = data[2]
            rVote   = data[3]
            dVote   = data[4]

            for line in stateData:
                line = line.split(';')
                if line[1] == sName:
                    sId = int(line[0])
                    # get polygons
                    for i in range(2,len(line)):
                        polygon = "POLYGON(" + line[i] + ")"
                        polygon = polygon[:-1]
                        polygons.append(polygon)
                    break

            # import State Data
            ins = metadata.tables['States'].insert().values(StateName = sName , Year = int(year), ClickCount = 0)
            result = conn.execute(ins)
            statePKId = result.inserted_primary_key

            # import State Boundaries
            boundaryPKId = []

            # for polygon in polygons:
            #     ins = metadata.tables['Boundaries'].insert().values(Shape=polygon)
            #     result = conn.execute(ins)
            #     boundaryPKId.append(result.inserted_primary_key)
            #
            # # import StateBoundaries
            # for pkId in boundaryPKId:
            #     ins = metadata.tables['StateBoundaries'].insert().values(BoundaryId = pkId, StateId = statePKId)
            #     result = conn.execute(ins)

            # import district Data
            importPopulationData(year, sName, sId, dId)


            # import votingData
            importVotingData(dId, "Democrat", rVote)
            importVotingData(dId, "Republican", rVote)

    voteData.close()
    stateData.close()


def importPopulationData(year, sName, sFp, district):
    # Population
    # `Id`
    # `Name` ENUM('Total', 'White', 'Black', 'Hispanic', 'Asian', 'PacificIslander', 'AmericanIndian', 'Other', 'Mixed')
    # `Population`
    # `DistrictId`
    if year in range(2010, 2020):               # range of the census data we have
        if sName == 'Virginia':
            vaCensus = open('../parsedFiles/VirginiaCensus.csv', 'r')
        elif sName == 'North Carolina':
            ncCensus = open('../parsedFiles/NorthCarolinaCensus.csv', 'r')
        elif sName == 'New York':
            nyCensus = open('../parsedFiles/nyCensus.csv', 'r')

        ins = metadata.tables['Population'].insert().values(Name='', Population=-1, DistrictId=district)
        result = conn.execute(ins)




def importVotingData(dId, party, vote):
    ins = metadata.tables['Votes'].insert().values(DistrictId=dId, Party=party, voteCount=vote)
    result = conn.execute(ins)


def printTables():
    for t in metadata.tables:
        for x in engine.execute(metadata.tables[t].select()):
            print(x)

    return


if __name__ == "__main__":
    main()

