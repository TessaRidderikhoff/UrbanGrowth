clicked =false;
widthsize = 0

d3.selectAll("img").on("click",function(d){
    if(clicked){
        console.log(d3.select(this).width);
        widthsize = d3.select(this).width
        d3.select(this).attr("width", widthsize)
        clicked = false}
    else{
        d3.select(this).attr("width", "100%")
        clicked = true;
    }
        })
