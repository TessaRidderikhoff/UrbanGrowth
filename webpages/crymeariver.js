$.getJSON("river_results.json", function(json) {
    console.log(Object.keys(json).length)

    datalen = 50
    ss = 10
    sx = 50
    sy = 50

    marge = 20

    legendax = sx + datalen *ss + marge


    var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

padding = 50

    var grid = d3.select("#grid")
        .append("svg")
        .attr("id", "svgx")
        .attr("width","80%")
        .attr("height","1040px");

        d3.select("#svgx").append("rect")
        .attr("class","fraccalc")






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
      .domain([0,25])
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


    g.call(slider);


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
