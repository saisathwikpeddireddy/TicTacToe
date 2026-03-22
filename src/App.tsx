import { Show, SignInButton, UserButton } from '@clerk/react'
import Game from './Game'

export default function App() {
  return (
    <>
      <Show when="signed-in">
        <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 10 }}>
          <UserButton />
        </div>
        <Game />
      </Show>
      <Show when="signed-out">
        <Landing />
      </Show>
    </>
  )
}

function Landing() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
      padding: 40,
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.4rem',
          fontWeight: 300,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#c8c8d4',
          marginBottom: 12,
        }}>
          Tic-Tac-Toe
        </h1>
        <p style={{ color: '#555', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          Sign in to track your wins
        </p>
      </div>

      {/* Preview board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        opacity: 0.35,
        pointerEvents: 'none',
      }}>
        {['X','','O','','X','','O','','X'].map((val, i) => (
          <div key={i} style={{
            width: 80,
            height: 80,
            background: '#1a1a24',
            border: '1px solid #2a2a38',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            color: val === 'X' ? '#6c63ff' : '#ff6584',
          }}>
            {val}
          </div>
        ))}
      </div>

      <SignInButton mode="modal">
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 32px',
          borderRadius: 50,
          border: '1px solid #2a2a38',
          background: '#1a1a24',
          color: '#e0e0f0',
          fontSize: '0.95rem',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#6c63ff'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(108,99,255,0.15)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a38'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
        }}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </SignInButton>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}
