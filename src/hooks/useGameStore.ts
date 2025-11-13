import { create } from 'zustand';
// 定义玩家类型，可以是 'X' 或 'O'
export type Player = 'X' | 'O';
// 定义游戏状态类型，可以是某个玩家获胜 ('X' 或 'O')、平��� ('draw') 或游戏进行中 (null)
export type GameStatus = Player | 'draw' | null;
// 定义游戏状态的完整类型接口
type GameState = {
  board: (Player | null)[]; // 棋盘状态，一个包含9个元素的数组，每个元素可以是 'X', 'O' 或 null
  currentPlayer: Player; // 当前回合的玩家
  winner: GameStatus; // 游戏获胜者或状态
  winningLine: number[] | null; // 获胜时的连线索引数组
  makeMove: (index: number) => void; // 玩家下棋的动作
  resetGame: () => void; // 重置游戏的动作
};
// 定义游戏的初始状态
const INITIAL_STATE = {
  board: Array(9).fill(null), // 初始棋盘为空
  currentPlayer: 'X' as Player, // 'X' 玩家先手
  winner: null as GameStatus, // 初始没有获胜者
  winningLine: null as number[] | null, // 初始没有获胜连线
};
// 计算获胜者的辅��函数
const calculateWinner = (board: (Player | null)[]): { winner: Player | null; line: number[] | null } => {
  // 定义所有可能的获胜连线（行、列、对角线）
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];
  // 遍历所有可能的获胜连线
  for (const line of lines) {
    const [a, b, c] = line;
    // 检查连线上的三个位置是否都由同一个玩家占��
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }; // 返回获胜的玩家和连线
    }
  }
  return { winner: null, line: null }; // 如果没有获胜者，返回 null
};
// 使用 Zustand 创建游戏状态管理 store
export const useGameStore = create<GameState>((set) => ({
  ...INITIAL_STATE, // 初始化 store 状态
  // 定义下棋的 action
  makeMove: (index: number) => {
    set((state) => {
      // 如果当前位置已有棋子，或者���戏已经结束，则为无效移动
      if (state.board[index] || state.winner) {
        return state;
      }
      // 创建一个新的棋盘数组副本以避免直接修改状态
      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer; // 在点击的位置放置当前玩家的棋子
      // 检查是否有玩家获胜
      const { winner, line } = calculateWinner(newBoard);
      if (winner) {
        // 如果有获胜者，更新状态
        return {
          ...state,
          board: newBoard,
          winner: winner,
          winningLine: line,
        };
      }
      // 检查是否为平局（所有格子都已填满）
      const isDraw = newBoard.every((cell) => cell !== null);
      if (isDraw) {
        // 如果是平局，更新状态
        return {
          ...state,
          board: newBoard,
          winner: 'draw',
        };
      }
      // 如果游戏未结束，切换到下一个玩家
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      };
    });
  },
  // 定义重置游戏的 action
  resetGame: () => {
    set(INITIAL_STATE); // 将状态重置为初始状态
  },
}));