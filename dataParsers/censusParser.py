input  = open("CensusData/Virginia.csv", 'r')
output = open("parsedFiles/VirginiaCensus.csv", 'w')

COMMA  = ','
NEWLINE = '\n'
OFFSET  = 2

for line in input:
    line = line.replace('\"', '')
    line = line.split(",")
    data = []
    newLine = ''
    if(line[0] == "People"):
        if(line[2] == "Total population" and line[1] == "Sex and Age" and (line[1] != "Race" and \
        line[1] != "Hispanic or Latino and Race")):
            data.append("Total population")
            for i in range(len(line)):
                if i%2 != 0 and i + OFFSET < len(line):
                    data.append(line[i + OFFSET])
        elif ((line[1].lower()== 'race' or (line[1] == "Hispanic or Latino and Race" and \
        line[2] == Hispanic or Latino (of any race)")) and line[2] != "Total population"):
            if line[2].lower() != 'one race':
                data.append(line[2])
                for i in range(len(line)):
                    if i % 2 != 0 and i + OFFSET < len(line):
                        data.append(line[i + OFFSET])

        for i in range(len(data)):
            if i != len(data)-1:
                newLine += data[i] + COMMA
            else:
                newLine += data[i] + NEWLINE

        if len(newLine) > 1:
            output.write(newLine)
