import { Show, UserButton, useClerk, AuthenticateWithRedirectCallback } from '@clerk/react'
import Game from './Game'

export default function App() {
  // Handle OAuth redirect callback (e.g. after Google sign-in on Vercel)
  if (window.location.search.includes('__clerk_status') || window.location.hash.includes('__clerk')) {
    return <AuthenticateWithRedirectCallback />
  }

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
  const { openSignIn } = useClerk()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '40px 24px',
      gap: 0,
    }}>
      <h1 style={{
        fontSize: 'clamp(2.8rem, 8vw, 5rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
        textAlign: 'center',
        marginBottom: 14,
      }}>
        Tic-Tac-Toe.
      </h1>

      <p style={{
        fontSize: '1.15rem',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.42)',
        textAlign: 'center',
        letterSpacing: '-0.01em',
        marginBottom: 52,
      }}>
        Sign in to track your wins.
      </p>

      {/* Ghost preview board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 9,
        opacity: 0.38,
        pointerEvents: 'none',
        marginBottom: 52,
      }}>
        {['X', '', 'O', '', 'X', '', 'O', '', 'X'].map((val, i) => (
          <div key={i} style={{
            width: 80,
            height: 80,
            background: '#3a3a3c',
            borderRadius: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {val === 'X' && (
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <line x1="9" y1="9" x2="29" y2="29" stroke="#0A84FF" strokeWidth="4" strokeLinecap="round"/>
                <line x1="29" y1="9" x2="9" y2="29" stroke="#0A84FF" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            )}
            {val === 'O' && (
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="12" stroke="#FF9F0A" strokeWidth="4"/>
              </svg>
            )}
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={() => openSignIn()}>
        <GoogleIcon />
        Continue with Google
      </button>
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
