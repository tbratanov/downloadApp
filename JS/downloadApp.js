Glue({layouts: "full"}).then(glue => {
    window.glue = glue;
     
    handleGlueReady();
}).catch(console.error)

function handleGlueReady() {
    console.log(`glue version:`,glue.version);
};

document.addEventListener('DOMContentLoaded', (event) => {
    handleDOMReady();
});

function handleDOMReady() {
    // Functions to button assignments
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", downloadFunc)
};

function showDownloadURL() {
    let downloadURL = document.getElementById("downloadURL");
    let URLInput = document.getElementById("URLInput");

    if(downloadURL.value === "URL") {
        URLInput.style.display = "block";
    } else {
        URLInput.style.display = "none";
    };
};

function getOptions() {
    
    let options;

    let silent = document.getElementById("silent").value;
    let autoOpenPath = document.getElementById("autoOpenPath").value;
    let autoOpenDownload = document.getElementById("autoOpenDownload").value;

    options = {
        silent,
        autoOpenDownload,
        autoOpenPath
    };

    return options;

};

function getURL() {

    let url;
    let urlInput = document.getElementById("downloadURL").value;
    let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique ante eget nulla fermentum, a feugiat ante ullamcorper. Fusce nec vehicula elit. Praesent ut gravida mauris. Phasellus vel est ullamcorper, fringilla nisl a, ultricies dui. Donec laoreet hendrerit tellus et dictum. Sed justo ante, elementum sed ante ac, congue porttitor lectus. Etiam accumsan, elit id porttitor viverra, massa ex ultrices erat, a luctus orci turpis sit amet nulla";

    if(urlInput === "dataURL") {
        url = "data:text/plain;base64,"+btoa(text);
    } else if(urlInput === "blob") {
        let blob = new Blob([text], {type: 'text/plain'});
        url = URL.createObjectURL(blob);
    } else if (urlInput === "URL") {
        let URLInputField = document.getElementById("URLInputField").value;
        url = URLInputField;
    };
    
    return url;

};

function downloadFunc() {

    const options = getOptions();
    const URL = getURL();

    const successMessage = document.getElementById("successMessage");

    glue.windows.my().download(URL, options)
    .then(() => {
        successMessage.style.display="block";
    })
    .catch((error) => {
        console.warn(error)
    });
};