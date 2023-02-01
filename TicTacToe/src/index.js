import './css/main.css';
import TicTacToeBoard from "../js/TicTacToeBoard";

const ticTacToeBoard = new TicTacToeBoard(
    3,
    ['X', 'O'],
    '.board__table',
    '.board__turn',
);
ticTacToeBoard.init();

