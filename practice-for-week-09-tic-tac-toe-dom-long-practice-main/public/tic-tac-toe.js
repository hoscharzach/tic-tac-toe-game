async function ticTacToe (){
    let winner = document.getElementById("winner")
    winner.hidden = true

    let count = 1
    populateBoard()

    let availTiles = new Set()

    for (let i = 0; i < 9; i ++) {
        availTiles.add(JSON.stringify(i))
    }

    function play (e) {

        if (!availTiles.has(this.dataset.num)) {
            return

        } else {
            let playX = document.createElement("img")
            this.append(playX)
            playX.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
            playX.setAttribute("id", "play")
            count++
            this.setAttribute("data-play", "x")
            availTiles.delete(this.dataset.num)
            console.log(availTiles.values)

            // choose random next tile and have cpu play on it
            const cpuAvailPlays = Array.from(availTiles)
            cpuPlay(cpuAvailPlays)
        }
        gameLogic()
        // else if (count % 2 === 0) {
        //     let playO = document.createElement("img")
        //     this.append(playO)
        //     playO.setAttribute("id", "play")
        //     playO.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
        //     count++
        //     this.setAttribute("data-play", "o")
        // }

        if (count === 10) {
            setTimeout(() => {
                window.alert("draw")
                newGame()
            }, 400)



        }
    }

    function populateBoard () {
        let gameBoard = document.getElementById("play-area")

        for (let i = 0; i < 9; i++) {

            // create new tile and append it to the board
        let tile = document.createElement("div")
        tile.setAttribute("data-num", i)
        tile.setAttribute("id", i)
        gameBoard.append(tile)
        tile.style.width = '100px'
        tile.style.height = '100px'
        // tile.innerText = `${i}`

        let color = randomColor()
        tile.style.backgroundColor = `rgb(${color}, .3)`


        tile.addEventListener("click", play)


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

function cpuPlay (arr) {


    let max = arr.length
    let index = JSON.stringify(Math.floor(Math.random() * max))
        tileNum = arr[index]

    if (availTiles.has(tileNum)) {
        let currTile = document.getElementById(`${tileNum}`)
        console.log("current Tile", currTile)

        availTiles.delete(tileNum)
        let playO = document.createElement("img")
            currTile.append(playO)
            playO.setAttribute("id", "play")
            playO.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
            count++
            currTile.setAttribute("data-play", "o")
    }

    gameLogic()
}

    const newGameButton = document.getElementById("new-game-button")

    newGameButton.addEventListener("click", newGame)

    function newGame (e) {
      let clearPlays = document.querySelectorAll("#play")
       clearPlays.forEach(el => {
           el.remove()
       })
       for (let i = 0; i < 9; i ++) {
        availTiles.add(JSON.stringify(i))
        document.getElementById(`${i}`).dataset.play = ''
    }
        winner.hidden = true
       count = 1
    }

function randomColor() {
    let colors = {r: 0, g:0, b:0}

    for (color in colors) {
        colors[color] = Math.random() * 255
    }
    return `${colors.r}, ${colors.g}, ${colors.b}`
}

}

function gameLogic () {

    let obj = {}
    for (let i = 0; i < 9; i++) {
        currTile = document.getElementById(`${i}`)
        obj[i]  = currTile.dataset.play
    }

    if (obj[0] === "x" &&
        obj[1] === "x" &&
        obj[2] === "x") {
            setTimeout(() => {
                winner.hidden = false
                winner.innerText = "Player X Wins!"
            }, 500)
            return
        }
    if (obj[0] === "x" &&
        obj[3] === "x" &&
        obj[6] === "x") {
            setTimeout(() => {
                winner.hidden = false
                winner.innerText = "Player X wins!"
            }, 500)
            return
        }
    if (obj[6] === 'x' &&
        obj[7] === 'x' &&
        obj[8] === 'x') {
            setTimeout(() => {
                winner.hidden = false
                winner.innerText = "Player X wins!"
            }, 500)
            return
        }

}
// function randomColor() {
    //     let randomNum = Math.floor(Math.random() * 3)
    //     console.log(randomNum)
    //     let colors = ["#6290C3", "#C2E7DA", "#F1FFE7"]
    //     console.log(colors[randomNum])
    //     return colors[randomNum]
    // }
    window.onload = ticTacToe
