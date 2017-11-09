input       = open('geoData/cb_2013_us_cd113_20m/cb_2013_us_cd113_20m.kml', 'r')
output      = open('parsedFiles/DistrictGeo_2013.csv', 'w')
outputLine  = ''

stateFp = None
congressionalNum = "\"CD113FP\""
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
        outputLine  = stateFp + ','

    elif districtTag in line:
        name        = line.replace(districtTag, '')
        name        = name.replace("</SimpleData>\n", '')
        outputLine += name + ','

    elif "<SimpleData name=\"ALAND\">" in line:
        area = line.replace("<SimpleData name=\"ALAND\">", '')
        area = area.replace("</SimpleData>\n", '')
        outputLine += area + ','

    elif "<coordinates>" in line:
        cord        = line.replace("<coordinates>", '')
        cord        = cord.replace("</coordinates>\n", '')
        outputLine += '('+cord+')' + ','


input.close()
output.close()