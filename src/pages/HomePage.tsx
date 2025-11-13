import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { RefreshCw } from 'lucide-react';
import { useGameStore, Player } from '@/hooks/useGameStore';
import { IconX, IconO } from '@/components/game/GameIcons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// 根据玩家类型 ('X' 或 'O') 渲染对应的图标组件
const PlayerIcon = ({ player }: { player: Player | null }) => {
  if (player === 'X') return <IconX />;
  if (player === 'O') return <IconO />;
  return null;
};
// 游戏状态显示组件
const StatusDisplay = () => {
  // 从 Zustand store 中获取获胜者��当前玩家信息
  const winner = useGameStore((s) => s.winner);
  const currentPlayer = useGameStore((s) => s.currentPlayer);
  // 根据游戏状态生成不同的提示信息
  const getStatusMessage = () => {
    if (winner) {
      if (winner === 'draw') {
        return "It's a Draw!"; // 平局
      }
      return (
        // 玩家获胜
        <div className="flex items-center justify-center gap-2">
          Player <span className={cn("font-bold", winner === 'X' ? 'text-playful-blue' : 'text-playful-yellow')}>{winner}</span> Wins!
        </div>
      );
    }
    // 游戏进行中，显示当前轮到的玩家
    return (
      <div className="flex items-center justify-center gap-2">
        <span className={cn("font-bold", currentPlayer === 'X' ? 'text-playful-blue' : 'text-playful-yellow')}>{currentPlayer}'s</span> Turn
      </div>
    );
  };
  return (
    <div className="text-2xl md:text-3xl font-semibold text-foreground text-center h-10">
      {/* 使用 AnimatePresence 和 motion.div 实现状态文本切换时的淡入淡出动画 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={winner ? `winner-${winner}` : `player-${currentPlayer}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {getStatusMessage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
// 定义获胜连线的 SVG ���标
const lineCoordinates: { [key: string]: { x1: number; y1: number; x2: number; y2: number } } = {
  // Rows
  '0,1,2': { x1: 5, y1: 16.66, x2: 95, y2: 16.66 },
  '3,4,5': { x1: 5, y1: 50, x2: 95, y2: 50 },
  '6,7,8': { x1: 5, y1: 83.33, x2: 95, y2: 83.33 },
  // Columns
  '0,3,6': { x1: 16.66, y1: 5, x2: 16.66, y2: 95 },
  '1,4,7': { x1: 50, y1: 5, x2: 50, y2: 95 },
  '2,5,8': { x1: 83.33, y1: 5, x2: 83.33, y2: 95 },
  // Diagonals
  '0,4,8': { x1: 10, y1: 10, x2: 90, y2: 90 },
  '2,4,6': { x1: 90, y1: 10, x2: 10, y2: 90 },
};
// 获胜连线绘制组件
const WinningLine = ({ line }: { line: number[] }) => {
  const winner = useGameStore((s) => s.winner);
  const coords = lineCoordinates[line.join(',')];
  if (!coords || winner === 'draw') return null;
  return (
    // 使用 SVG 和 motion.line 实现���线动画
    <motion.svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <line
        {...coords}
        className={cn(
          'stroke-[8]',
          winner === 'X' ? 'stroke-playful-blue/80' : 'stroke-playful-yellow/80'
        )}
        strokeLinecap="round"
      />
    </motion.svg>
  );
};
// 游戏棋盘组件
const GameBoard = () => {
  // 从 store 中获取棋盘状态、下棋���法、获胜者和获胜连线
  const board = useGameStore((s) => s.board);
  const makeMove = useGameStore((s) => s.makeMove);
  const winner = useGameStore((s) => s.winner);
  const winningLine = useGameStore((s) => s.winningLine);
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3 md:gap-4 p-3 md:p-4 bg-secondary rounded-3xl shadow-lg">
        {board.map((cell, index) => (
          // 每个格子都是一个可点击的 motion.div
          <motion.div
            key={index}
            className="relative aspect-square bg-playful-background rounded-2xl flex items-center justify-center cursor-pointer"
            onClick={() => makeMove(index)}
            // 添加悬停和点击动画效果
            whileHover={{ scale: cell || winner ? 1 : 1.05 }}
            whileTap={{ scale: cell || winner ? 1 : 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <AnimatePresence>
              {cell && (
                <div className="absolute inset-0 p-4">
                  <PlayerIcon player={cell} />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {winningLine && <WinningLine line={winningLine} />}
      </AnimatePresence>
    </div>
  );
};
// 主页组件，整合所有游戏组件
export function HomePage() {
  const resetGame = useGameStore((s) => s.resetGame);
  const winner = useGameStore((s) => s.winner);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // ��听窗口大小变化，用于 Confetti 组件
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // 当有玩家获胜时，显示庆祝的彩带效果
  useEffect(() => {
    if (winner && winner !== 'draw') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // 5秒后���止
      return () => clearTimeout(timer);
    }
  }, [winner]);
  return (
    <div className="bg-playful-background min-h-screen text-foreground">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col items-center justify-center py-12 md:py-16">
          <main className="w-full max-w-md mx-auto flex flex-col items-center space-y-8">
            {/* 游戏标��，带有入场动画 */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-center">
                <span className="text-playful-blue">Tic</span>
                <span className="text-playful-pink">Tac</span>
                <span className="text-playful-yellow">Joy</span>
              </h1>
            </motion.div>
            {/* 游戏状态显示，带有入场动画 */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StatusDisplay />
            </motion.div>
            {/* 游戏棋盘，带有入场动画 */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GameBoard />
            </motion.div>
            {/* 重置游戏按���，带有入场动画 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                onClick={resetGame}
                size="lg"
                className="bg-playful-pink text-white hover:bg-playful-pink/90 rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Reset Game
              </Button>
            </motion.div>
          </main>
          <footer className="absolute bottom-4 text-center text-muted-foreground/80 text-sm">
            <p>Built with ❤️ at Cloudflare</p>
          </footer>
        </div>
      </div>
    </div>
  );
}