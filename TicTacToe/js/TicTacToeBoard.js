import turnIterator from "./helpers/turnIterator";

export default class TicTacToeBoard {
    constructor(size, turns, tableSelector, turnSelector) {
        this.table = document.querySelector(tableSelector);
        this.turnNote = document.querySelector(turnSelector);
        this.isWin = false;
        this.turns = turns;
        this.size = size;
    }

    init() {
        const nextTurn = turnIterator(this.turns);
        let turn = nextTurn();
        this.turnNote.innerText = `${turn} turn`;
        this.table.addEventListener('click', event => {
            if (
                event.target.classList.contains('board__cell')
                && event.target.classList.contains('cell_active')
            ) {
                event.target.innerText = turn;
                event.target.classList.remove('cell_active')
                this.isWin = this.checkForWinner()
                if (this.isWin) {
                    document.querySelectorAll(`.board__cell`).forEach(cell => {
                        cell.classList.remove('cell_active')
                    })
                    this.turnNote.innerText = `${turn} wins`;
                    this.turnNote.classList.add('win')
                } else {
                    turn = nextTurn();
                    this.turnNote.innerText = `${turn} turn`;
                }
            }
        });
    }

    areCellsEqual(...indexes) {
        const elements = indexes
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

    checkForWinner() {
        return [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
            .some(positions => this.areCellsEqual(...positions));
    }
}