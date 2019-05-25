function buildMetametadata(sample) {

  // @TODO: Complete the following function that builds the metametadata panelMetametadata

  var metadataURL = "/metametadata/" + sample;
  var panelMetadata = d3.select("#sample-metametadata");
  panelMetadata.html("");

  d3.json(metadataURL).then(function (data) {
    console.log(data);
    Object.defineProperties(data).forEach(([key, value]) => {
      panelMetadata.append("h6").text(`${key}: ${value}`);
    });
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(metadata.WFREQ);
};

function buildCharts(sample) {

  var chartURL = "/samples/" + sample;

  // @TODO: Use `d3.json` to fetch the sample metadata for the plots

  d3.json(chartURL).then(function (data) {
    var trace1 = {
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

    // @TODO: Build a Bubble Chart using the sample metadata

    var trace1 = [trace1];
    var layout = {
      showlegend: false,
      height: 600,
      width: 1500
    };

    Plotly.newPlot('bubble', trace1, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selmetadataset");

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
