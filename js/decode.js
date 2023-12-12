function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

window.onload = function () {
    const out = document.getElementById("output");
    var params = getSearchParameters();

    fetch(params["link"], {
        method: "GET",
        headers: {}
    })
    .then((response) => response.json())
    .then((response) => {
        var decoded = CryptoJS.AES.decrypt(response, params["key"]);
        out.innerHTML = decoded;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
