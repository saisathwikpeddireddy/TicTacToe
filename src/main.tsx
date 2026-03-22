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
      proxyUrl="https://tictactoe-kohl-alpha.vercel.app/clerk-proxy"
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: '#0A84FF',
          colorBackground: '#1c1c1e',
          colorText: '#ffffff',
          colorTextSecondary: 'rgba(255,255,255,0.5)',
          colorInputBackground: '#2c2c2e',
          colorInputText: '#ffffff',
          colorNeutral: 'rgba(255,255,255,0.5)',
          borderRadius: '14px',
          fontSize: '15px',
        },
        elements: {
          card: {
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
            background: '#1c1c1e',
          },
          headerTitle: { color: '#ffffff', fontWeight: '700', letterSpacing: '-0.02em' },
          headerSubtitle: { color: 'rgba(255,255,255,0.45)' },
          socialButtonsBlockButton: {
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#2c2c2e',
            color: '#ffffff',
          },
          socialButtonsBlockButtonText: { color: '#ffffff', fontWeight: '500' },
          dividerLine: { background: 'rgba(255,255,255,0.08)' },
          dividerText: { color: 'rgba(255,255,255,0.3)' },
          formFieldLabel: { color: 'rgba(255,255,255,0.5)' },
          formFieldInput: {
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#2c2c2e',
            color: '#ffffff',
          },
          footerActionLink: { color: '#0A84FF' },
          identityPreviewText: { color: '#ffffff' },
          identityPreviewEditButton: { color: '#0A84FF' },
          userButtonPopoverCard: {
            background: '#1c1c1e',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.9)',
          },
          userButtonPopoverActionButton: {
            color: '#ffffff',
          },
          userButtonPopoverActionButtonText: {
            color: '#ffffff',
          },
          userButtonPopoverActionButtonIcon: {
            color: 'rgba(255,255,255,0.5)',
          },
          userButtonPopoverFooter: {
            display: 'none',
          },
          footer: {
            display: 'none',
          },
          userPreviewMainIdentifier: {
            color: '#ffffff',
          },
          userPreviewSecondaryIdentifier: {
            color: 'rgba(255,255,255,0.55)',
          },
          rootBox: { fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif' },
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
)
