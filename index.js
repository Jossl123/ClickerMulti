var gold = 0
var totalgold = gold
var pgold = gold // pgold is the gold from the second before
var increment = 1
var ps = 0

function show_gold() {
    document.getElementById("gold").innerText = gold
}

function increment_gold(adder) {
    gold += adder
    totalgold += adder
    show_gold()
}

function clic() {
    increment_gold(increment)
}

setInterval(function() {
    ps = (totalgold - pgold)
    document.getElementById("ps").innerText = ps
    pgold = totalgold
}, 1000);