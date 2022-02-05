// Load in the JSON data
d3.json('medals.json').then((importedData) => {
  
  const medalsData = importedData;

  countryNames = [];

  for (var i = 0; i < medalsData.length; i++) {
    if (countryNames.includes(medalsData[i].country)) {   
    }
    else {
      countryNames.push(medalsData[i].country)
    }
  };
  
  // DROP DOWN MENU
  var dropdownMenu = d3.select("#selCountry");
    
  // assign all the id's to the menu options
  countryNames.forEach(country => {
    var row = dropdownMenu.append("option");
       row.text(country);
  });
  
  
  // Create a function to add medal data together
  function sumMedals(data){
    var medalCount= {"Gold":null, "Silver":null, "Bronze":null};
   
    for (var i = 0; i < data.length; i++) {
      if (data[i].medal_type == "Gold Medal"){
        medalCount.Gold += 1;
      }
      else if (data[i].medal_type == "Silver Medal"){
        medalCount.Silver += 1;
      }
      else {
       medalCount.Bronze += 1
      } 
    };
    return medalCount
  }
  
  // Create a function to add gender data together
  function sumGender(data){
    var genderCount= {"Male":null,"Female":null, "Unknown/Other":null};
   
    for (var i = 0; i < data.length; i++) {
      if (data[i].athlete_sex == "M"){
        genderCount.Male += 1;
      }
      else if (data[i].athlete_sex == "W"){
        genderCount.Female += 1;
      }
      else {
        genderCount['Unknown/Other'] += 1;
      }
    };
    return genderCount
  }
  
  // Create Total Medals Pie Chart
  
  function createPie(data) {
  
    // set the dimensions and margins of the graph
    var width = 400
        height = 400
        margin = 40
  
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
  
    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#pie1")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
  
    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(["#d6af36", "#a7a7ad", "#a77044"])
  
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      
    var data_ready = pie(d3.entries(data))
    var arcGenerator = d3.arc()
      .innerRadius(50)
      .outerRadius(radius)
      .cornerRadius(9)
  
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){return(color(d.data.key))})
      .attr("stroke", "white")
      .style("stroke-width", "3px");
    
    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('text')
      .each(function(d) {
        var centroid = arcGenerator.centroid(d);
        d3.select(this)
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('dy', '0.33em')
          .text(d.data.value)
          .style("font-size", 19)
          .attr("fill", "white")
      });
    
  }
  
  // Create by Gender Pie Chart
  
  function createPie2(data) {
  
    // set the dimensions and margins of the graph
    var width = 400
        height = 400
        margin = 40
  
    var radius = Math.min(width, height) / 2 - margin
  
    // append the svg object to the div 
    var svg = d3.select("#pie2")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(["#4980C4", "#ee334e", "#fcb131"])
  
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      
    var data_ready = pie(d3.entries(data))
    var arcGenerator = d3.arc()
      .innerRadius(50)
      .outerRadius(radius)
      .cornerRadius(9)
  
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d,){return(color(d.data.key))})
      .attr("stroke", "white")
      .style("stroke-width", "3px");
    
    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('text')
      .each(function(d) {
        var centroid = arcGenerator.centroid(d);
        d3.select(this)
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('dy', '0.33em')
          .text(d.data.value)
          .style("font-size", 19)
          .attr("fill", "white")
      });
             
  }
  
  
  // Select the drop down menu
  d3.selectAll("#selCountry").on("change", optionChanged);

  // Create a function for the change event
  function optionChanged() {
    
    var dropdownMenu = d3.select("#selCountry").node();
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
    //console.log(selectedOption);
    var country1 = medalsData.filter(obj => obj.country === selectedOption);
    var data1 = sumMedals(country1);
    var data2 = sumGender(country1);
    d3.select("#pie1").html("")
    d3.select("#pie2").html("")
    return createPie(data1), createPie2(data2);
  }
  
  // INIT function for charts on load
  
  function init() {
    var idOnLoad = "Argentina";
    
    var country1 = medalsData.filter(obj => obj.country === idOnLoad);
    var data1 = sumMedals(country1);
    var data2 = sumGender(country1);
    return createPie(data1), createPie2(data2) ;
  
  
  }
  
  init();
  
});
  

