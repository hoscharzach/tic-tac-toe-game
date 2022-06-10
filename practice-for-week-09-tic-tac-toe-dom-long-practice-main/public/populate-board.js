function populateBoard () {
    let gameBoard = document.getElementById("play-area")

    for (let i = 0; i < 9; i++) {

        // create new tile and append it to the board
        let tile = document.createElement("div")
        tile.setAttribute("data-num", i)
        gameBoard.append(tile)
        tile.style.width = '50px'
        tile.style.height = '50px'

        // random colors
        // let color = randomColor()
        // tile.style.backgroundColor = `rgb${color}`

        tile.innerText = i
        if (tile.dataset.num === "0" ||
            tile.dataset.num === "1" ||
            tile.dataset.num === "2") {
            tile.style.borderBottom = '2px solid black'
        }

        if (tile.dataset.num === "0" ||
            tile.dataset.num === "3" ||
            tile.dataset.num === "6") {
                tile.style.borderRight = '2px solid black'
            }

        if (tile.dataset.num === "6" ||
            tile.dataset.num === "7" ||
            tile.dataset.num === "8") {
                tile.style.borderTop = '2px solid black'
        }

        if (tile.dataset.num === "2" ||
            tile.dataset.num === "5" ||
            tile.dataset.num === "8") {
                tile.style.borderLeft = '2px solid black'
            }
    }


}

module.exports = populateBoard
