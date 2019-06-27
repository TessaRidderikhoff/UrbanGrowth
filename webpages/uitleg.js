$.getJSON("uitleg.json", function(datas) {

console.log(datas[0]);

m = 4
nhsize = 3

ss = 30
sx = 50
sy = 50

marge = 20

legendaselect = 1
midvalue = 0

legendax = sx + 10 *ss + marge

var grid = d3.select("#grid")
    .append("svg")
    .attr("id", "svgx")
    .attr("width","80%")
    .attr("height","350px");


d3.select("#svgx").selectAll(".legend").data(["Vacant", "House","Industry","Commerce"])
.enter().append("rect")
.attr("class","legend")
.attr("x", legendax)
.attr("width", ss)
.attr("y", function(d,i){console.log("Hi"); return sy + (ss + marge) * i})
.attr("height", ss)
.attr("fill", function(d,i){if(i==0){return "green"}else if(i == 1){return "red"}else if(i==2){return "grey"}else if(i==3){return "blue"}else{return "pink"}})
.on("click", function(d, i){d3.selectAll(".legend").attr("stroke", "None"); d3.select(this).attr("stroke", "black"); legendaselect = i; count()})

d3.select("#svgx").selectAll("text").data(["Vacant", "House","Industry","Commerce"])
.enter().append("text")
.attr("x", legendax + 2*ss)
.attr("y", function(d,i){console.log("Hi"); return sy + ss/2 + (ss + marge) * i})
.text(function(d){return d})
.style("font-size", ss + "px")

dikkie = {0: 0, 1: 0, 2: 1, 4: 2, 5: 3, 8: 4, 9: 5, 10: 6, 13: 7, 16: 8, 17: 9, 18: 10, 20: 11, 25: 12, 26: 13, 29: 14, 32: 15}

mkd = [[[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[[2,2,1.5,1.5,1,1,1,1,0.5,0.5,0.5,0.5,0.5,0.1,0.1,0.1,0.1,0.1,0,0,0,0,0,0,0,0],
               [-10,-10,-5,-3,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [-2,-1,2,1,1,1,0.5,0.5,0.4,0.3,0.2,0.1,0.1,0.1,0,0,0,0,0,0,0,0,0,0,0,0]],[[-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [3,3,2,1,0,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[[4,3.5,3,2.5,2,2,2,1.5,1.5,1.5,1.5,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [25,25,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0]]],
        [[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], [[-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
                    [[4,3.5,3,2.5,2,2,2,1.5,1.5,1.5,1.5,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [25,25,25,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,0,0,0,0,0,0,0,0]]],
        [[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
                [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
                        [[4,3.5,3,2.5,2,2,2,1.5,1.5,1.5,1.5,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                            [-2,-2,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [25,25,25,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,0,0,0,0,0,0,0,0]]
                        ]]




function count(){
    console.log(midvalue);
    console.log(legendaselect);

    counter = 0

    d3.select("#middle").attr("iets", function(d){midvalue = d.value})
    if(midvalue < 3){
    d3.selectAll(".roster").each(function(d){



        if (location(d) -1 < nhsize){

            if(d.value > 0 ) {counter = counter + mkd[midvalue][legendaselect][d.value - 1][dikkie[(d.x - m)*(d.x - m) + (d.y - m)*(d.y - m)]]}
        }

    })
    d3.select("#text").html(counter)
    }
    else{
        d3.select("#text").html(counter)
    }
}

function location(d){
    if(d.x == 0 || d.y == 0 || d.x == 8 || d.y == 8){
        return 4
    }
    else if(d.x == 1 || d.y == 1 || d.x == 7 || d.y == 7){
        return 3
    }
    else if(d.x == 2 || d.y == 2 || d.x == 6 || d.y == 6){
        return 2
    }
    else if(d.x == 3 || d.y == 3 || d.x == 5 || d.y == 5){
        return 1
    }
    else if(d.x == 4 || d.y == 4){
        return 0
    }
}

function updateColors(u){

console.log("hi")
d3.select("#svgx").selectAll(".roster").data(datas[0]["values"])
.enter().append("rect")
.attr("id", function(d){if(d.x==m && d.y==m){return "middle"}})
.attr("class", "roster")
.attr("x", function(d,i){return sx + ss * d.x})
.attr("width", ss)
.attr("y", function(d,i){return sy + ss * d.y})
.attr("height", ss)
.attr("stroke","black")
.attr("fill", function(d,i){if(d.value==0){return "green"}else if(d.value == 1){return "red"}else if(d.value==2){return "grey"}else if(d.value==3){return "blue"}else{return "pink"}})
.attr("opacity", 0.7)
.on("click", function(d){

        if (d.value < 3){ d.value = d.value + 1}
        else{d.value = 0};
        d3.select(this).attr("fill", function(d,i){if(d.value==0){return "green"}else if(d.value == 1){return "red"}else if(d.value==2){return "grey"}else if(d.value==3){return "blue"}else{return "pink"}})
        count()
})

d3.select("#svgx").selectAll(".roster").data(datas[0]["values"])
.transition()
.duration(2000)
.attr("class", "roster")
.attr("x", function(d,i){return sx + ss * d.x})
.attr("width", ss)
.attr("y", function(d,i){return sy + ss * d.y})
.attr("height", ss)
.attr("fill", function(d,i){if(d.value==0){return "green"}else if(d.value == 1){return "red"}else if(d.value==2){return "grey"}else if(d.value==3){return "blue"}else{return "pink"}})

d3.selectAll(".scatterdot").remove()


}

updateColors(0)


var grid = d3.select("#svgx")
    .append("text")
    .attr("id", "text")
    .attr("x", sx + (m + 0.5) * ss)
    .attr("y", sy + (m + 0.5) * ss)
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .html(0);

    var slider = d3Slider.sliderHorizontal()
      .domain([1, 4])
      .width(300)
      .tickFormat(d3.format('.0'))
      .ticks(4)
      .default(nhsize)
      .on('onchange', val => {

        if(nhsize != Math.round(val)){
            nhsize = Math.round(val);

            d3.selectAll(".roster").each(function(d){if(location(d) -1 < nhsize){d3.select(this).attr("opacity", 1)}else{d3.select(this).attr("opacity", 0.7)} })
            count()

        }});



    var g = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(30,30)");

    g.call(slider);

});
