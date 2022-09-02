var soc = io()
var total = 0
var clics = 0
soc.on("total", (tot) => {
    total = tot
    document.getElementById("total").innerText = total
})
soc.on("clic", (data) => {
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
    document.getElementById("discuss").innerHTML += `<div class="div_msg_discuss"><span><p style="color:${data.color}">${sender}</p> - ${msg}</span></div>`
})

function send_msg() {
    var msg = document.getElementById("msg").value
    document.getElementById("msg").value = ""
    soc.emit("send_msg", msg)
}

function clic() {
    soc.emit("clic", 0)
}