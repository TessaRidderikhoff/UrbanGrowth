$.getJSON("gridx11x100.json", function(json) {
    console.log(Object.keys(json).length)

    datalen = 100
    ss = 10
    sx = 50
    sy = 50

    marge = 20

    legendax = sx + 200 *ss + marge


    var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

padding = 50

    var svg = d3.select("#scatter").append("svg")
        .attr("id","scatsvg")
        .attr("width", width)
        .attr("height", height);

var xScale = d3.scaleLog()
    .domain([1,datalen])
    .range([padding, width - padding]);

var yScale = d3.scaleLog()
    .domain([1,datalen*datalen])
    .range([height - padding, 0]);

var xAxis = d3.axisBottom().scale(xScale).ticks(5);

var yAxis = d3.axisLeft().scale(yScale).ticks(5);

var scatdict = new Set

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    //y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);


    var grid = d3.select("#grid")
        .append("svg")
        .attr("id", "svgx")
        .attr("width","80%")
        .attr("height","1040px");

        d3.select("#svgx").append("rect")
        .attr("class","fraccalc")


        function calcLinear(data, x, y, minX, minY){
              /////////
              //SLOPE//
              /////////

              // Let n = the number of data points
              var n = data.length;

              // Get just the points
              var pts = [];
              data.forEach(function(d,i){
                   console.log(d)
                var obj = {};
                obj.x = d[x];
                obj.y = d[y];
                obj.mult = obj.x*obj.y;
                pts.push(obj);
              });


              // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
              // Let b equal the sum of all x-values times the sum of all y-values
              // Let c equal n times the sum of all squared x-values
              // Let d equal the squared sum of all x-values
              var sum = 0;
              var xSum = 0;
              var ySum = 0;
              var sumSq = 0;
              pts.forEach(function(pt){
                sum = sum + pt.mult;
                xSum = xSum + pt.x;
                ySum = ySum + pt.y;
                sumSq = sumSq + (pt.x * pt.x);
              });
              var a = sum * n;
              var b = xSum * ySum;
              var c = sumSq * n;
              var d = xSum * xSum;

              // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
              // slope = m = (a - b) / (c - d)
              var m = (a - b) / (c - d);

              /////////////
              //INTERCEPT//
              /////////////

              // Let e equal the sum of all y-values
              var e = ySum;

              // Let f equal the slope times the sum of all x-values
              var f = m * xSum;

              // Plug the values you have calculated for e and f into the following equation for the y-intercept
              // y-intercept = b = (e - f) / n
              var b = (e - f) / n;

        			// Print the equation below the chart
        			document.getElementsByClassName("equation")[0].innerHTML = "y = " + m + "x + " + b;
        			document.getElementsByClassName("equation")[1].innerHTML = "x = ( y - " + b + " ) / " + m;

              // return an object of two points
              // each point is an object with an x and y coordinate
              return {
                ptA : {
                  x: minX,
                  y: m * minX + b
                },
                ptB : {
                  y: minY,
                  x: (minY - b) / m
                }
              }
          }




        function fraccalculation(selectsize){


            d3.select(".fraccalc")
            .attr("x", sx + (datalen /2 - selectsize) * ss )
            .attr("width", (selectsize * 2) * ss)
            .attr("y",  sx + (datalen /2 - selectsize) * ss)
            .attr("height", (selectsize * 2) * ss)
            .attr("fill", "white")
            .style("fill-opacity", 0)
            .attr("stroke", "blue")
            .attr('stroke-width', '3')

            counter = 0
            d3.selectAll(".roster").transition().delay(1000).style("opacity", function(d){
                if(d.x < (datalen)/2 +selectsize && d.x > (datalen )/2 - selectsize -1 && d.y < (datalen )/2 + selectsize  && d.y > (datalen )/2 - selectsize -1)
                    {if(d.value==1){ counter = counter + 1}; return 1}

                else{return 0.7}
            })
            console.log(height - yScale(counter));

            d3.select("#scatsvg").append("circle")
                        .attr("class","scatterdot")
                        .attr("cx", xScale(selectsize*2))
                        .attr("cy",  yScale(counter)
                        )
                        .attr("r", 5)
                        .attr("fill", "green");

            console.log(scatdict.add({"x":Math.log(selectsize*2), "y":Math.log(counter)}))
        }



    function updateColors(u){
    datas = json[u]


    d3.select("#svgx").selectAll("rect").data(datas["values"])
    .enter().append("rect")
    .attr("class", "roster")
    .attr("x", function(d,i){return sx + ss * d.x})
    .attr("width", ss)
    .attr("y", function(d,i){return sy + ss * d.y})
    .attr("height", ss)
    .attr("fill", function(d,i){if(d.value>0.5){return "blue"}else{return "red"}})
    .style("opacity", 0.7)
    // .on("mouseover", function(d){console.log(d.value)})

    d3.select("#svgx").selectAll("rect").data(datas["values"])
    .transition()
    .duration(500)
    .attr("fill", function(d,i){if(d.value==0){return "green"}else if(d.value == 1){return "red"}else if(d.value==2){return "grey"}else if(d.value==3){return "blue"}else{return "pink"}})

    d3.selectAll(".scatterdot").remove()

    fraccalculation(10)
    }
    updateColors(0)




    d3.select("#svgx").selectAll(".legend").data(["Vacant", "House","Industry","Commerce"])
    .enter().append("rect")
    .attr("class","legend")
    .attr("x", legendax)
    .attr("width", ss)
    .attr("y", function(d,i){console.log("Hi"); return sy + (ss + marge) * i})
    .attr("height", ss)
    .attr("fill", function(d,i){if(i==0){return "green"}else if(i == 1){return "red"}else if(i==2){return "grey"}else if(i==3){return "blue"}else{return "pink"}})

    d3.select("#svgx").selectAll("text").data(["Vacant", "House","Industry","Commerce"])
    .enter().append("text")
    .attr("x", legendax + 2*ss)
    .attr("y", function(d,i){console.log("Hi"); return sy + ss/2 + (ss + marge) * i})
    .text(function(d){return d})
    .style("font-size", ss + "px")

    console.log(Object.keys(json).length)

    var slider = d3Slider.sliderHorizontal()
      .domain([0,Object.keys(json).length])
      .width(300)
      .tickFormat(d3.format('.0'))
      .ticks(5)
      .default(0)
      .on('onchange', val => {
        updateColors(Math.round(val))});


    var g = d3.select("div#value").append("svg")
      .attr("width", 500)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(30,30)");

     var slider2 = d3Slider.sliderHorizontal()
        .domain([0,datalen/2])
        .width(300)
        .tickFormat(d3.format('.0'))
        .ticks(5)
        .default(10)
        .on('onchange', val => {console.log(typeof val);
         fraccalculation(Math.round(val))});

    g.call(slider);

    var g = d3.select("div#value").append("svg")
      .attr("width", 500)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(30,30)");

    g.call(slider2)


    d3.select("#button").on("click", function(d){
        console.log(scatdict);
        d3.selectAll(".scatterdot")["_groups"][0].forEach(function(d){console.log(d.x)})

        lg = calcLinear(scatdict, "x", "y", 10, 10);

        d3.select("#scatsvg").append("line")
    .attr("class", "regression")
    .attr("x1", xScale(lg.ptA.x))
    .attr("y1", yScale(lg.ptA.y))
    .attr("x2", xScale(lg.ptB.x))
    .attr("y2", yScale(lg.ptB.y))
    .style("stroke","blue");
    });

    d3.select("#time").on("click", function(d){
        i = 0
        console.log("start")

        var roster = d3.select("#svgx").selectAll("rect")

        function repeat(){
            console.log(i)
            i = i + 1
        roster.data(json[i]["values"])
        .transition()
        .duration(2000)
        .attr("fill", function(d,i){if(d.value==0){return "green"}else if(d.value == 1){return "red"}else if(d.value==2){return "grey"}else if(d.value==3){return "blue"}else{return "pink"}})


        d3.select("#svgx").select("rect")
        .transition()
        .duration(2000)
        .attr("opacity", 0.7)
        .on("end", function(d){console.log(i); if (i < datalen){repeat()}})
        }
        repeat(i)
    });

});
