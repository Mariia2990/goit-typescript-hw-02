import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'modern-normalize'
import App from './App'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root") as HTMLElement).render(
<React.StrictMode>
    <App />
<Toaster position="top-right"
        reverseOrder={false}/>
</React.StrictMode>
);
