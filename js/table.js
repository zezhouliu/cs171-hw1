/* * * * * * * * * * *
 * Zezhou Alex Liu
 * CS171 HW 1
 * 
 * bar.js
 * 
 * introduction to creating a bar chart visual using D3
 * * * * * * * * * * */

d3.text("unemp_states_us_nov_2013.tsv", function (error, data) {

    // parse the data and remove the first element for the heäder
    var parsedData = d3.tsv.parseRows(data);
    var headerData = parsedData.shift();
    headerData.push("Chart");   // add a custom column header 

    // define the custom alternating color function
    var zebraColorFunction = function (d, i) {
        if (i % 2 === 1)
            return "#FFFFFF";
        else
            return "#C0C0C0";
    };

    // sorting function definition that sorts based on which cell was pressed
    // identified by the column header and the row number
    var sortColumn = function (header, index) {

        // dont sort the first column
        if (index < 1) {
            return;
        }
        else if (index == headerData.indexOf("Chart")) {
            // if we click on chart header, we should pass this
            // to clicking by the Rate header (should be shared)
            index = headerData.indexOf("Rate");
            header = d3.selectAll("thead th")[0][index];
        }

        // Add a static property as a counter to track
        // the number of times the sorting filter is clicked
        if (!header.staticCounter) {
            header.staticCounter = 0;
        }

        // increment the click and track in our counter
        ++header.staticCounter;

        // update the table by sorting the rows based on this column
        tbody.selectAll("tr").sort(function (a, b) {

            // if odd # of times clicked, sort by increasing order
            if (header.staticCounter % 2 == 1) {

                // if equal priority, sort by name
                if (d3.ascending(a[index], b[index]) == 0) {
                    return d3.ascending(a[1], b[1]);
                }

                return d3.ascending(a[index], b[index]);
            }
            else {

                // if equal priority, sort by name
                if (d3.descending(a[index], b[index]) == 0) {
                    return d3.descending(a[1], b[1]);
                }

                return d3.descending(a[index], b[index]);

            }
        })
        .style("background-color", zebraColorFunction);

        // grab reference to the header and then add an ascending/descending flag so we
        // can display a hover-over indicator
        var th = d3.select(header);

        // if sorted in decreasing order, then show ascending flag
        if (header.staticCounter % 2 == 0) {
            th.attr("class", "descending");
        }
        else {
            th.attr("class", "ascending");
        }

    };


    // Add the h1 to top of page
    var header1 = d3.select("body").append("h1")
    .text("Unemployment Rates for States");

    // add the table
    var table = d3.select("body").append("table")
    .attr("class", "main-content");

    // Add stuff to the thead
    table.append("caption")
    .attr("class", "caption")
    .html("Unemployment Rates for States Monthly Rankings Seasonally Adjusted");

    thead = table.append("thead");
    tbody = table.append("tbody");
    // Add the column headers
    var head = thead.selectAll("th")
    .data(headerData)
    .enter()
    .append("th")
    .text(function (d) { return d; })
    .on("click", function (d, i) {
        sortColumn(this, i);
    })
    .on("mouseover", function (d, i) {

        // track which header element should be examined
        var header = this;

        // Should not allow sorting by rank, which is col 0
        if (i < 1) {
            return;
        }
        else if (i == headerData.indexOf("Chart")) {
            // if we're on the Chart header, forward it to Rate
            // since Rate + Chart directly associated
            i = headerData.indexOf("Rate");
            header = d3.selectAll("thead th")[0][i];
        }

        // Add a static property as a counter to track
        // the number of times the sorting filter is clicked
        if (!header.staticCounter) {
            header.staticCounter = 0;
        }

        var th = d3.select(this);

        // if sorted in decreasing order, then show ascending flag
        if (header.staticCounter % 2 == 0) {
            th.attr("class", "descending");
        }
        else {
            th.attr("class", "ascending");
        }

    });

    // Add stuff to the table bodies
    var rows = tbody.selectAll("tr")
    .data(parsedData)
    .enter()
    .append("tr")
    .style("background-color", zebraColorFunction)
    .on("mouseover", function (d, i) {
        d3.select(this).style("background-color", "#FFFF00");
    })
    .on("mouseout", function (d, i) {
        d3.select(this).style("background-color", zebraColorFunction(d, this.rowIndex - 1));
    });

    // Add and configure the cells in the table
    var cells = rows.selectAll("td")
    .data(function (row) {
        return d3.range(Object.keys(row).length).map(function (column, i) {
            return row[Object.keys(row)[i]];
        });
    })
    .enter()
    .append("td")
    .text(function (d) { return d; })
    .attr("class", function (d, i) {
        return "col_" + i; // assign class to each column
    })
    .on('mouseover', function (d, i) {
        d3.selectAll("td.col_" + i)
          .style("background-color", "#FFFF00");
    })
    .on('mouseout', function (d, i) {
        if (i == 2) {
            d3.selectAll("td.col_" + i)
              .style('background-color', function (d, i) {

                  var min = d3.min(d3.selectAll("tbody td.col_2")[0], function (td) {
                      return Math.min(td.innerHTML);
                  });
                  var max = d3.max(d3.selectAll("tbody td.col_2")[0], function (td) {
                      return Math.max(td.innerHTML);
                  });

                  var color = d3.scale.linear()
                    .domain([min, max])
                    .interpolate(d3.interpolateRgb)
                    .range(["silver", "green"]);

                  return color(d);
              });
        }
        else {
            d3.selectAll("td.col_" + i)
              .style('background-color', null);
        }
    })
    .style("background-color", function (d, i) {

        if (i == 2) {
            var min = d3.min(d3.selectAll("tbody td.col_2")[0], function (td) {
                return Math.min(td.innerHTML);
            });
            var max = d3.max(d3.selectAll("tbody td.col_2")[0], function (td) {
                return Math.max(td.innerHTML);
            });

            var color = d3.scale.linear()
              .domain([min, max])
              .interpolate(d3.interpolateRgb)
              .range(["silver", "green"]);

            return color(d);
        }
    });

    rows.insert("td").append("svg")
        .attr("width", 50)
        .attr("height", 23)
        .append("rect")
        .attr("height", 23)
        .attr("fill", "green")
        .attr("width", function (d) { return parseFloat(d[0]); });

    // on-load, set the default column as rate and sort the table
    var defaultColumn = headerData.indexOf("Rate");
    var col = d3.selectAll("thead th")[0][defaultColumn];
    sortColumn(col, defaultColumn);

});