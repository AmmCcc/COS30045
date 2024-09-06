function init(){
    // Reading the data from CSV file
    d3.csv("task2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;

        barChart(wombatSightings);
    });

    var w = 500;
    var h = 150;
    var bar_padding = 3;
    
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "rgb(106,90,205)");

    function barChart(wombatSightings) {
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            // x and y
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length);
            })
            .attr("y", function(d) {
                return h - (d.wombats * 4);
            })
            // width and height of the bar chart
            .attr("width", function(d) {
                return (w / wombatSightings.length - bar_padding);
            })
            .attr("height", function(d) {
                return d.wombats * 4;
            })
            .attr("fill", function(d) {
                return "rgb(135,206, " + (d.wombats * 8) + ")";
            });
        
        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            .text(function(d) {
                return d.wombats;
            })
            .attr("fill", "black")
            .attr("x", function(d, i) {
                // Center the text horizontally within the bar
                return i * (w / wombatSightings.length) + (w / wombatSightings.length - bar_padding) / 2;
            })
            .attr("y", function(d) {
                // Place the text just below the top of the bar
                return h - (d.wombats * 4) + 20; // Adjust the offset value as needed
            })
            .attr("text-anchor", "middle"); // Center text horizontally
    }
}

window.onload = init;
