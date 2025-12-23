// src/components/DriverWisdomModal.jsx - VERSÃO FINAL COM LARGURA CORRIGIDA E SOM
import React, { useEffect } from 'react';

function DriverWisdomModal({ isOpen, onClose, driver, language }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose, isOpen]);

    if (!isOpen || !driver) return null;

    const searchOnGoogle = async () => {
        const query = `${driver.name} ${driver.manufacturer} driver download official`;
        try {
            await window.electronAPI.openDriverSearch(query);
        } catch (error) {
            console.error('❌ Erro ao abrir busca:', error);
        }
    };

    const handleCloseWithSound = () => {
        // Tocar som de trovão
        const audio = new Audio('/assets/audios/thunder.mp3');
        audio.volume = 0.4;
        audio.play().catch(err => console.log('⚠️ Erro ao tocar áudio:', err));
        
        // Fechar modal
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-gradient-to-br from-krynnor-card via-krynnor-dark to-black border-4 border-krynnor-gold rounded-2xl shadow-2xl max-w-4xl w-full animate-modal-appear neon-gold-border overflow-hidden max-h-[90vh] overflow-y-auto">
                
                <style>
                    {`
                        @keyframes modal-appear {
                            from {
                                opacity: 0;
                                transform: scale(0.9) translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: scale(1) translateY(0);
                            }
                        }
                        .animate-modal-appear {
                            animation: modal-appear 0.3s ease-out;
                        }
                        @keyframes float-glow {
                            0%, 100% { 
                                transform: translateY(0px);
                                filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
                            }
                            50% { 
                                transform: translateY(-5px);
                                filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
                            }
                        }
                        .float-glow {
                            animation: float-glow 2s ease-in-out infinite;
                        }
                    `}
                </style>

                <div className="relative bg-gradient-to-r from-krynnor-red via-krynnor-red-light to-krynnor-red p-6 border-b-2 border-krynnor-gold">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-5xl float-glow">🔱</span>
                            <div>
                                <h2 className="text-3xl font-bold text-krynnor-gold neon-gold">
                                    {language === 'pt-BR' 
                                        ? 'Krynnor compartilha sua sabedoria' 
                                        : 'Krynnor shares his wisdom'}
                                </h2>
                                <p className="text-gray-300 text-sm">
                                    {language === 'pt-BR'
                                        ? 'O Deus dos Circuitos te orienta'
                                        : 'The God of Circuits guides you'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-3xl transition-all hover:rotate-90"
                            title={language === 'pt-BR' ? 'Fechar' : 'Close'}
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="bg-krynnor-dark border-2 border-krynnor-gold border-opacity-30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">
                                {driver.category === 'display' ? '🎮' : 
                                 driver.category === 'network' ? '🌐' : 
                                 driver.category === 'audio' ? '🔊' : '🔧'}
                            </span>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-white truncate">{driver.name}</h3>
                                <p className="text-gray-400 text-sm truncate">{driver.manufacturer}</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {language === 'pt-BR' ? 'Versão Atual' : 'Current Version'}: <span className="text-krynnor-gold font-mono">{driver.version}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-krynnor-dark rounded-lg border-l-4 border-krynnor-gold">
                            <span className="text-2xl flex-shrink-0">1️⃣</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold mb-1">
                                    {language === 'pt-BR' 
                                        ? 'Abra seu navegador web' 
                                        : 'Open your web browser'}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {language === 'pt-BR'
                                        ? 'Chrome, Edge, Firefox, ou qualquer navegador de sua preferência'
                                        : 'Chrome, Edge, Firefox, or any browser of your choice'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-krynnor-dark rounded-lg border-l-4 border-yellow-500">
                            <span className="text-2xl flex-shrink-0">2️⃣</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold mb-2">
                                    {language === 'pt-BR' 
                                        ? 'Busque no Google:' 
                                        : 'Search on Google:'}
                                </p>
                                <div className="bg-black bg-opacity-50 p-3 rounded border border-krynnor-gold border-opacity-30 overflow-x-auto">
                                    <code className="text-krynnor-gold text-sm whitespace-nowrap">
                                        "{driver.name} {driver.manufacturer} driver download official"
                                    </code>
                                </div>
                                <button
                                    onClick={searchOnGoogle}
                                    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                                >
                                    🔍 {language === 'pt-BR' ? 'Abrir Busca no Google' : 'Open Google Search'}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-krynnor-dark rounded-lg border-l-4 border-green-500">
                            <span className="text-2xl flex-shrink-0">3️⃣</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold mb-1">
                                    {language === 'pt-BR' 
                                        ? 'Visite APENAS o site oficial' 
                                        : 'Visit ONLY the official website'}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {language === 'pt-BR'
                                        ? `Procure pelo site oficial de ${driver.manufacturer} nos resultados`
                                        : `Look for ${driver.manufacturer}'s official website in the results`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-krynnor-dark rounded-lg border-l-4 border-purple-500">
                            <span className="text-2xl flex-shrink-0">4️⃣</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold mb-1">
                                    {language === 'pt-BR' 
                                        ? 'Ou use o Windows Update' 
                                        : 'Or use Windows Update'}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {language === 'pt-BR'
                                        ? 'Pressione Win + X → Gerenciador de Dispositivos → Clique com botão direito no dispositivo → Atualizar driver'
                                        : 'Press Win + X → Device Manager → Right-click on device → Update driver'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">⚠️</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-red-400 font-bold mb-1">
                                    {language === 'pt-BR' 
                                        ? 'Krynnor adverte:' 
                                        : 'Krynnor warns:'}
                                </p>
                                <p className="text-gray-300 text-sm">
                                    {language === 'pt-BR'
                                        ? 'Evite sites de terceiros para downloads de drivers! Sempre use fontes oficiais para garantir segurança e compatibilidade.'
                                        : 'Avoid third-party sites for driver downloads! Always use official sources to ensure safety and compatibility.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-krynnor-dark to-black p-6 border-t-2 border-krynnor-gold flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm italic text-center sm:text-left">
                        {language === 'pt-BR'
                            ? '"A sabedoria ilumina o caminho dos circuitos." - Saga de Krynnor'
                            : '"Wisdom illuminates the path of circuits." - Saga of Krynnor'}
                    </p>
                    <button
                        onClick={handleCloseWithSound}
                        className="px-6 py-3 bg-krynnor-gold hover:bg-yellow-500 text-black font-bold rounded-lg transition-all neon-button whitespace-nowrap"
                    >
                        <img src="/assets/menu-icons/goldenlight.png" alt="Thunder" className="w-5 h-5 inline-block" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 1))' }} /> {language === 'pt-BR' ? 'Que assim seja!' : 'So be it!'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DriverWisdomModal;