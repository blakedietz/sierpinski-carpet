var width = 900;

   var svg = d3.select("body").append("svg")
       .attr("width", width)
       .attr("height", width)
     .append("g")
       .call(d3.behavior.zoom().scaleExtent([1, 50000]).on("zoom", zoom))
     .append("g");

   svg.append("rect")
       .attr("class", "overlay")
       .attr("fill","none")
       .attr("pointer-events","all")
       .attr("width", width)
       .attr("height", width);

   var margin = {"left":0, "right":0 ,"top":10, "bottom":0}
   var xScale = d3.scale.linear().domain([0, 1500]).range([margin.left,width]);
   var yScale = d3.scale.linear().domain([0,600]).range([width, margin.top]);
   var lineGenerator = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;})
                        .interpolate("linear");

   function sierpinskiCarpet(level, length, coord)
   {  
      if( level> -1)
      {
        svg.append("rect")
          .attr("height", length/3)
          .attr("width",  length/3)
          .attr("x", coord.x + length/3)
          .attr("y", coord.y + length/3)
          .attr("fill","black");

        for (var i = 0; i < 3; i++) 
        {
          for (var j = 0; j < 3; j++) 
          {
            sierpinskiCarpet(level -1 , length/3, {"x": coord.x + i/3 * length,"y": coord.y + j/3 * length });
          };
        } 
      }
   }

   sierpinskiCarpet(5, width, {"x":0, "y":0});


function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}