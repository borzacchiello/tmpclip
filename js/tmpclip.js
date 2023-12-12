function handleClick() {
    const data = document.getElementById("msg_data");

    var key = CryptoJS.lib.WordArray.random(16).toString();
    var dataEnc = CryptoJS.AES.encrypt(data.value, key).toString();

    var fileStringArray = [dataEnc];
    var fileName = "clipboard.txt";
    var blobAttrs = { type: "text/plain" };
    var file = new File(fileStringArray, fileName, blobAttrs);

    var fd = new FormData();
    fd.append("file", file, file.name);

    fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: fd,
        headers: {}
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            var dataUrl = response.data["url"];
            dataUrl = dataUrl.replace(".org", ".org/dl");

            var dstUrl = window.location.origin + "/decode.html?link=" + dataUrl + "&key=" + key;
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
