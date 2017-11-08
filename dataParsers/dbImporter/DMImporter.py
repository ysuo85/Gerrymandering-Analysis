from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import Sequence

# To test in memory no DB conn required right now
engine = create_engine('sqlite:///:memory:', echo=True)
conn = engine.connect()
metadata = MetaData()


def main():

    # build tables
    #
    state = Table('state', metadata,
                  Column('id', Integer, primary_key=True),
                  Column('stateFp', String),
                  Column('stateName', String),
                  Column('polygon', String),
                  Column('year', Integer),
                  Column('clickCount', Integer)
                  )


    district = Table('district', metadata,
                 Column('id', Integer, Sequence('user_id_seq'), primary_key=True),
                 Column('stateId', String, ForeignKey('state.id')),
                 Column('districtNum', String),
                 Column('voteRep', Integer),
                 Column('voteDem', Integer),
                 Column('polygon', String),
                 Column('area', Integer),
                 Column('population', String),
                 Column('clickCount', String)
                 )

    minority = Table('minority', metadata,
                 Column('id', Integer, Sequence('user_id_seq'), primary_key=True),
                 Column('districtNum', Integer, ForeignKey('district.id')),
                 Column('name', String),
                 Column('voteRep', Integer),
                 Column('voteDem', Integer),
                 Column('population', Integer)
                 )

    metadata.create_all(engine)

    # print tables
    #
    print 'Tables: ' + str(metadata.tables.keys())

    # populate voting data
    #
    input = open("parsedFiles/votingData.csv")

    for line in input:
        data = []
        line = line.split(',')
        for item in line:
            if '\n' in item:
                data.append(item[:-2])
            else:
                data.append(item)

        # fill state info
        print "Data to fill: " + str(data)
        ins = state.insert().values(stateName = data[0] , year = int(data[1]), clickCount = 0)
        result = conn.execute(ins)
        # get state PK for FK in district
        stateId = result.inserted_primary_key
        # fill district info
        ins = district.insert().values(stateId=stateId, districtNum = int(data[2]), voteRep= int(data[3]), voteDem= int(data[4]), clickCount = 0)
        result = conn.execute()
        districtId = result.inserted_primary_key







if __name__ == "__main__":
    main()

