const table = document.querySelector('.board__table');
const turnNote = document.querySelector(`.board__turn`);

const turns = ['X', 'O'];
const turnIterator = array => {
    let index = 0;

    return () => {
        const value = array[index];
        if (index < array.length - 1) {
            index++;
        } else {
            index = 0;
        }

        return value;
    };
};
const nextTurn = turnIterator(turns);
let turn = nextTurn();
turnNote.innerText = `${turn} turn`;
let win = false;

table.addEventListener('click', event => {
    if (
        event.target.classList.contains('board__cell')
        && event.target.classList.contains('cell_active')
    ) {
        event.target.innerText = turn;
        event.target.classList.remove('cell_active')
        win = checkForWinner()
        if (win) {
            document.querySelectorAll(`.board__cell`).forEach(cell => {
                cell.classList.remove('cell_active')
            })
            turnNote.innerText = `${turn} wins`;
            turnNote.classList.add('win')
        } else {
            turn = nextTurn();
            turnNote.innerText = `${turn} turn`;
        }
    }
});

function areCellsEqual(firstIndex, secondIndex, thirdIndex) {
    return (document.querySelector(`[data-cell-number="${firstIndex}"]`).innerText
        === document.querySelector(`[data-cell-number="${secondIndex}"]`).innerText)
        && (document.querySelector(`[data-cell-number="${secondIndex}"]`).innerText
        === document.querySelector(`[data-cell-number="${thirdIndex}"]`).innerText)
        && document.querySelector(`[data-cell-number="${firstIndex}"]`).innerText;
}

function checkForWinner() {
    return areCellsEqual(1, 2, 3)
        || areCellsEqual(4, 5, 6)
        || areCellsEqual(7, 8, 9)
        || areCellsEqual(1, 4, 7)
        || areCellsEqual(2, 5, 8)
        || areCellsEqual(3, 6, 9)
        || areCellsEqual(1, 5, 9)
        || areCellsEqual(3, 5, 7)
}