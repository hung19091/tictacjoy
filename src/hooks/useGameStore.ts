import { create } from 'zustand';
export type Player = 'X' | 'O';
export type GameStatus = Player | 'draw' | null;
type GameState = {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: GameStatus;
  winningLine: number[] | null;
  makeMove: (index: number) => void;
  resetGame: () => void;
};
const INITIAL_STATE = {
  board: Array(9).fill(null),
  currentPlayer: 'X' as Player,
  winner: null as GameStatus,
  winningLine: null as number[] | null,
};
const calculateWinner = (board: (Player | null)[]): { winner: Player | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
};
export const useGameStore = create<GameState>((set) => ({
  ...INITIAL_STATE,
  makeMove: (index: number) => {
    set((state) => {
      if (state.board[index] || state.winner) {
        return state; // Invalid move
      }
      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;
      const { winner, line } = calculateWinner(newBoard);
      if (winner) {
        return {
          ...state,
          board: newBoard,
          winner: winner,
          winningLine: line,
        };
      }
      const isDraw = newBoard.every((cell) => cell !== null);
      if (isDraw) {
        return {
          ...state,
          board: newBoard,
          winner: 'draw',
        };
      }
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      };
    });
  },
  resetGame: () => {
    set(INITIAL_STATE);
  },
}));