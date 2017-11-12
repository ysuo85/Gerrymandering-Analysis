input       = open('geoData/cb_2016_us_cd115_20m/cb_2016_us_cd115_20m.kml', 'r')
output      = open('parsedFiles/DistrictGeo_2016.csv', 'w')
outputLine  = ''

stateFp = None
congressionalNum = "\"CD115FP\""
districtTag = "<SimpleData name=" + congressionalNum +">"
name    = ''
cord    = ''


for line in input:
    if "<SimpleData name=\"STATEFP\">" in line:
        if stateFp != None:
            outputLine = outputLine[:-1]
            outputLine += '\n'
            output.write(outputLine)

        stateFp     = line.replace("<SimpleData name=\"STATEFP\">", '')
        stateFp     = stateFp.replace("</SimpleData>\n", '')
        outputLine  = stateFp + ';'

    elif districtTag in line:
        name        = line.replace(districtTag, '')
        name        = name.replace("</SimpleData>\n", '')
        outputLine += name + ';'

    elif "<SimpleData name=\"ALAND\">" in line:
        area = line.replace("<SimpleData name=\"ALAND\">", '')
        area = area.replace("</SimpleData>\n", '')
        outputLine += area + ';'

    elif "<coordinates>" in line:
        cord        = line.replace("<coordinates>", '')
        cord        = cord.replace("</coordinates>\n", '')
        # remove z axis
        parsedCord = []
        cord = cord.split(' ')
        for point in cord:
            point.split(',')
            point    = point[:-2]
            parsedCord.append(point)

        cord = ''
        for i in range(len(parsedCord)):
            tempCord = parsedCord[i].split(',')
            if i == len(parsedCord)-1:
                cord += tempCord[0] + ' ' + tempCord[1]
            else:
                cord += tempCord[0] + ' ' + tempCord[1] + ','


        outputLine += '('+cord+')' + ';'


input.close()
output.close()