// src/components/LanguageSelector.jsx - Corrigido
import React, { useState } from 'react';

function LanguageSelector({ currentLanguage, onLanguageChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en-US', name: 'English', flag: '/assets/flags/en-US.png' },
        { code: 'pt-BR', name: 'Português', flag: '/assets/flags/pt-BR.png' }
    ];

    const currentLang = languages.find(lang => lang.code === currentLanguage);

    return (
        <div className="relative">
            {/* Botão atual */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-krynnor-card hover:bg-krynnor-red rounded-lg transition-all border border-krynnor-gold border-opacity-30 min-w-[120px]"
            >
                <img 
                    src={currentLang.flag} 
                    alt={currentLang.name}
                    className="w-5 h-5 object-cover rounded flex-shrink-0"
                    onError={(e) => e.target.style.display = 'none'}
                />
                <span className="text-sm font-medium text-white flex-1 text-left">
                    {currentLang.name}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">▼</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Overlay para fechar ao clicar fora */}
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="absolute top-full right-0 mt-2 bg-krynnor-card border-2 border-krynnor-gold rounded-lg shadow-lg overflow-hidden z-50 neon-gold-border min-w-[180px]">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    onLanguageChange(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 text-left
                                    hover:bg-krynnor-red transition-all
                                    ${currentLanguage === lang.code ? 'bg-krynnor-red' : ''}
                                `}
                            >
                                <img 
                                    src={lang.flag} 
                                    alt={lang.name}
                                    className="w-6 h-6 object-cover rounded flex-shrink-0"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                        {lang.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {lang.code}
                                    </div>
                                </div>
                                {currentLanguage === lang.code && (
                                    <span className="ml-2 text-krynnor-gold flex-shrink-0">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default LanguageSelector;