// src/index.jsx - Ponto de entrada do React CORRIGIDO
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ CORRIGIDO: Case-sensitive

// Pegar o elemento com id="root" do HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar o App dentro do root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log('⚛️ React inicializado!');
console.log('🎨 Renderizando Krynnor Cleaner...');