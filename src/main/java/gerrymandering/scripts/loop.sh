echo $1
for i in {1..50}
do
	if [ $i -eq $1 ]; then
		continue
	fi
	if (( i < 10 )); then
		i="0$i"
	fi
	echo "$i" 
done
