//margins
var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 900 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

//date
var parseDate = d3.time.format("%d-%b-%y").parse;

//ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

//axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

//lines
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

//svg canvas
var svg = d3.select("#body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// data.csv
d3.csv("datamulti.csv", function(error, data) {
    if (error) throw error;
    data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.value = +d.value;
    });
    //data range
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);
    var dataNest = d3.nest()
        .key(function(d) { return d.emotion; })
        .entries(data);
    var color = d3.scale.category10();
    //legend
    legendSpace = width/dataNest.length;
    dataNest.forEach(function(d,i) {
        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() {
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, ''))
            .attr("d", valueline(d.values));
        //append legend
        svg.append("text")
            .attr("x", width - 100)  // space legend
            .attr("y", legendSpace + i*40)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1;
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100)
                    .style("opacity", newOpacity);
                // Update whether or not the elements are active
                d.active = active;
                })
            .text(d.key);
    });
    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});
