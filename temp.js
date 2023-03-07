const piedata = pie().value(d=>d.Total_emissions)(data_veg);
const colors = scaleOrdinal()
    .domain(data_veg)
    .range(sectionColors);

// Object for generating Arcs of the sections
const arcGenerator = d3.arc()
.innerRadius(0)
.outerRadius(250);

// Segments are the partition in the Pie Chart
  const segments = arc()
    .innerRadius(0)
    .outerRadius(175)
    .padAngle(0)
    .padRadius(0);

const sections = svg.append("g")
    .attr("transform", `translate(250,250)`)
    .selectAll("path").data_veg(piedata);

sections.enter()
  .append("path")
  .attr("d", segments)
    .attr("fill", d => colors(d.data_veg.Total_emissions));

// Render text on each section
sections
  .enter()
  .append('text')
  .text(d => xAxisTickFormat((d.data_veg.Total_emissions))+"Kg")
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
    .style('fill', 'black')
  .style("font-size", 10);

// Render legend for the data_veg
const legends = svg.append("g")
    .attr("transform", "translate(500,100)")
  .selectAll(".legends").data_veg(piedata);

const legend = legends.enter().append("g").classed(".legends",true)
    .attr("transform", (d,i)=>{
    return `translate(0,${(i+1)*30})`;
  });

// Formats the legend for Deaths
legend.append("rect").attr("width",20).attr("height",20)
    .attr("fill", d => colors(d.data_veg.Total_emissions));

legend.append("text")
    .attr("x", 250)
    .attr("y", 15)
    .attr("class","legend_value")
    .text(d=>xAxisTickFormat((d.data_veg.Total_emissions))+"K");

// Formats the legend for Countries 
legend.append("text")
    .attr("x", 25)
    .attr("y", 15)
    .attr("class","legend_text")
    .text(d => d.data_veg['Food product']);