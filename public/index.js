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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("window", JSON.stringify({
        id: ev.target.id,
        x: ev.clientX,
        y: ev.clientY
    }));
}

function drop(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("window"));
    var boundingRec = document.getElementById(data.id).getBoundingClientRect()
    document.getElementById(data.id).style.left = (ev.clientX - data.x + boundingRec.left) + "px"
    document.getElementById(data.id).style.top = (ev.clientY - data.y + boundingRec.top) + "px"
}

window.addEventListener("resize", () => {
    return
})