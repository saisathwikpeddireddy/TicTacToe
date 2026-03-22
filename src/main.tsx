import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import App from './App'
import './index.css'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: '#6c63ff',
          colorBackground: '#1a1a24',
          colorText: '#e0e0f0',
          colorTextSecondary: '#888',
          colorInputBackground: '#0f0f13',
          colorInputText: '#e0e0f0',
          colorNeutral: '#888',
          borderRadius: '12px',
        },
        elements: {
          card: { border: '1px solid #2a2a38', boxShadow: 'none' },
          rootBox: { fontFamily: "'Segoe UI', system-ui, sans-serif" },
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
)
