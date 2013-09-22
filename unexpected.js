var width = 900,
    height = 900;

   var svg = d3.select("body").append("svg")
       .attr("width", width)
       .attr("height", height)
     .append("g")
       .call(d3.behavior.zoom().scaleExtent([1, 50000]).on("zoom", zoom))
     .append("g");

   svg.append("rect")
       .attr("class", "overlay")
       .attr("fill","none")
       .attr("pointer-events","all")
       .attr("width", width)
       .attr("height", height);

   var margin = {"left":0, "right":0 ,"top":10, "bottom":0}
   var xScale = d3.scale.linear().domain([0, 1500]).range([margin.left,width]);
   var yScale = d3.scale.linear().domain([0,600]).range([height, margin.top]);
   var lineGenerator = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;})
                        .interpolate("linear");

   function sierpinskiCarpet(level, width, height, row, column)
   {  
      if(level > 0)
      {
        svg.append("rect").attr("x", (width/3) + (width/3) * row).attr("y", (height/3) + (height/3) * column).attr("height", height/3).attr("width",width/3).attr("fill","black");

        for (var i = 0; i < 3; i++)
        {
          for (var j = 0; j < 3; j++)
          {
            if (!(i == 1 && j == 1))
              sierpinskiCarpet(level--, width/3, height/3, i, j)

          }
        }
      }
   }

   sierpinskiCarpet(2, width, height, 0, 0);


function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}