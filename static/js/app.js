function buildMetametadata(sample) {

  // @TODO: Complete the following function that builds the metametadata panelMetametadata

  const metadataURL = "/metametadata/" + sample;
  var panelMetadata = d3.select("#sample-metametadata");
  panelMetadata.html("");

  d3.json(metadataURL).then(function (metadata) {
    console.log(metadata);
    Object.defineProperties(metadata).forEach(([key, value]) => {
      panelMetadata.append("h6").text(`${key}: ${value}`);
    });
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(metadata.WFREQ);
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample metadata for the plots

    // @TODO: Build a Bubble Chart using the sample metadata

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
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
