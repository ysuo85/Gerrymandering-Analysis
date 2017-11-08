# This script is for parsing the US house election data from 1972 to 2016
# This will scrub out all the useless data and leave only the import data
# Important data to retain; State, Year, District, RepVotes, DemoVotes

input = open("US_House_elections_1972_to_2016_clean.csv", 'r')
output = open("votingData.csv", 'w')

COMMMA = ','
NEWLINE = '\n'

for line in input:
    line = line.split(",")

    state    = line[0]
    year     = line[1]
    district = line[2]
    repVotes = line[3]
    demVotes = line[5]

    newLine = state + COMMMA + year + COMMMA + district + COMMMA + repVotes + COMMMA + demVotes + NEWLINE

    output.write(newLine)

