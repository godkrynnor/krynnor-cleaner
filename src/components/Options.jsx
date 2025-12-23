// src/components/Options.jsx - ABOUT KRYNNOR COM DESCRIÇÕES DOS INSTAGRAMS
import React from 'react';

function Options({ t }) {
    const version = 'v1.0.0 (64-bit)';
    const buildDate = 'December 2025';

    const openLink = (url) => {
        if (window.electronAPI && window.electronAPI.openExternal) {
            window.electronAPI.openExternal(url);
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }} className="p-8">
            {/* HEADER */}
            <div className="mb-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-krynnor-red to-red-800 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ boxShadow: '0 0 40px rgba(220, 38, 38, 0.6)' }}>
                    <svg className="w-16 h-16 text-krynnor-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1 className="text-6xl font-bold text-krynnor-gold mb-2"
                    style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.8)' }}>
                    Krynnor Cleaner
                </h1>
                <p className="text-2xl text-gray-400 mb-4">
                    {t?.subtitle || 'Where the power of a Norse god meets innovation in technology.'}
                </p>
                <div className="inline-block bg-gradient-to-r from-krynnor-red to-red-800 px-6 py-2 rounded-full">
                    <span className="text-white font-bold">{version}</span>
                    <span className="text-gray-300 ml-2">• {buildDate}</span>
                </div>
            </div>

            {/* ABOUT SECTION */}
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* MISSION */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-krynnor-gold/40 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-krynnor-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-krynnor-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-krynnor-gold mb-3">
                                {t?.mission || 'Mission'}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {t?.missionText || 'Krynnor Cleaner harnesses the divine power of Norse mythology to bring professional-grade system optimization to your PC. Our mission is to provide users with a powerful, intuitive, and visually stunning tool that keeps their systems running at peak performance.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* FEATURES */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/40 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-blue-400 mb-4">
                                {t?.keyFeatures || 'Key Features'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-krynnor-gold text-lg">⚡</span>
                                    <div>
                                        <h3 className="text-white font-semibold">{t?.healthCheck || 'Health Check'}</h3>
                                        <p className="text-gray-400 text-sm">{t?.healthCheckDesc || 'Comprehensive system diagnostics'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-krynnor-gold text-lg">🧹</span>
                                    <div>
                                        <h3 className="text-white font-semibold">{t?.customClean || 'Custom Clean'}</h3>
                                        <p className="text-gray-400 text-sm">{t?.customCleanDesc || 'Deep system and app cache cleaning'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-krynnor-gold text-lg">🚀</span>
                                    <div>
                                        <h3 className="text-white font-semibold">{t?.performance || 'Performance Optimizer'}</h3>
                                        <p className="text-gray-400 text-sm">{t?.performanceDesc || 'RAM management and startup control'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-krynnor-gold text-lg">🔧</span>
                                    <div>
                                        <h3 className="text-white font-semibold">{t?.drivers || 'Driver Updater'}</h3>
                                        <p className="text-gray-400 text-sm">{t?.driversDesc || 'Keep your drivers up to date'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TECHNOLOGY */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500/40 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-purple-400 mb-4">
                                {t?.builtWith || 'Built With'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">⚛️</div>
                                    <div className="text-white font-semibold">React</div>
                                    <div className="text-gray-400 text-xs">UI Framework</div>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">⚡</div>
                                    <div className="text-white font-semibold">Electron</div>
                                    <div className="text-gray-400 text-xs">Desktop App</div>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">🎨</div>
                                    <div className="text-white font-semibold">Tailwind</div>
                                    <div className="text-gray-400 text-xs">CSS Framework</div>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">💻</div>
                                    <div className="text-white font-semibold">Node.js</div>
                                    <div className="text-gray-400 text-xs">Backend</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DEVELOPER - KRYNNOR COM 3 REDES SOCIAIS E DESCRIÇÕES */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/40 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-green-400 mb-3">
                                {t?.developer || 'Developer'}
                            </h2>
                            <p className="text-gray-300 text-lg mb-4">
                                {t?.developedBy || 'Forged in the fires of innovation by'} <span className="text-krynnor-gold font-bold">Krynnor</span>
                            </p>
                            <p className="text-gray-400 mb-6">
                                {t?.developerDesc || 'Born from Brazilian ingenuity and Norse mythology, Krynnor creates powerful tools that blend ancient wisdom with modern technology.'}
                            </p>

                            {/* REDES SOCIAIS - 3 CANAIS COM DESCRIÇÕES */}
                            <div>
                                <p className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-krynnor-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                    </svg>
                                    {t?.connectWithKrynnor || 'Connect with Krynnor'}
                                </p>
                                
                                <div className="space-y-4">
                                    
                                    {/* INSTAGRAM GLOBAL */}
                                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-lg p-4">
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => openLink('https://www.instagram.com/krynnor')}
                                                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                            </button>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-white font-bold">@krynnor</h3>
                                                    <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 font-semibold">
                                                        {t?.global || 'Global'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    {t?.krynnorGlobalDesc || 'Global channel for English-speaking users. Programming services, technical support, and divine system optimization worldwide.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* INSTAGRAM BRASIL */}
                                    <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border-2 border-green-500/30 rounded-lg p-4">
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => openLink('https://www.instagram.com/krynnor.brasil')}
                                                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                            </button>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-white font-bold">@krynnor.brasil</h3>
                                                    <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300 font-semibold">
                                                        🇧🇷 Brasil
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    {t?.krynnorBrasilDesc || 'Brazilian headquarters. Support in Portuguese, local community, and the homeland where Krynnor\'s divine power was forged.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AGENCY */}
                                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-lg p-4">
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => openLink('https://www.instagram.com/krynnor.agency')}
                                                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                            </button>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-white font-bold">@krynnor.agency</h3>
                                                    <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded text-xs text-orange-300 font-semibold">
                                                        {t?.enterprise || 'Enterprise'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    {t?.krynnorAgencyDesc || 'Professional software development for all nations. Custom solutions, enterprise systems, and divine-powered applications for businesses worldwide.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LEGAL */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6">
                    <div className="text-center text-gray-400 text-sm">
                        <p className="mb-2">
                            © 2025 Krynnor Cleaner. {t?.allRightsReserved || 'All rights reserved.'}
                        </p>
                        <p className="text-xs">
                            {t?.legalNotice || 'This software is provided "as is" without warranty. Always backup important data before system cleaning.'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Options;