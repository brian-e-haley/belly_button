// Builds the panel by querying /metadata/<sample>
function buildMetametadata(sample) {

  // Create api url
  var metadataURL = "/metadata/" + sample;

  // select the panel
  var panelMetadata = d3.select("#sample-metadata");

  // Clear the panel
  panelMetadata.html("");

  // Query api
  d3.json(metadataURL).then(function (data) {

    Object.entries(data).forEach(([key, value]) => {

      // Construct panel from the data passed
      panelMetadata.append("h6").text(`${key}: ${value}`);
    });
  });
};

// Builds the chart by querying /samples/<sample>
function buildCharts(sample) {

  // Construct api url
  var chartURL = "/samples/" + sample;

  // Query api
  d3.json(chartURL).then(function (data) {

    // Generate bubble chart
    var trace = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }
    };

    var traceBubble = [trace];
    var layoutBubble = {
      showlegend: false,
      height: 600,
      width: 1500
    };
    
    Plotly.newPlot('bubble', traceBubble, layoutBubble);

    // Generate pie chart
    var dataPie = [{
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      hovertext: data.otu_labels.slice(0 ,10),
      type: 'pie'
    }];

    var layoutPie = {
      showlegend: true
    };

    Plotly.newPlot('pie', dataPie, layoutPie)
  });
};

function init() {
  // Select the chosen data
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetametadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new metadata each time a new sample is selected
  buildCharts(newSample);
  buildMetametadata(newSample);
}

// Initialize the dashboard
init();