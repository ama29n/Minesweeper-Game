function main() { // main function

    let squares = [];
    let clickedSquares = 0;

    function createBoard() {

        let bombSquareArray = Array(20).fill("bomb", 0, 20);
        let safeSquareArray = Array(80).fill("safe", 0, 80);
        let gameArray = [...bombSquareArray, ...safeSquareArray];

        // Shuffling the Array
        gameArray.sort(() => Math.random() - 0.5);

        // creating grids with ids ranging from 0 to 99 and classes as bomb or safe
        for(let i = 0; i < 100; i++) {
            let square = document.createElement("div");
            square.classList.add(gameArray[i]);
            square.setAttribute("id", i);
            document.querySelector(".board").appendChild(square);
            squares.push(square);

            // Event listner - Decides what happens if we click onto a square
            square.addEventListener("click", () => {
                clickFn(square);
            });

            // Event Listner - Adds flag on a square
            square.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                addFlag(square);
            });
        }

    }
    createBoard();


    // Function to calculate the number of bombs around each square 
    for(let i = 0; i < squares.length; i++) {
        let count = 0;
        let onLeftEdge = (i % 10 == 0);
        let onRightEdge = (i % 10 == 10 - 1);

        if(squares[i].classList.contains("safe")) {
            if(!onLeftEdge && squares[i - 1].classList.contains("bomb")) count++;
            if(!onRightEdge && squares[i + 1].classList.contains("bomb")) count++;
            if(i > 9 && squares[i - 10].classList.contains("bomb")) count++;
            if(i < 90 && squares[i + 10].classList.contains("bomb")) count++;
            if(!onRightEdge && i > 9 && squares[i + 1 - 10].classList.contains("bomb")) count++;
            if(!onRightEdge && i < 90 && squares[i + 1 + 10].classList.contains("bomb")) count++;
            if(!onLeftEdge && i > 9 && squares[i - 1 - 10].classList.contains("bomb")) count++;
            if(!onLeftEdge && i < 90 && squares[i - 1 + 10].classList.contains("bomb")) count++;
        }
        squares[i].setAttribute("data", count);
    }



    function clickFn(square) {
        if(square.classList.contains("containsFlag"))
        return;

        if(square.classList.contains("bomb")) {
            gameOver(parseInt(square.id));
        }
        else {
            let count = square.getAttribute("data");
            if(count != '0') {
                square.innerText = count;
                clickedSquares++;
                square.classList.add("checked");
                if(count == '1') document.getElementById(`${square.id}`).style.color = "red";
                if(count == '2') document.getElementById(`${square.id}`).style.color = "blue";
                if(count == '3') document.getElementById(`${square.id}`).style.color = "green";
                if(count == '4') document.getElementById(`${square.id}`).style.color = "black";
                if(count == '5') document.getElementById(`${square.id}`).style.color = "black";

                if(clickedSquares == 80) {
                    alert("U won the GAME");
                }

            } else {
                // for spreading the safe squares
                spread(square);
            }
        }
    }


    // Function to spread the safe squares
    function spread(square) {

        if(square == undefined || square.classList.contains("checked") || square.classList.contains("bomb") || square.getAttribute("data") != '0')
        return;
        else {
            square.classList.add("checked");
            clickedSquares++;

            let i = parseInt(square.id);
            let onLeftEdge = (i % 10 == 0);
            let onRightEdge = (i % 10 == 10 - 1);

        if(onRightEdge == false) setTimeout(spread(squares[i + 1]), 100);
        if(onLeftEdge == false) setTimeout(spread(squares[i - 1]), 100);
        if(i > 9) setTimeout(spread(squares[i - 10]), 100);
        if(i < 90) setTimeout(spread(squares[i + 10]), 100);
        if(onRightEdge == false && i > 9) setTimeout(spread(squares[i + 1 - 10]), 100);
        if(onRightEdge == false && i < 90) setTimeout(spread(squares[i + 1 + 10]), 100);
        if(onLeftEdge == false && i > 9) setTimeout(spread(squares[i - 1 - 10]), 100);
        if(onLeftEdge == false && i < 90) setTimeout(spread(squares[i - 1 + 10]), 100);
        }
    }


    // Function to add and remove the flags
    function addFlag(square) {
        let num = parseInt(document.querySelector(".numOfFlags").innerText);


        if(square.classList.contains("checked"))
        return;

        else if(num == 0) {

            if(square.classList.contains("containsFlag")) {
                let div = document.getElementById(square.id);
                div.removeChild(div.firstChild);
                square.classList.remove("containsFlag");
                num++;
                document.querySelector(".numOfFlags").innerText = num;
            }
            else return;
        }

        else if(square.classList.contains("containsFlag")) {
            let div = document.getElementById(square.id);
            div.removeChild(div.firstChild);
            square.classList.remove("containsFlag");
            num++;
            document.querySelector(".numOfFlags").innerText = num;

        } else {
            let img = document.createElement("img");
            img.src = "redflag.png";
            square.appendChild(img);
            img.classList.add("flag");
            square.classList.add("containsFlag");
            num--;
            document.querySelector(".numOfFlags").innerText = num;
        }
    }


    // This function is called when we click on a Bomb!
    function gameOver(id) {
        
        for(let i = 0; i < 100; i++) {
            if(squares[i].classList.contains("bomb")) {

                if(squares[i].classList.contains("containsFlag")) {
                    let div = document.getElementById(squares[i].id);
                    div.removeChild(div.firstChild);
                }

                let img = document.createElement("img");
                img.src = "bomb.png";
                squares[i].appendChild(img);
                squares[i].classList.add("gameover");

                if(id == i) {
                    squares[i].classList.add("mainBomb");
                }
            }
        }
        setTimeout(() => {alert("GameOver");}, 500);
    }

}

main();


