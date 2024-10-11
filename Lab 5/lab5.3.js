function init(){
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
    var maxValue = 25;
    var w = 500;
    var h = 100;
    var bar_padding = 3;

    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([0, h]);
                    
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "rgb(106,90,205)");

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("fill", "black")
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 15;
        })
        .attr("text-anchor", "middle");

    d3.select("#Add")
        .on("click", function() {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);

            xScale.domain(d3.range(dataset.length));
            yScale.domain([0, d3.max(dataset)]);

            // Update bars
            var bars = svg.selectAll("rect")
                .data(dataset);

            bars.enter()
                .append("rect")
                .attr("x", w)  // Start new bars outside the current view
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", "rgb(106,90,205)")  // Match the color
                .merge(bars)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                });

            // Update text labels
            var labels = svg.selectAll("text")
                .data(dataset);

            labels.enter()
                .append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", w)  // Start new labels outside the current view
                .attr("y", function(d) {
                    return h - yScale(d) + 15;
                })
                .attr("text-anchor", "middle")
                .merge(labels)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 15;
                })
                .text(function(d) {
                    return d;
                });
        });

    d3.select("#Remove")
        .on("click", function() {
            if (dataset.length > 0) {
                dataset.pop();  // Remove the last element

                xScale.domain(d3.range(dataset.length));
                yScale.domain([0, d3.max(dataset)]);

                // Update bars
                var bars = svg.selectAll("rect")
                    .data(dataset);

                bars.exit()  // Remove the last bar
                    .transition()
                    .duration(500)
                    .attr("x", w)  // Transition it off-screen
                    .remove();

                bars.transition()
                    .duration(500)
                    .attr("x", function(d, i) {
                        return xScale(i);
                    })
                    .attr("y", function(d) {
                        return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                        return yScale(d);
                    });

                // Update text labels
                var labels = svg.selectAll("text")
                    .data(dataset);

                labels.exit()  // Remove the last text label
                    .transition()
                    .duration(500)
                    .attr("x", w)  // Transition it off-screen
                    .remove();

                labels.transition()
                    .duration(500)
                    .attr("x", function(d, i) {
                        return xScale(i) + xScale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                        return h - yScale(d) + 15;
                    })
                    .text(function(d) {
                        return d;
                    });
            }
        });
}


window.onload = init;
