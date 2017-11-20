import glob
path = "CensusData/ny_census/*.csv"
map  = {}

for fpath in glob.glob(path):
    fileName = fpath.replace("CensusData/ny_census/", '')
    print(fileName)
    input = open(fpath, 'r')
    for line in input:
        line = line.replace('\"','')
        line = line.split(',')
        if len(line) > 4:
            if line[0].lower() == 'people' and line[1].lower()== 'race' or (line[1] == "Hispanic or Latino and Race" and line[2] == "Hispanic or Latino (of any race)"):
                if line[2].lower() != 'one race':
                    if line[2] in map:
                        temp = map[line[2]]
                        temp.append(line[3])
                        map[line[2]] = temp
                    else:
                        temp = []
                        temp.append(line[3])
                        map[line[2]] = temp
    input.close()

output = open("parsedFiles/nyCensus.csv", 'w')

for key in map:
    line = str(key) + ','
    for item in map[key]:
        line += str(item) + ','
    line = line[:-1]
    line += '\n'
    output.write(line)

output.close()