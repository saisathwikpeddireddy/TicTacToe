import { useState, useCallback } from 'react'
import { useUser } from '@clerk/react'

const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const

type Player = 'X' | 'O'
type Board = (Player | null)[]

function checkWin(board: Board): number[] | null {
  for (const [a, b, c] of WINS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c]
    }
  }
  return null
}

export default function Game() {
  const { user } = useUser()
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [current, setCurrent] = useState<Player>('X')
  const [scores, setScores] = useState({ X: 0, O: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [winningCells, setWinningCells] = useState<number[]>([])
  const [isDraw, setIsDraw] = useState(false)

  const handleClick = useCallback((idx: number) => {
    if (gameOver || board[idx]) return

    const newBoard = [...board]
    newBoard[idx] = current
    setBoard(newBoard)

    const win = checkWin(newBoard)
    if (win) {
      setGameOver(true)
      setWinningCells(win)
      setScores(s => ({ ...s, [current]: s[current as 'X' | 'O'] + 1 }))
      return
    }

    if (newBoard.every(Boolean)) {
      setGameOver(true)
      setIsDraw(true)
      return
    }

    setCurrent(c => (c === 'X' ? 'O' : 'X'))
  }, [board, current, gameOver])

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrent('X')
    setGameOver(false)
    setWinningCells([])
    setIsDraw(false)
  }, [])

  const playerXLabel = user?.firstName ?? 'Player X'
  const statusText = gameOver
    ? isDraw
      ? "It's a draw!"
      : `${current === 'X' ? playerXLabel : 'Player O'} wins! 🎉`
    : `${current === 'X' ? playerXLabel : 'Player O'}'s turn`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 300,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#c8c8d4',
      }}>
        Tic-Tac-Toe
      </h1>

      {/* Scoreboard */}
      <div style={{ display: 'flex', gap: 40 }}>
        <ScoreCard
          label={playerXLabel}
          labelColor="#6c63ff"
          score={scores.X}
          active={!gameOver && current === 'X'}
        />
        <ScoreCard
          label="Player O"
          labelColor="#ff6584"
          score={scores.O}
          active={!gameOver && current === 'O'}
        />
      </div>

      {/* Status */}
      <div style={{
        fontSize: '0.9rem',
        letterSpacing: '0.1em',
        color: gameOver ? '#6c63ff' : '#888',
        height: 20,
        transition: 'color 0.3s',
      }}>
        {statusText}
      </div>

      {/* Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {board.map((val, idx) => {
          const isWinning = winningCells.includes(idx)
          return (
            <Cell
              key={idx}
              value={val}
              isWinning={isWinning}
              onClick={() => handleClick(idx)}
            />
          )
        })}
      </div>

      <button
        onClick={reset}
        style={{
          padding: '12px 40px',
          borderRadius: 50,
          border: '1px solid #2a2a38',
          background: 'transparent',
          color: '#888',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const btn = e.currentTarget
          btn.style.background = '#1a1a24'
          btn.style.borderColor = '#6c63ff'
          btn.style.color = '#c8c8ff'
        }}
        onMouseLeave={e => {
          const btn = e.currentTarget
          btn.style.background = 'transparent'
          btn.style.borderColor = '#2a2a38'
          btn.style.color = '#888'
        }}
      >
        New Game
      </button>
    </div>
  )
}

function ScoreCard({ label, labelColor, score, active }: {
  label: string
  labelColor: string
  score: number
  active: boolean
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: '14px 28px',
      borderRadius: 16,
      background: '#1a1a24',
      border: `1px solid ${active ? '#6c63ff' : '#2a2a38'}`,
      boxShadow: active ? '0 0 20px rgba(108,99,255,0.15)' : 'none',
      minWidth: 90,
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}>
      <span style={{
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: labelColor,
        maxWidth: 100,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <span style={{ fontSize: '2rem', fontWeight: 600, color: '#e0e0f0' }}>
        {score}
      </span>
    </div>
  )
}

function Cell({ value, isWinning, onClick }: {
  value: Player | null
  isWinning: boolean
  onClick: () => void
}) {
  const isX = value === 'X'
  const isO = value === 'O'

  return (
    <div
      onClick={onClick}
      style={{
        width: 110,
        height: 110,
        background: isWinning ? '#1e1e30' : '#1a1a24',
        border: `1px solid ${isWinning ? (isO ? '#ff6584' : '#6c63ff') : '#2a2a38'}`,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.8rem',
        fontWeight: 700,
        cursor: value ? 'default' : 'pointer',
        color: isX ? '#6c63ff' : '#ff6584',
        boxShadow: isWinning
          ? `0 0 24px ${isO ? 'rgba(255,101,132,0.25)' : 'rgba(108,99,255,0.25)'}`
          : 'none',
        transition: 'background 0.2s, border-color 0.2s, transform 0.1s',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        if (!value && !isWinning) {
          (e.currentTarget as HTMLDivElement).style.background = '#22223a'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = '#3a3a52'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)'
        }
      }}
      onMouseLeave={e => {
        if (!value && !isWinning) {
          (e.currentTarget as HTMLDivElement).style.background = '#1a1a24'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = '#2a2a38'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
        }
      }}
    >
      {value}
    </div>
  )
}
