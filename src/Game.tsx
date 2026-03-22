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
      setScores(s => ({ ...s, [current]: s[current as Player] + 1 }))
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

  const playerXLabel = user?.firstName ?? 'You'
  const statusText = gameOver
    ? isDraw
      ? "It's a draw"
      : `${current === 'X' ? playerXLabel : 'Player O'} wins`
    : `${current === 'X' ? playerXLabel : 'Player O'}'s turn`

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: 420,
      padding: '0 24px',
    }}>
      {/* Title */}
      <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        marginBottom: 48,
      }}>
        Tic-Tac-Toe
      </p>

      {/* Scoreboard */}
      <div style={{ display: 'flex', width: '100%', marginBottom: 36 }}>
        <ScoreColumn
          label={playerXLabel}
          score={scores.X}
          color="#0A84FF"
          active={!gameOver && current === 'X'}
          align="left"
        />
        <div style={{
          width: 1,
          background: 'rgba(255,255,255,0.08)',
          margin: '4px 28px',
        }} />
        <ScoreColumn
          label="Player O"
          score={scores.O}
          color="#FF9F0A"
          active={!gameOver && current === 'O'}
          align="right"
        />
      </div>

      {/* Status */}
      <p style={{
        fontSize: '0.85rem',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.35)',
        marginBottom: 28,
        height: 18,
        letterSpacing: '-0.01em',
      }}>
        {statusText}
      </p>

      {/* Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        marginBottom: 40,
      }}>
        {board.map((val, idx) => (
          <Cell
            key={idx}
            value={val}
            isWinning={winningCells.includes(idx)}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>

      <button className="btn-secondary" onClick={reset}>
        New Game
      </button>
    </div>
  )
}

function ScoreColumn({ label, score, color, active, align }: {
  label: string
  score: number
  color: string
  active: boolean
  align: 'left' | 'right'
}) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'left' ? 'flex-start' : 'flex-end',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {active && align === 'right' && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        )}
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: active ? color : 'rgba(255,255,255,0.28)',
          transition: 'color 0.3s',
          maxWidth: 130,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
        {active && align === 'left' && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        )}
      </div>
      <span style={{
        fontSize: '3.8rem',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        color: active ? '#fff' : 'rgba(255,255,255,0.2)',
        transition: 'color 0.3s',
      }}>
        {score}
      </span>
    </div>
  )
}

function XMark() {
  return (
    <svg className="mark-enter" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <line x1="13" y1="13" x2="41" y2="41" stroke="#0A84FF" strokeWidth="4.5" strokeLinecap="round"/>
      <line x1="41" y1="13" x2="13" y2="41" stroke="#0A84FF" strokeWidth="4.5" strokeLinecap="round"/>
    </svg>
  )
}

function OMark() {
  return (
    <svg className="mark-enter" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="17" stroke="#FF9F0A" strokeWidth="4.5"/>
    </svg>
  )
}

function Cell({ value, isWinning, onClick }: {
  value: Player | null
  isWinning: boolean
  onClick: () => void
}) {
  const isX = value === 'X'
  const isO = value === 'O'

  let cls = 'cell'
  if (value) cls += ' cell-taken'
  if (isWinning && isX) cls += ' cell-winning-x win-pulse'
  if (isWinning && isO) cls += ' cell-winning-o win-pulse'

  return (
    <div className={cls} onClick={onClick}>
      {isX && <XMark />}
      {isO && <OMark />}
    </div>
  )
}
