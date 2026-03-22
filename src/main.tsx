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
          colorTextSecondary: '#aaaabc',
          colorInputBackground: '#13131e',
          colorInputText: '#e0e0f0',
          colorNeutral: '#c8c8d4',
          borderRadius: '12px',
          fontSize: '15px',
        },
        elements: {
          card: {
            border: '1px solid #2a2a38',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            background: '#1a1a24',
          },
          headerTitle: { color: '#e0e0f0' },
          headerSubtitle: { color: '#aaaabc' },
          socialButtonsBlockButton: {
            border: '1px solid #2a2a38',
            background: '#13131e',
            color: '#e0e0f0',
          },
          socialButtonsBlockButtonText: { color: '#e0e0f0', fontWeight: '500' },
          dividerLine: { background: '#2a2a38' },
          dividerText: { color: '#666' },
          formFieldLabel: { color: '#aaaabc' },
          formFieldInput: {
            border: '1px solid #2a2a38',
            background: '#13131e',
            color: '#e0e0f0',
          },
          footerActionLink: { color: '#6c63ff' },
          identityPreviewText: { color: '#e0e0f0' },
          identityPreviewEditButton: { color: '#6c63ff' },
          rootBox: { fontFamily: "'Segoe UI', system-ui, sans-serif" },
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
)
