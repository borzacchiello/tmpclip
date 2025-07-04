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

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

window.onload = function () {
    const out = document.getElementById("output");
    var params = getSearchParameters();

    fetch("https://fars.ee/~" + params["code"], {
        method: "GET",
        headers: {},
        redirect: 'follow'
    })
        .then((response) => response.text())
        .then((response) => {
            var c    = response[0];
            response = response.substring(1);
            if (c == "e") {
                let pass = prompt("Password", "secret code...");
                response = CryptoJS.AES.decrypt(response, pass).toString(CryptoJS.enc.Utf8);
            }

            var decoded = CryptoJS.AES.decrypt(response, params["key"]);
            out.innerHTML = sanitize(decoded.toString(CryptoJS.enc.Utf8));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
