import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { RefreshCw } from 'lucide-react';
import { useGameStore, Player } from '@/hooks/useGameStore';
import { IconX, IconO } from '@/components/game/GameIcons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const PlayerIcon = ({ player }: { player: Player | null }) => {
  if (player === 'X') return <IconX />;
  if (player === 'O') return <IconO />;
  return null;
};
const StatusDisplay = () => {
  const winner = useGameStore((s) => s.winner);
  const currentPlayer = useGameStore((s) => s.currentPlayer);
  const getStatusMessage = () => {
    if (winner) {
      if (winner === 'draw') {
        return "It's a Draw!";
      }
      return (
        <div className="flex items-center justify-center gap-2">
          Player <span className={cn("font-bold", winner === 'X' ? 'text-playful-blue' : 'text-playful-yellow')}>{winner}</span> Wins!
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center gap-2">
        <span className={cn("font-bold", currentPlayer === 'X' ? 'text-playful-blue' : 'text-playful-yellow')}>{currentPlayer}'s</span> Turn
      </div>
    );
  };
  return (
    <div className="text-2xl md:text-3xl font-semibold text-foreground text-center h-10">
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
const WinningLine = ({ line }: { line: number[] }) => {
  const winner = useGameStore((s) => s.winner);
  const coords = lineCoordinates[line.join(',')];
  if (!coords || winner === 'draw') return null;
  return (
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
const GameBoard = () => {
  const board = useGameStore((s) => s.board);
  const makeMove = useGameStore((s) => s.makeMove);
  const winner = useGameStore((s) => s.winner);
  const winningLine = useGameStore((s) => s.winningLine);
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3 md:gap-4 p-3 md:p-4 bg-secondary rounded-3xl shadow-lg">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            className="relative aspect-square bg-playful-background rounded-2xl flex items-center justify-center cursor-pointer"
            onClick={() => makeMove(index)}
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
export function HomePage() {
  const resetGame = useGameStore((s) => s.resetGame);
  const winner = useGameStore((s) => s.winner);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (winner && winner !== 'draw') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [winner]);
  return (
    <div className="bg-playful-background min-h-screen text-foreground">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col items-center justify-center py-12 md:py-16">
          <main className="w-full max-w-md mx-auto flex flex-col items-center space-y-8">
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
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StatusDisplay />
            </motion.div>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GameBoard />
            </motion.div>
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
            <p>Built with ❤��� at Cloudflare</p>
          </footer>
        </div>
      </div>
    </div>
  );
}