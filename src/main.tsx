import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from './components/theme-provider.tsx';
import { LoginForm } from './components/login-form.tsx';

import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./app/dashboard/home.tsx'));
const Settings = lazy(() => import('./app/dashboard/settings.tsx'));


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={
            <Suspense fallback={<div className="flex-col gap-4 w-full flex items-center justify-center">
              <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
              >
                <div
                  className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
              </div>
            </div>}>
              <Home />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
