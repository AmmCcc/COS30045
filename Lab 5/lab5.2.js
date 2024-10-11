function init(){
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
    var maxValue = 25;
    var w = 500;
    var h = 200;
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
                .attr("height", h)
                .attr("fill", "rgb(106,90,205)");

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
        });

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

    d3.select("#updateButton")
        .on("click", function() {
            var numValues = dataset.length;
            dataset = [];

            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
            }

            // Update yScale to match the new data
            yScale.domain([0, d3.max(dataset)]);

            // Update bars
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i *100;
                })
                .duration(1000)
                .ease(d3.easeCircleIn)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("height", function(d) {
                    return yScale(d);
                });

            // Update text labels
            svg.selectAll("text")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i *100;
                })
                .duration(1000)
                .ease(d3.easeCircleIn)
                .text(function(d) {
                    return d;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 15;
                });
        });

    // Transition 1: Linear transition
    d3.select("#trans1")
    .on("click", function() {
            var numValues = dataset.length;
            dataset = [];

            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
            }

            // Update yScale to match the new data
            yScale.domain([0, d3.max(dataset)]);

            // Update bars
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i *100;
                })
                .duration(1000)
                .ease(d3.easeCubicInOut)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("height", function(d) {
                    return yScale(d);
                });

            // Update text labels
            svg.selectAll("text")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i *100;
                })
                .duration(1000)
                .ease(d3.easeCubicInOut)
                .text(function(d) {
                    return d;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 15;
                });
        });

    // Transition 2: Bounce transition
    d3.select("#trans2")
    .on("click", function() {
            var numValues = dataset.length;
            dataset = [];

            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
            }

            // Update yScale to match the new data
            yScale.domain([0, d3.max(dataset)]);

            // Update bars
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i *100;
                })
                .duration(1000)
                .ease(d3.easeElasticOut)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("height", function(d) {
                    return yScale(d);
                });

            // Update text labels
            svg.selectAll("text")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i *100;
                })
                .duration(1000)
                .ease(d3.easeElasticOut)
                .text(function(d) {
                    return d;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 15;
                });
        });
}


window.onload = init;
