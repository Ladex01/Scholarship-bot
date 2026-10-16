import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker for offline resilience on iPhone
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('DiplomatAI PWA ServiceWorker registered with scope:', registration.scope);
      },
      (err) => {
        console.log('DiplomatAI ServiceWorker registration failed:', err);
      }
    );
  });
} else if ('serviceWorker' in navigator) {
  // Also register in dev mode if supported for local testing
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

createRoot(document.getElementById('root')!).render(<App />);
