function displayStateWithDescription(selectedState){
	 if(selectedState=="New York")
        {
        	map.setZoom(6);
            map.setCenter(marker1.getPosition());
            marker1.info.open(map, marker1);
            marker2.info.close();
            marker3.info.close();
            document.getElementById("selection").innerHTML = "State Chosen for "+selectedPair[1][1]+" : "+selectedPair[0][1]+
            "<p><br/>New York, one of the 13 original colonies, joined the Union in July 1788. However, the state did not choose electors in the first election due to an internal dispute. In the 1810 Census, New York became the nation’s most populous state, and had the most electoral votes from the 1812 election until the 1972 election, when it relinquished that distinction to California. <br><br>Like many other Northeastern states, New York’s electoral clout has diminished in recent years. In fact it has lost 2 or more electoral votes after the last 7 Censuses. Texas surpassed New York in electoral votes in 2004, and Florida will almost certainly do so after the next Census. New York has been primarily a “blue” state ever since the Great Depression, only siding with a losing Republican when it chose its then-current governor Thomas E. Dewey over Harry S. Truman in 1948. In 2016, Hillary Clinton easily defeated Donald Trump by 22% in the state.<br></p>";
                                   
        }
        else if(selectedState=="North Carolina")
        {
        	map.setZoom(6);
            map.setCenter(marker3.getPosition());
            marker3.info.open(map, marker3);
            marker1.info.close();
            marker2.info.close();
            document.getElementById("selection").innerHTML = "State Chosen for "+selectedPair[1][1]+" : "+selectedPair[0][1]+
           "<p><br/>North Carolina, one of the original 13 colonies, entered the Union in November 1789. The state did not participate in the 1864 election due to secession. Like many other southern states, North Carolina voted almost exclusively Democratic from 1876 through 1964 and almost exclusively Republican beginning in 1968. The initial shift was largely in response to white conservative voter uneasiness with the civil rights legislation passed in the mid-1960s, which was effectively exploited by the Republicans “southern strategy.”<br><br>In 2008, Barack Obama reversed the trend of Republican dominance here (although just barely), defeating John McCain by about 14,000 votes out of 4.3 million cast (49.7% to 49.4%). In percentage terms, it was the 2nd closest race of the 2008 election (behind Missouri). In 2012, North Carolina was again the 2nd closest race (this time behind Florida) as the state flipped Republican. Mitt Romney beat Obama by about 2%. Donald Trump won the state by 3.6% over Hillary Clinton in 2016. Based on population projections,                the state may gain an additional electoral vote after the 2020 presidential election. <br></p>";
        }
        else if(selectedState=="Virginia")
        {
        	map.setZoom(6);
            map.setCenter(marker2.getPosition());
            marker2.info.open(map, marker2);
            marker1.info.close();
            marker3.info.close();
             document.getElementById("selection").innerHTML = "State Chosen for "+selectedPair[1][1]+" : "+selectedPair[0][1]+
            "<p><br/>Virginia, one of the original 13 colonies and birthplace of four of the first five U.S. presidents, joined the Union in June 1788. In 1792, Virginia controlled 15.9% of all electoral votes, the largest concentration in U.S. history. The Commonwealth did not participate in the 1864 and 1868 elections due to secession. From the post-Civil War Reconstruction period through 1948, Virginians almost always sided with the Democratic Party in elections. However, from 1952 through 2004, Virginia was reliably Republican (except for the landslide of Lyndon Johnson over Barry Goldwater in 1964). What changed? In the early 1950s, Virginia politics was controlled by Democratic Senator Harry F. Byrd, Sr., and his political machine. For the 1952 cycle, Byrd announced he would not be endorsing a candidate, saying “Silence is Golden.” People knew this meant that it would be okay to vote for the Republican Dwight Eisenhower. <br><br>Shifting demographics, including more rapid population growth around Washington D.C., have made the state a battleground in recent elections, perhaps one that now leans Democratic again. Barack Obama won here twice and Hillary Clinton made it three in a row for Democrats, winning by about 5.5% over Donald Trump in 2016.<br></p>";
       }
}
function displayVoteSums(data){
	//returns an array of the "DemVotes " values
            demVotesArray = data.map((e) => {
                return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
            });
            //calculates the sum of all the elements in the array 
            demVoteSum = demVotesArray.reduce(function(total,amount){
                return total + amount;
             }, 0);
            //repeat finding the sum for the republicans
            repVotesArray = data.map((e) => {
                return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
            });
            repVoteSum = repVotesArray.reduce(function(total,amount){
                return total + amount;
            }, 0);
            // add total votes for each party to the description for the state
            document.getElementById("totalVotes").innerHTML = "Democrat Votes: "+demVoteSum+"  |   Republican Votes: "+repVoteSum;
             //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
    }