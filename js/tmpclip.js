function handleClick() {
    const data = document.getElementById("msg_data");
    document.getElementById("loading").hidden = false;

    var key = CryptoJS.lib.WordArray.random(16).toString();
    var bin = CryptoJS.lib.WordArray.random(16).toString();
    var dataEnc = CryptoJS.AES.encrypt(data.value, key);

    fetch("https://filebin.net/" + bin + "/clipboard.txt", {
        method: "POST",
        body: dataEnc,
        headers: {}
    })
        .then((response) => response.json())
        .then((response) => {
            var dstUrl = window.location.origin +
                window.location.pathname.split("/").slice(0, -1).join("/") +
                "/decode.html?code=" + bin + "&key=" + key;
            fetch("https://spoo.me", {
                method: "POST",
                body: "max-clicks=1&url=" + encodeURIComponent(dstUrl),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    var url = response["short_url"];
                    document.getElementById("loading").hidden = true;
                    window.location.href = "./link.html?link=" + url;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.onload = function () {
    const btn = document.getElementById("submit_btn");
    btn.addEventListener("click", handleClick);
}
