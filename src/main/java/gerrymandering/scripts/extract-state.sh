sed '/"STATEFP": "01"/d' all.geojson > out.geojson
for i in {1..78}
do 
	if [ $i -eq $1 ]; then 
		continue
	fi
	if (( i < 10 )); then
		i="0$i"	
	fi
	sed -i "/\"STATEFP\": \"$i\"/d" out.geojson 
done	
