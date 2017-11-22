
//efficiency gap variables
            var counter;
            var demVotePercentage;
            var democratWonState=0;
            var republicanWonState=0; 
            var demVotesArray;
            var repVotesArray;
            var usedToWinDemVotes;
            var wastedDemVotes;
            var usedToWinRepVotes;
            var wastedRepVotes;
            var demDistrictCount=0;
            var repDistrictCount=0;
            var winnerArray;
            var margin2 = {top2: (10), right2: (parseInt(d3.select('body').style('width'), 10)/20), bottom2: (parseInt(d3.select('body').style('width'), 10)/5), left2: (parseInt(d3.select('body').style('width'), 10)/20)},
            width2 = parseInt(d3.select('body').style('width'), 10) - margin2.left2 - margin2.right2,
            width3 = width2/3;
            height2 = parseInt(d3.select('body').style('height'), 10) - margin2.top2 - margin2.bottom2,
            height3 = height2/1.5;
            var x_1 = d3.scale.ordinal()
            .rangeRoundBands([0, width3], .1);
            var x_2 = d3.scale.ordinal();
            var y_1 = d3.scale.linear()
            .range([height2, 0]);
            var colorRange2 = d3.scale.category20();
            var color2 = d3.scale.ordinal()
              .range(colorRange2.range());
            //distinguish what will be used to scale the x axis and its orientation
            var x_Axis = d3.svg.axis()
              .scale(x_1)
              .orient("bottom");
            //distinguish what will be used to scale the y axis and its orientation
            var y_Axis = d3.svg.axis()
              .scale(y_1)
              .orient("left")
              .tickFormat(d3.format(".2s"));
             var options;
