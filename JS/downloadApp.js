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
    let silent;
    let autoOpenDownload;
    let autoOpenPath;
    const name = document.getElementById("nameInput").value;

    if(document.getElementById("silent").value === "true") {
        silent = true
    }   else if(document.getElementById("silent").value === "false") {
        silent = false
    };

    if(document.getElementById("autoOpenPath").value === "true") {
        autoOpenPath = true
    }   else if(document.getElementById("autoOpenPath").value === "false") {
        autoOpenPath = false
    };

    if(document.getElementById("autoOpenDownload").value === "true") {
        autoOpenDownload = true
    }   else if(document.getElementById("autoOpenDownload").value === "false") {
        autoOpenDownload = false
    };



    options = {
        silent: silent,
        autoOpenPath: autoOpenPath,
        autoOpenDownload: autoOpenDownload,
        name: name
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

    const type = document.getElementById("downloadType").value;

    if(type === "AGM") {
        options['url'] = URL;
        glue.agm.invoke('T42.Wnd.DownloadFile', options)
        .then(() => {
            successMessage.style.display="block";
        })
        .catch((error) => {
            console.warn(error)
        });
    } else if(type === "windowsAPI") {
        glue.windows.my().download(URL, options)
        .then(() => {
            successMessage.style.display="block";
        })
        .catch((error) => {
            console.warn(error)
        });
    };




};