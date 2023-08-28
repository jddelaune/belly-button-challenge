// Use D3 library to read in samples.json from https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// var selectedID = ""
var BBDATA = {} // container for global variables

function storeBBData(data) {
    // stores all the global variables we will need as properties on the BBDATA object
    // build off of old getData function below
       
    // function getData(data) {
    //     // console.log(data.samples.id)
    //      function selectFunc(samples) {
    //          return samples.id == selectedID;
    //      }
     
    //      let selectedData = data.samples.filter(selectFunc);
    //      let sampleValues = selectedData[0].sample_values;
    //      let otuIDs = selectedData[0].otu_ids;
    //      let otuLabels = selectedData[0].otu_labels;
 
    //      buildBarChart(sampleValues, otuIDs, otuLabels);
         // console.log(`Sample values for ${selectedID}: ${sampleValues}`)
    //     }
}

function buildBarChart(values, labels, hovertext) { // probably we will change this to just pass in selectedID
        
    let topTenLabels = labels.slice(0,10).map(id => `OTU ${id}`).reverse();
    let topTenValues = values.slice(0,10).reverse();
    let topTenHovertext = hovertext.slice(0,10).reverse();

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

function buildDemogPane(selectedID, ethnicity, gender, age, location, bbtype, wfreq) {
    // builds the Demographics Pane... we probably don't have to pass in all those parameters individually
}

function buildBubbleChart(whateverParamsNeeded) {
    // builds the bubble chart
}

// optionChanged function does what happens when you change the number in the selection box
function optionChanged(selectedID) {
    updateDashboard(selectedID);
}

// init function should populate subject IDs and then act as if the user selected the first ID

function init(data) {
    let subjectIDs = data.names;
    let selectedID = data.names[0];
    // make the dropdown menu with subjectIDs in it
    storeBBData(data); // call this function to do all the other data setup we need
    console.log("going to updateDashboard() with selectedID as" + selectedID)
    updateDashboard(selectedID);
}

// updates the dashboard -- should happen whenever the selection in the box changes

function updateDashboard(selectedID) {
    
    // I thiiiink it makes the most sense to simply call each function here and
    // pull the properties needed for each individual function inside that function rather
    // than in a separate function or in this one.  I think.

}

d3.json(URL).then(init);
console.log("Init")
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

