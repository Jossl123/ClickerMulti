function show_clics() {
    document.getElementById("clics").innerText = clics
}

function tooglePanel(name) {
    if (document.getElementById(name).style.visibility != "visible") {
        document.getElementById(name).style.visibility = "visible"
    } else {
        document.getElementById(name).style.visibility = "hidden"
    }
}