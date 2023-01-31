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
let isWin = false;

table.addEventListener('click', event => {
    if (
        event.target.classList.contains('board__cell')
        && event.target.classList.contains('cell_active')
    ) {
        event.target.innerText = turn;
        event.target.classList.remove('cell_active')
        isWin = checkForWinner()
        if (isWin) {
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
    const elements = [firstIndex, secondIndex, thirdIndex]
        .map(indexOfElement =>
            document.querySelector(`[data-cell-number="${indexOfElement}"]`)
        );
    const [firstElement, secondElement, thirdElement] = elements;
    const areEqual = !!(
        (firstElement.innerText === secondElement.innerText)
        && (secondElement.innerText === thirdElement.innerText)
        && firstElement.innerText
    );
    if (areEqual) {
        elements.forEach(element => element.classList.add('cell__winner'))
    }

    return areEqual;
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