(function (d3$1) {
  'use strict';

  // Colors for the sections in Pie Chart
  var sectionColors = [
    		'#2688FF', '#302DEB', '#E836EB', '#A54CFF', '#FF4762', '#FF032E', '#EB3607', '#A8770C', '#C96D1C', '#948312',
        '#998608'];

  // Data set URI
  var csvUrl = 'https://gist.githubusercontent.com/N3ddy/8cf722065abecebf54a34a6344f173db/raw/60bd8c4467a1bca472dff0b927dc82165d0cb5d1/Food_Production.csv';

  // Function to fetch data from the URI
  var fetchData = async function () {
    var data = await d3$1.csv(csvUrl);
    data = data.filter(function (d) { return d['Animal Feed'] > 0; });
    console.log(data);
    return data;
  };

  var fetchVegData = async function () {
    var data = await d3$1.csv(csvUrl);
    data = data.filter(function (d) { return d['Animal Feed'] <= 0; });
    data = data.filter(function (d) { return d.Total_emissions > 2; });
    console.log(data);
    return data;
  };

  // Select the SVG from the HTML body
  var svg = d3$1.select("svg");

  // Format axes text
  var xAxisTickFormat = function (number) { return d3$1.format('.4~g')(number); };

  // Render Pie Chart on the canvas
  var animal_render = function (data) {
    var pieData = d3$1.pie().value(function (d){ return d.Total_emissions; })(data);
    var colors = d3$1.scaleOrdinal()
    	.domain(data)
    	.range(sectionColors);
    
    // Object for generating Arcs of the sections
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(250);

    // Segments are the partition in the Pie Chart
  	var segments = d3$1.arc()
    	.innerRadius(0)
    	.outerRadius(175)
    	.padAngle(0)
    	.padRadius(0);
    
    var sections = svg.append("g")
    	.attr("transform", "translate(250,250)")
    	.selectAll("path").data(pieData);
    
    sections.enter()
      .append("path")
      .attr("d", segments)
    	.attr("fill", function (d) { return colors(d.data.Total_emissions); });
    
    // Render text on each section
    sections
      .enter()
      .append('text')
      .text(function (d) { return xAxisTickFormat((d.data.Total_emissions))+"Kg"; })
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
    	.style('fill', 'black')
      .style("font-size", 10);
    
    // Render legend for the data
    var legends = svg.append("g")
    	.attr("transform", "translate(500,100)")
      .selectAll(".legends").data(pieData);
    
    var legend = legends.enter().append("g").classed(".legends",true)
    	.attr("transform", function (d,i){
        return ("translate(0," + ((i+1)*30) + ")");
      });
    
    // Formats the legend for Deaths
    legend.append("rect").attr("width",20).attr("height",20)
    	.attr("fill", function (d) { return colors(d.data.Total_emissions); });
    
    legend.append("text")
    	.attr("x", 250)
    	.attr("y", 15)
    	.attr("class","legend_value")
    	.text(function (d){ return xAxisTickFormat(d.data.Total_emissions)+"Kg"; });
    
    // Formats the legend for Countries 
    legend.append("text")
    	.attr("x", 25)
    	.attr("y", 15)
    	.attr("class","legend_text")
    	.text(function (d) { return d.data['Food product']; });
  };

  var plant_render = function (data) {
    var pieData = d3$1.pie().value(function (d){ return d.Total_emissions; })(data);
    var colors = d3$1.scaleOrdinal()
    	.domain(data)
    	.range(sectionColors);
    
    // Object for generating Arcs of the sections
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(250);

    // Segments are the partition in the Pie Chart
  	var segments = d3$1.arc()
    	.innerRadius(0)
    	.outerRadius(175)
    	.padAngle(0)
    	.padRadius(0);
    
    var sections = svg.append("g")
      .attr("transform", "translate(1000,250)")
    	.selectAll("path").data(pieData);
    
    sections.enter()
      .append("path")
      .attr("d", segments)
    	.attr("fill", function (d) { return colors(d.data.Total_emissions); });
    
    // Render text on each section
    sections
      .enter()
      .append('text')
      .text(function (d) { return xAxisTickFormat((d.data.Total_emissions))+"Kg"; })
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
    	.style('fill', 'black')
      .style("font-size", 10);
    
    // Render legend for the data
    var legends = svg.append("g")
      .attr("transform", "translate(1250,100)")
      .selectAll(".legends").data(pieData);
    
    var legend = legends.enter().append("g").classed(".legends",true)
    	.attr("transform", function (d,i){
        return ("translate(0," + ((i+1)*30) + ")");
      });
    
    // Formats the legend for Deaths
    legend.append("rect").attr("width",20).attr("height",20)
    	.attr("fill", function (d) { return colors(d.data.Total_emissions); });
    
    legend.append("text")
    	.attr("x", 250)
    	.attr("y", 15)
    	.attr("class","legend_value")
    	.text(function (d){ return xAxisTickFormat((d.data.Total_emissions))+"Kg"; });
    
    // Formats the legend for Countries 
    legend.append("text")
    	.attr("x", 25)
    	.attr("y", 15)
    	.attr("class","legend_text")
    	.text(function (d) { return d.data['Food product']; });
  };

  // Main function
  var run = async function () {
    var animal_data = await fetchData();
    var veg_data = await fetchVegData();
  	animal_render(animal_data);
    plant_render(veg_data);
  };

  run();

})(d3);
//# sourceMappingURL=bundle.js.map
