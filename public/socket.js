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

function clic() {
    soc.emit("clic", 0)
}