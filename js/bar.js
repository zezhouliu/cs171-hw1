/* * * * * * * * * * *
 * Zezhou Alex Liu
 * CS171 HW 1
 * 
 * bar.js
 * 
 * introduction to creating a bar chart visual using D3
 * * * * * * * * * * */

// set-up the params for the visuals
var margin = { top: 50, bottom: 10, left: 300, right: 40 };
var width = 900 - margin.left - margin.right;
var height = 900 - margin.top - margin.bottom;

// set up the scale for the visual
var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.ordinal().rangeRoundBands([0, height], .8, 0);

// XXX: standard bar height, update as appropriate
var bar_height = 15;

var state = function (d) { return d.State; };

// create the SVG, and g elements for the bars
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

g.append("text")
  .style("font-size", 18)
  .style("font-weight", "bold")
  .text("Unemployment Rates for States");

d3.tsv("unemp_states_us_nov_2013.tsv", function (data) {

    var max = d3.max(data, function (d) { return d.Rate; });
    var min = 0;

    xScale.domain([min, max]);
    yScale.domain(data.map(state));

    // color function for the bars based on their attributes (defaulted)
    var color = d3.scale.linear()
        .domain(d3.extent(data, function (d) { return parseFloat(d.Rate); }))
        .interpolate(d3.interpolateRgb)
        .range(["orangered", "silver"])

    // groups the bars based on their state
    var groups = g.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return "translate(0, " + yScale(d.State) + ")"; });

    var bars = groups
        .append("rect")
        .attr("width", function (d) { return xScale(d.Rate); })
        .attr("height", bar_height)
        .attr("fill", function (d) { return color(d.Rate); });

    groups.append("text")
        .attr("x", function (d) { return xScale(d.Rate) - 3; })
        .attr("y", function (d) { return bar_height / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text(function (d) { return d["Rate"]; })

    groups.append("text")
        .attr("x", -5)
        .attr("y", function (d) { return bar_height / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("fill", "teal")
        .text(function (d) { return d["State"]; })

    // default a sorting once the data has been loaded
    d3.selectAll("input").on("click", reorder);

    // reorder the bars based on a selected index (category)
    function reorder() {
        var is_sorted = (d3.select(this).attr("id") == "sorted");

        // toggle sorted state
        d3.selectAll("input").attr("id", null);
        if (!is_sorted)
            d3.select(this).attr("id", "sorted");

        if (this.value == "state")
            data.sort(function (a, b) {
                var ascending = d3.ascending(a.State, b.State);
                return is_sorted ? -ascending : ascending;
            });
        else if (this.value == "rate")
            data.sort(function (a, b) {
                var ascending = d3.ascending(parseFloat(a.Rank), parseFloat(b.Rank)) || d3.ascending(a.State, b.State);
                return is_sorted ? -ascending : ascending;
            });

        yScale.domain(data.map(state));

        groups.transition()
          .duration(750)
          .delay(function (d, i) { return i * 10; })
          .attr("transform", function (d, i) { return "translate(0, " + yScale(d.State) + ")"; });
    };

});
