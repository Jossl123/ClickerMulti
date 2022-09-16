function show_clics() {
    document.getElementById("clics").innerText = clics
    document.getElementById("clics_spendable").innerText = clics_spendable
}

function tooglePanel(name) {
    if (document.getElementById(name).style.visibility != "visible") {
        document.getElementById(name).style.visibility = "visible"
    } else {
        document.getElementById(name).style.visibility = "hidden"
    }
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
//////
var element_dragged = ""
var offset_dragged = { x: 30, y: 10 }

function element_drag(ev) {
    element_dragged = ev.target.id
    drop(ev)
}

function drag_over(event) {
    event.preventDefault()
    return false
}

function element_drag_ghost(ev) {
    var boundingRec = document.getElementById(ev.target.id).getBoundingClientRect()
    offset_dragged = { x: ev.clientX - boundingRec.left, y: ev.clientY - boundingRec.top }
    ev.dataTransfer.setDragImage(document.createElement('img'), 0, 0)
}

function drop(ev) {
    var dm = document.getElementById(element_dragged)
    if (ev.clientX > 0 || ev.clientY > 0) {
        dm.style.left = ev.clientX - offset_dragged.x + 'px'
        dm.style.top = ev.clientY - offset_dragged.y + 'px'
    }
    ev.preventDefault();
    // var data = JSON.parse(ev.dataTransfer.getData("window"));
    // var boundingRec = document.getElementById(data.id).getBoundingClientRect()
    // document.getElementById(data.id).style.left = (ev.clientX - data.x + boundingRec.left) + "px"
    // document.getElementById(data.id).style.top = (ev.clientY - data.y + boundingRec.top) + "px"
}

window.addEventListener("resize", () => {
    return
})