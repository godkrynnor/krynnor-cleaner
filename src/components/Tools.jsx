// src/components/Tools.jsx - PROFISSIONAL E MODERNO
import React from 'react';

function Tools({ t }) {
    return (
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }} className="p-8">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold text-krynnor-gold mb-2 flex items-center gap-4"
                    style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}>
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t?.tools || 'Tools'}
                </h1>
                <p className="text-gray-400 text-lg">
                    {t?.toolsDescription || 'Divine utilities and sacred instruments for system mastery'}
                </p>
            </div>

            {/* GRID DE FERRAMENTAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SYSTEM INFO */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/40 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {t?.systemInformation || 'System Information'}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {t?.systemInfoDesc || 'View detailed hardware specifications and system metrics'}
                            </p>
                            <span className="text-blue-400 text-sm font-semibold">
                                {t?.available || 'Available in My Computer'} →
                            </span>
                        </div>
                    </div>
                </div>

                {/* REGISTRY CLEANER */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500/40 rounded-xl p-6 hover:border-purple-500 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                {t?.registryCleaner || 'Registry Cleaner'}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {t?.registryDesc || 'Scan and repair Windows registry for optimal performance'}
                            </p>
                            <span className="text-purple-400 text-sm font-semibold opacity-60">
                                {t?.comingSoon || 'Coming Soon'} ⚡
                            </span>
                        </div>
                    </div>
                </div>

                {/* DISK ANALYZER */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/40 rounded-xl p-6 hover:border-green-500 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                {t?.diskAnalyzer || 'Disk Space Analyzer'}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {t?.diskAnalyzerDesc || 'Visualize disk usage and find large files consuming space'}
                            </p>
                            <span className="text-green-400 text-sm font-semibold opacity-60">
                                {t?.comingSoon || 'Coming Soon'} ⚡
                            </span>
                        </div>
                    </div>
                </div>

                {/* UNINSTALLER */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-500/40 rounded-xl p-6 hover:border-orange-500 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                {t?.programUninstaller || 'Program Uninstaller'}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {t?.uninstallerDesc || 'Remove applications completely with leftover traces'}
                            </p>
                            <span className="text-orange-400 text-sm font-semibold opacity-60">
                                {t?.comingSoon || 'Coming Soon'} ⚡
                            </span>
                        </div>
                    </div>
                </div>

                {/* DUPLICATE FINDER */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-pink-500/40 rounded-xl p-6 hover:border-pink-500 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                                {t?.duplicateFinder || 'Duplicate File Finder'}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {t?.duplicateDesc || 'Find and remove duplicate files to free up space'}
                            </p>
                            <span className="text-pink-400 text-sm font-semibold opacity-60">
                                {t?.comingSoon || 'Coming Soon'} ⚡
                            </span>
                        </div>
                    </div>
                </div>

                {/* PROCESS MANAGER */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/40 rounded-xl p-6 hover:border-cyan-500 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {t?.processManager || 'Process Manager'}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {t?.processDesc || 'Monitor and manage running processes and resource usage'}
                            </p>
                            <span className="text-cyan-400 text-sm font-semibold opacity-60">
                                {t?.comingSoon || 'Coming Soon'} ⚡
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* INFO BOX */}
            <div className="mt-8 bg-gradient-to-br from-krynnor-red/10 to-krynnor-gold/10 border-2 border-krynnor-gold/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-krynnor-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-krynnor-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-krynnor-gold mb-2">
                            {t?.moreToolsComing || 'More Divine Tools Coming Soon'}
                        </h3>
                        <p className="text-gray-300">
                            {t?.toolsInfo || 'The gods of Krynnor are forging powerful new utilities. Stay tuned for registry optimization, disk analysis, and advanced system management tools.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tools;