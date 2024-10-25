function init() {
  var w = 300;
  var h = 300;

  var dataset = [
      { apples: 5, oranges: 10, grapes: 22 },
      { apples: 4, oranges: 12, grapes: 28 },
      { apples: 2, oranges: 19, grapes: 32 },
      { apples: 7, oranges: 23, grapes: 35 },
      { apples: 23, oranges: 17, grapes: 43 }
  ];

  var keys = ["apples", "oranges", "grapes"];

  var stack = d3.stack().keys(keys);

  var series = stack(dataset);

  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w + 100) // Added space for the legend
      .attr("height", h);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var groups = svg.selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .style("fill", function(d, i) {
          return color(i);
      });

  var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) {
          return d.apples + d.oranges + d.grapes;
      })])
      .range([h, 0]);

  var xScale = d3.scaleBand()
      .domain(dataset.map(function(d, i) {
          return i;
      }))
      .range([0, w])
      .padding(0.05);

  // Draw rectangles
  var rectangles = groups.selectAll("rect")
      .data(function(d) { return d; })
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
          return xScale(i);
      })
      .attr("y", function(d, i) {
          return yScale(d[1]);
      })
      .attr("height", function(d) {
          return yScale(d[0]) - yScale(d[1]);
      })
      .attr("width", xScale.bandwidth());

  // Adding a legend
  var legend = svg.selectAll(".legend")
      .data(keys)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
          return "translate(" + (w + 10) + "," + (i * 20) + ")";
      });

  legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {
          return color(i);
      });

  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) {
          return d;
      });
}

window.onload = init;
