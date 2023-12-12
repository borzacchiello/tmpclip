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
            console.log(response);
            var dstUrl = window.location.origin +
                window.location.pathname.split("/").slice(0, -1).join("/") +
                "/decode.html?code=" + bin + "&key=" + key;
            fetch("https://url.api.stdlib.com/temporary@0.3.0/create", {
                method: "POST",
                body: JSON.stringify({ "url": dstUrl, "ttl": 300 }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    var url = response["link_url"];
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
