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

    fetch("https://filebin.net/" + params["code"] + "/clipboard.txt", {
        method: "GET",
        headers: {},
        redirect: 'follow'
    })
        .then((response) => response.text())
        .then((response) => {
            var decoded = CryptoJS.AES.decrypt(response, params["key"]);
            out.innerHTML = decoded.toString(CryptoJS.enc.Utf8);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
