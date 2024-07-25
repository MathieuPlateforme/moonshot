import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthProvider from './providers/AuthProvider';
import QueryProvider from './providers/QueryProvider';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);