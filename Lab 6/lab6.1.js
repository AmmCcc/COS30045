function init() {
    d3.select("#Add")
        .on("click", function () {
            Add();
        });

    d3.select("#Remove")
        .on("click", function () {
            remove();
        });

    var dataset = [20, 15, 24, 26, 13, 9, 7, 17, 8, 14, 20];
    var w = 500;
    var h = 200;
    var maxValues = 25;
    var padding = 20;

    // Initialize scales
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([padding, w])
        .paddingInner(0.05);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .rangeRound([h - padding, 0]);

    // Create SVG container
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h + 30);

    // Function to add a bar
    function Add() {
        var newNumber = Math.floor(Math.random() * maxValues); // Create new data to add bar
        dataset.push(newNumber);

        // Update yScale domain based on the new data
        yScale.domain([0, d3.max(dataset)]);
        xScale.domain(d3.range(dataset.length));

        // Update bars
        var bars = svg.selectAll("rect")
            .data(dataset);

        // Enter selection for new bars
        bars.enter()
            .append("rect")
            .attr("fill", "slategrey")
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("fill", "orange")
                    .transition();

                // Get the x and y position
                var xPosition = parseFloat(d3.select(this).attr("x"));
                var yPosition = parseFloat(d3.select(this).attr("y"));

                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition + 5)
                    .attr("y", yPosition + 15)
                    .text(d);
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("fill", "slategrey");
                d3.select("#tooltip").remove(); // Remove the tooltip
            })
            .attr("x", w) // Position bars off-screen initially
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return h - yScale(d) - padding; // Correct height calculation
            })
            .merge(bars) // Update existing bars
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return h - yScale(d) - padding; // Correct height calculation
            });
    }

    // Function to remove the first bar
    function remove() {
        dataset.pop();

        // Update scales
        yScale.domain([0, d3.max(dataset)]);
        xScale.domain(d3.range(dataset.length));

        // Update bars
        var bars = svg.selectAll("rect")
            .data(dataset);

             // Update existing bars
    bars.transition()
    .duration(500)
    .attr("x", function (d, i) {
        return xScale(i); // Update x position
    })
    .attr("y", function (d) {
        return yScale(d); // Update y position
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return h - yScale(d) - padding; // Update height calculation
    });

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w) // Move bars off-screen
            .remove();
    }

    // Initial drawing of the bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("fill", "slategrey")
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("fill", "orange")
                .transition();

            var xPosition = parseFloat(d3.select(this).attr("x"));
            var yPosition = parseFloat(d3.select(this).attr("y"));

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition + 5)
                .attr("y", yPosition + 15)
                .text(d);
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("fill", "slategrey");
            d3.select("#tooltip").remove();
        })
        .attr("x", function (d, i) {
            return xScale(i); // Use xScale for x-position
        })
        .attr("y", function (d) {
            return yScale(d); // Use yScale for y-position
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return h - yScale(d) - padding; // Correct height calculation
        });
}

window.onload = init;
