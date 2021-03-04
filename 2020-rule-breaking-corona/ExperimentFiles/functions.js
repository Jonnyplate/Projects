/* #####################################################################
        This file contains some addidional functions used
##################################################################### */

/**
 * Checks what browser the client is using and throws an error message when
 * it's IE or Edge
 * Author: Florian Gouret
 */
console.log("Checking Browser");
window.addEventListener("load", function() {
    if (navigator.userAgent.indexOf("MSIE") != -1 ) {
        alert("Diese Version von Internet Explorer wird von diesem Experiment nicht unterstützt." +
        "Bitte updaten Sie Ihren Browser oder verwenden Sie einen anderen. <br>"+
        "This version of Internet explorer does not support this experiment. Please update it or use another browser.")
        window.location = "https://www.microsoft.com/en-us/edge";
    }
    else if (navigator.userAgent.indexOf("Edge") != -1 ) {
        alert("Diese Version von Internet Explorer wird von diesem Experiment nicht unterstützt."+
        "Bitte updaten Sie Ihren Browser oder verwenden Sie einen anderen. <br>"+
        "This version of Edge does not support this experiment. Please update it or use another browser.")
        window.location = "https://www.microsoft.com/en-us/edge";
    }
});

/**
 * Enables download of the experimental data in piloting mode
 * from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

/*
 * shuffle array: randomize order of entrys in array
 * from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

console.log("functions imported successfully.")