var soc = io()
var total = 0
var clics = 0
soc.on("total", (tot) => {
    total = tot
    document.getElementById("total").innerText = total
})
soc.on("clic", (data) => {
    console.log("tset")
    clics = data.clic_nb
    document.getElementById("clics").innerText = clics
    total = data.total
    document.getElementById("total").innerText = total
})
soc.on("users_online", (nb) => {
    document.getElementById("users_online").innerText = nb
})
soc.on("receive_msg", (data) => {
    var sender = data.sender
    var msg = data.msg
    document.getElementById("discuss").innerHTML += `<div class="div_msg_discuss"><spanstyle="color:${data.color}">${sender}- ${msg}</span></div>`
})

function send_msg() {
    var msg = document.getElementById("msg").value
    document.getElementById("msg").value = ""
    soc.emit("send_msg", msg)
}

function clic() {
    soc.emit("clic", 0)
}

function upgradeClick() {
    soc.emit("upgradeClick", 0)
}

document.getElementById("html").addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        send_msg()
    } else {
        document.getElementById("msg").focus()
    }
});