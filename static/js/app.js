// Use D3 library to read data
// Establish URL variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Create function to display sample metadata for individual demographic information
function createMetadata (sample) {
    d3.json(url).then((data) => {

        // Filter the data for the object wtihin the desired sample number
        let metadata = data.metadata;
        let filteredMetadata = metadata.filter(newname =>newname.id == sample);
        let filteredSample = filteredMetadata[0]

        // Use d3 to select the panel with the id of `#sample-metadata`
        let sampleMetadata = d3.select(`#sample-metadata`);

        // Use `.html`("") to clear any existing metadata
        sampleMetadata.html("");

        // Use d3 to append new tags for each key-value in the metadata.
        for (x in y) {
            sampleMetadata.append("h6").text(`${x.toUpperCase()}: ${y[x]}`);
        };
    });
};

// Establish function to create visualizations
function createCharts(sample) {

// Fetch the JSON data and console log it
    d3.json(url).then(function(data) {

    // check if initial data set works for visualizations
    let chartVar = data.samples
    let chartVar2 = chartVar.filter(newname => newname.id == sample)
    let initialData = chartVar2[0]

    // Establish variables
    let ids = initialData.otu_ids;
    let values = initialData.sample_values;
    let labels = initialData.otu_labels;

    // Create trace for horizontal bar graph
    let bar = [
        {
            x: values.slice(0,10).reverse(),
            y: ids.slice(0,10).map(object => `OTU ${object}`).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ];
    // Apply a title to the layout
    let barLayout = {
        title: "Bar Graph of Belly Button Data"
    };

    // Render the plot to the div tag with id "bar"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("bar", bar, barLayout);
    
    // Create bubble chart
    // Create trace2 for bubble chart
    let bubble = [
        {
        x: initialData.otu_ids,
        y: initialData.sample_values,
        text: initialData.otu_labels,
        mode: "markers",
        marker: {
            color: ids,
            colorscale: 'Earth',
            size: values
        }
    }];

    // Apply formatting to layout
    let bubbleLayout = {
        title: 'Bubble Chart of Belly Button Data',
        showlegend: false,
        height: 600,
        width: 1500
    };

    // Render the plot to the div tag with id "bubble"
    // Note that we use `traceData2` not `traceData`
    Plotly.newPlot("bubble", bubble, bubbleLayout);
    })
};

// Create function to initialize dashboard
function init() {
    // Grab a reference to the dropdown select element
    // Establish drop down menu (ref 3.9) only with the ID numbers from the (filter)
        let sample = d3.select("#selDataset");
    
        // Use the list of sample 'names' to populate the select options
        d3.json(url).then((data) => {
            let sampleArray = data.names;
            for (let i = 0; i < sampleArray.length; i++) {
                selector
                .append("option")
                .text(sampleArray[i])
                .property("value", sampleArray[i]);
            };
    
        // Use the first sample from the list to build the initial plots
        let firstSample = sampleArray[0];
        createCharts(firstSample);
        createMetadata(firstSample);
    });
};

// Create function if the option is changed
function optionChanged(newSample){
    // Update all the plots when a new sample is selected
    createCharts(newSample);
    createMetadata(newSample)
}

// Initialize the dashboard
init();