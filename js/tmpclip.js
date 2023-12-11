function handleClick()
{
    const data = document.getElementById("msg_data");
    fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: JSON.stringify({
            userId: 1,
            title: "Fix my bugs",
            completed: false
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

window.onload = function()
{
    const btn = document.getElementById("submit_btn");
    btn.addEventListener("click", handleClick);
}
