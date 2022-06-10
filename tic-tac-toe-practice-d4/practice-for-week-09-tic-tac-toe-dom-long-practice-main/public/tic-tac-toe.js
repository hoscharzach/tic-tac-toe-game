async function ticTacToe () {
    populateBoard()

    let availTiles = new Set()

    for (let i = 0; i < 9; i ++) {
        availTiles.add(JSON.stringify(i))
    }

    console.log(availTiles)

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

            // call randomColor function to make pretty board
            let color = randomColor()
            tile.style.backgroundColor = `rgb(${color}, .3)`

            // add event listener to each tile that calls the play function when clicked
            tile.addEventListener("click", play)

            // add borders to make classic tic-tac-toe format
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

function play (e) {

    // if the set does not have this tiles data number, break the function
    if (!availTiles.has(this.dataset.num)) {
        return

    } else {
        // otherwise, create an img tag with the x, and append it to the tile
        let playX = document.createElement("img")
        this.append(playX)
        playX.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
        playX.setAttribute("id", "play")

        //set the data to x
        this.setAttribute("data-play", "x")

        // remove it from the available moves set
        availTiles.delete(this.dataset.num)

        // check to see if the move won, if it did break the function before cpu move
        if (gameLogic("human")) {
                alert("You won!")
                return
        }
        // if it didn't win, call the cpuPlay function with its available moves
        const cpuAvailPlays = Array.from(availTiles)
        cpuPlay(cpuAvailPlays)
    }
}

function cpuPlay (arr) {

    // get random number less than the array's length that contains possible moves
    let max = arr.length
    let index = JSON.stringify(Math.floor(Math.random() * max))
        tileNum = arr[index]

    // grab that tile, and remove it from the available moves
    let currTile = document.getElementById(`${tileNum}`)
        availTiles.delete(tileNum)

    // create the img and append it to the game tile
    let playO = document.createElement("img")
            currTile.append(playO)
            playO.setAttribute("id", "play")
            playO.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
            currTile.setAttribute("data-play", "o")

    // run game logic with "cpu" as argument to see if the move won
    if (gameLogic("cpu")) {
        window.alert("cpu has won")
        return
    }
}

const newGameButton = document.getElementById("new-game-button")
newGameButton.addEventListener("click", newGame)

const giveUpButton = document.getElementById("give-up-button")
giveUpButton.addEventListener("click", giveUp)

function giveUp () {
    alert("You lost!")
    newGame()
}

function newGame (e) {
      let clearPlays = document.querySelectorAll("#play")
       clearPlays.forEach(el => {
           el.remove()
       })

       for (let i = 0; i < 9; i ++) {
        availTiles.add(JSON.stringify(i))
        document.getElementById(`${i}`).dataset.play = ''
        }
}

function randomColor() {
    let colors = {r: 0, g:0, b:0}

    for (color in colors) {
        colors[color] = Math.random() * 255
    }
    return `${colors.r}, ${colors.g}, ${colors.b}`
}

function gameLogic (player) {

    let winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        [6, 4, 2]
    ]
    // store states of tiles as objects at indexes
    let currentGameState = {}

    // iterate through all the tiles to get game state
    for (let i = 0; i < 9; i++) {
        currTile = document.getElementById(`${i}`)
        currentGameState[i]  = currTile.dataset.play
        console.log(currentGameState)
    }
    // initialize counter to get to 3 in a row
    let rowCount = 0

    if (player === "human") {
        for (let i = 0; i < winCases.length; i++) {
            let currentWinTest = winCases[i]
            if (rowCount === 3) {
                return true
            } else {
                rowCount = 0
                for (let j = 0; j < currentWinTest.length; j++) {
                    if (currentGameState[currentWinTest[j]] === "x") {
                        rowCount++
                    }
                }
            }
        }
        return false
    }

    else if (player === "cpu") {
        for (let i = 0; i < winCases.length; i++) {
            let currentWinTest = winCases[i]
            if (rowCount === 3) {
                return true
            } else {
                rowCount = 0
                for (let j = 0; j < currentWinTest.length; j++) {
                    if (currentGameState[currentWinTest[j]] === "o") {
                        rowCount++
                    }
                }
            }
        }
        return false
    }
}

}
    window.onload = ticTacToe
