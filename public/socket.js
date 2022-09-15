var soc = io()
var total = 0
var clics = 0
var clics_spendable = 0
soc.on("total", (tot) => {
    total = tot
    document.getElementById("total").innerText = total
})
soc.on("clic_trap", (data) => {
    clics = data.clic_nb
    document.getElementById("clics").innerText = clics
    clics_spendable = data.spendable_clic
    document.getElementById("clics_spendable").innerText = clics_spendable
    total = data.total
    document.getElementById("total").innerText = total
})
soc.on("users_online", (nb) => {
    document.getElementById("users_online").innerText = nb
})
soc.on("receive_msg", (data) => {
    var sender = data.sender
    var msg = data.msg
    document.getElementById("discuss").innerHTML += `<div class="div_msg_discuss"><span style="color:${data.color}">${sender}- ${msg}</span></div>`
})

soc.on("upgrade", (data) => {
    var name = data.name
    clics = data.clic_nb
    clics_spendable = data.spendable_clic
    document.getElementById("clics_spendable").innerText = clics_spendable
    show_clics()
    document.getElementById("clicker").innerText = "x" + data.incr
    document.getElementById(name + "_cost").innerText = data.cost
})

soc.on("newClassement", (data) => {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("p" + (i + 1) + "_name").innerText = data[i][1]
        document.getElementById("p" + (i + 1) + "_clic").innerText = data[i][0]
    }
})

soc.on("youCheat", (data) => {
    alert("Are you trying to cheat ?")
})

function send_msg() {
    var msg = document.getElementById("msg").value
    if (msg == "") return
    document.getElementById("msg").value = ""
    soc.emit("send_msg", msg)
}

function trap() {
    soc.emit("clic_trap")
}

function upgradeClick() {
    soc.emit("upgradeClick")
}

document.getElementById("html").addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        send_msg()
    } else {
        document.getElementById("msg").focus()
    }
});