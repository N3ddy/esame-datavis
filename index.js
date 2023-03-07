import { csv } from 'd3';
import {
  select,
  json,
  pie,
  arc,
  scaleOrdinal,
  format
} from 'd3';

// Colors for the sections in Pie Chart
const sectionColors = [
  		'#089E1B', '#9C8508', '#9F0CE8', '#0093E0', '#D13400', '#889608', '#9C5308', '#0C34E8', '#00BF5C', '#D10096',
      '#998608'];

// Data set URI
const csvUrl = 'https://gist.githubusercontent.com/N3ddy/8cf722065abecebf54a34a6344f173db/raw/60bd8c4467a1bca472dff0b927dc82165d0cb5d1/Food_Production.csv';

// Function to fetch data from the URI
const fetchData = async () => {
  let data = await csv(csvUrl);
  data = data.filter(d => d['Animal Feed'] > 0)
  console.log(data)
  return data;
};

const fetchVegData = async () => {
  let data = await csv(csvUrl);
  data = data.filter(d => d['Animal Feed'] <= 0)
  data = data.filter(d => d.Total_emissions > 2)
  console.log(data)
  return data;
};

// Select the SVG from the HTML body
const svg = select("svg");

// Format axes text
const xAxisTickFormat = number =>
  	format('.4~g')(number);

// Render Pie Chart on the canvas
const animal_render = (data) => {
  const pieData = pie().value(d=>d.Total_emissions)(data);
  const colors = scaleOrdinal()
  	.domain(data)
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
  	.selectAll("path").data(pieData);
  
  sections.enter()
    .append("path")
    .attr("d", segments)
  	.attr("fill", d => colors(d.data.Total_emissions));
  
  // Render text on each section
  sections
    .enter()
    .append('text')
    .text(d => xAxisTickFormat((d.data.Total_emissions))+"Kg")
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
  	.style('fill', 'black')
    .style("font-size", 10);
  
  // Render legend for the data
  const legends = svg.append("g")
  	.attr("transform", "translate(500,100)")
    .selectAll(".legends").data(pieData);
  
  const legend = legends.enter().append("g").classed(".legends",true)
  	.attr("transform", (d,i)=>{
      return `translate(0,${(i+1)*30})`;
    });
  
  // Formats the legend for Deaths
  legend.append("rect").attr("width",20).attr("height",20)
  	.attr("fill", d => colors(d.data.Total_emissions));
  
  legend.append("text")
  	.attr("x", 250)
  	.attr("y", 15)
  	.attr("class","legend_value")
  	.text(d=>xAxisTickFormat(d.data.Total_emissions)+"Kg");
  
  // Formats the legend for Countries 
  legend.append("text")
  	.attr("x", 25)
  	.attr("y", 15)
  	.attr("class","legend_text")
  	.text(d => d.data['Food product']);
}

const plant_render = (data) => {
  const pieData = pie().value(d=>d.Total_emissions)(data);
  const colors = scaleOrdinal()
  	.domain(data)
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
    .attr("transform", `translate(1000,250)`)
  	.selectAll("path").data(pieData);
  
  sections.enter()
    .append("path")
    .attr("d", segments)
  	.attr("fill", d => colors(d.data.Total_emissions));
  
  // Render text on each section
  sections
    .enter()
    .append('text')
    .text(d => xAxisTickFormat((d.data.Total_emissions))+"Kg")
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
  	.style('fill', 'black')
    .style("font-size", 10);
  
  // Render legend for the data
  const legends = svg.append("g")
    .attr("transform", "translate(1250,100)")
    .selectAll(".legends").data(pieData);
  
  const legend = legends.enter().append("g").classed(".legends",true)
  	.attr("transform", (d,i)=>{
      return `translate(0,${(i+1)*30})`;
    });
  
  // Formats the legend for Deaths
  legend.append("rect").attr("width",20).attr("height",20)
  	.attr("fill", d => colors(d.data.Total_emissions));
  
  legend.append("text")
  	.attr("x", 250)
  	.attr("y", 15)
  	.attr("class","legend_value")
  	.text(d=>xAxisTickFormat((d.data.Total_emissions))+"Kg");
  
  // Formats the legend for Countries 
  legend.append("text")
  	.attr("x", 25)
  	.attr("y", 15)
  	.attr("class","legend_text")
  	.text(d => d.data['Food product']);
}

// Main function
const run = async () => {
  let animal_data = await fetchData()
  let veg_data = await fetchVegData()
	animal_render(animal_data);
  plant_render(veg_data);
};

run();