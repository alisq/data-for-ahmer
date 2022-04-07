var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
//var parseTime = d3.timeParse("%y");

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline1 = d3.line()
.defined(function(d){return d.s1 != ""})
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.s1); });

var valueline2 = d3.line()
.defined(function(d){return d.s2 != ""})
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.s2); });

var valueline3 = d3.line()
.defined(function(d){return d.s3 != ""})
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.s3); });

var valueline4 = d3.line()
.defined(function(d){return d.s4 != ""})
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.s4); });

var valueline5 = d3.line()
    .defined(function(d){return d.s5 != ""})
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.s5); });


    var valueline6 = d3.line()
    .defined(function(d){return d.hd != ""})
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.hd); });



// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data/mem-num.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.date = d.Year;
      d.s1 = d["Scenario 1"];
      d.s2 = d["Scenario 2"];
      d.s3 = d["Scenario 3"];
      d.s4 = d["Scenario 4"];
      d.s5 = d["Scenario 5"];
      d.hd = d["Historical Data"];

  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.s1; })]);

  // Add the valueline path.
svg.append("path")
      .data([data])
      .attr("class", "line line1")      
      .attr("d", valueline1);

svg.append("path")
      .data([data])
      .attr("class", "line line2")
      .attr("d", valueline2);

svg.append("path")
      .data([data])
      .attr("class", "line line3")      
      .attr("d", valueline3);

svg.append("path")
      .data([data])
      .attr("class", "line line4")
      .attr("d", valueline4);

svg.append("path")
      .data([data])
      .attr("class", "line line5")      
      .attr("d", valueline5);

svg.append("path")
      .data([data])
      .attr("class", "line line6")      
      .attr("d", valueline6);



  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
        
  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});