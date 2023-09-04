// Use D3 library to read in samples.json from https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function buildBarChart(selectedData) { 

    console.log("selectedData for bar chart" + selectedData);
    let sampleValues = selectedData.sample_values;
    let otuIDs = selectedData.otu_ids;
    let otuLabels = selectedData.otu_labels;    
    let topTenLabels = otuIDs.slice(0,10).map(id => `OTU ${id}`).reverse();
    let topTenValues = sampleValues.slice(0,10).reverse();
    let topTenHovertext = otuLabels.slice(0,10).reverse();

    let trace1 = {
        x: topTenValues,
        y: topTenLabels,
        type: 'bar',
        text: topTenHovertext,
        orientation: 'h'
    };

    let bardata = [trace1];
    let layout = {
        title: "Top 10 OTUs Present in Individual"
    }

    Plotly.newPlot("bar", bardata, layout);
}

function buildDemogPane(selectedMeta) { 
    let panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(selectedMeta).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
}

function buildBubbleChart(selectedData) {
    let sampleValues = selectedData.sample_values;
    let otuIDs = selectedData.otu_ids;
    let otuLabels = selectedData.otu_labels;  
 
    let trace = {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: "Earth"
        }
    };
    let chartdata = [trace];

    let layout = {
        title: "Bacteria found in Sample",
        hovermode: "closest",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
        };

    Plotly.newPlot("bubble", chartdata, layout);
}

function optionChanged(selectedID) {

    d3.json(URL).then(function(data) {
        subject_data = getData(data);
        console.log(subject_data);
        buildBarChart(subject_data.selectedData);
        buildBubbleChart(subject_data.selectedData);
        buildDemogPane(subject_data.selectedMeta);
    }); 

  
    function getData(data) {
       // make this take in the data and the ID and return metadata & sample

        console.log("getting data with selectedID as" + selectedID);
        let selectedData = data.samples.filter(sample => sample.id == selectedID)[0];
        let selectedMeta = data.metadata.filter(metadata => metadata.id == selectedID)[0];

        return {selectedData, selectedMeta};
    }

}

function init(data) {
    let subjectIDs = data.names;
    let selectedID = data.names[0];

    // make the dropdown menu with subjectIDs in it
    selector = d3.select("#selDataset");
    for (id in subjectIDs) {
        selector.append("option").attr("value", data.names[id]).text(data.names[id]);
    }

    console.log("going to optionChanged() with selectedID as" + selectedID)
    optionChanged(selectedID);
}

d3.json(URL).then(init);
console.log("Init")

d3.selectAll("#selDataset").on("change", optionChanged);

// data in json
// names == same as 'id' in metadata
// metadata -> id, ethnicity, gender, age, location, bbtype, wfreq
// samples -> id, otu_ids, sample_values, otu_labels 

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// sample_values for values, otu_ids for labels, otu_labels for hovertext
// samples -> id, otu_ids, sample_values, otu_labels 

// Create a bubble chart that displays each sample
// samples -> id, otu_ids, sample_values, otu_labels
// otu_ids for x values, sample_values for y values, sample_values for marker size, otu_ids for marker colors, otu_labels for text values

// Display the sample metadata (individual's demographic info)
// metadata -> id, ethnicity, gender, age, location, bbtype, wfreq

