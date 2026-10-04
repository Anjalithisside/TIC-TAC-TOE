let turn = 'O';
let total_turn = 0;
let winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
const board_array = new Array(9).fill("E");
const board = document.querySelector('.board');
function checkwinner(){
    for(let [idx0,idx1,idx2] of winner){
        if(board_array[idx0] != "E" && board_array[idx1] != "E" && board_array[idx2] != "E"){
            if(board_array[idx0] === board_array[idx1]  && board_array[idx1] === board_array[idx2]){
                return 1;
            }
        }
    }
    return 0;
}

const printer = (event) => {
    const element = event.target;
    if (!element.classList.contains("cell")) {
        return;
    }
    if (board_array[element.id] === "E") {
        total_turn++;
        if (turn === "O") {
            element.innerHTML = "O";
            board_array[element.id] = "O";

            if (checkwinner()) {
                document.getElementById("winning_mss").innerHTML = "Winner is O";
                board.removeEventListener("click", printer);
                return;
            }
            turn = "X";
        } else {
            element.innerHTML = "X";
            board_array[element.id] = "X";
            if (checkwinner()) {
                document.getElementById("winning_mss").innerHTML = "Winner is X";
                board.removeEventListener("click", printer);
                return;
            }
            turn = "O";
        }
        if (total_turn === 9) {
            document.getElementById("winning_mss").innerHTML = "Match is draw";
            board.removeEventListener("click", printer);
        }
    }
};
board.addEventListener('click', printer);

const restart = document.getElementById("restart");

restart.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((e) => {
        e.innerHTML = "";
    });

    turn = 'O';
    total_turn = 0;

    board_array.fill("E");

    document.getElementById('winning_mss').innerHTML = "";

    board.removeEventListener('click', printer);
    board.addEventListener('click', printer);
});