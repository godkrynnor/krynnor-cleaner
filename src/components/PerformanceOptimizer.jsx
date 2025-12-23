// src/components/PerformanceOptimizer.jsx - ✅ COM TOGGLE SWITCH
import React, { useState, useEffect } from 'react';

function PerformanceOptimizer({ t }) {
    const [performance, setPerformance] = useState(null);
    const [startupApps, setStartupApps] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('cleaning');
    const [freedRAM, setFreedRAM] = useState(0);
    const [togglingApp, setTogglingApp] = useState(null);

    // ===== CARREGAR DADOS DE PERFORMANCE (REAL) =====
    const loadPerformance = async () => {
        try {
            const data = await window.electronAPI.getSystemInfo();
            
            const total = data.totalMemory || 0;
            const free = data.freeMemory || 0;
            const used = total - free;
            const percentage = total > 0 ? Math.round((used / total) * 100) : 0;
            const cores = data.cpuCount || 0;
            
            const perf = {
                cpu: {
                    cores: cores,
                    model: data.cpuModel || 'Unknown CPU'
                },
                ram: {
                    total: total,
                    used: used,
                    free: free,
                    percentage: percentage
                }
            };
            
            setPerformance(perf);
            
            // ============================================
            // ✅ ATUALIZAR TOOLTIP DO TRAY COM RAM
            // ============================================
            try {
                const usedGB = (used / 1024 / 1024 / 1024).toFixed(1);
                const totalGB = (total / 1024 / 1024 / 1024).toFixed(1);
                
                await window.electronAPI.updateTrayTooltip(
                    `Krynnor - RAM: ${percentage}% (${usedGB}/${totalGB} GB)`
                );
            } catch (e) {
                // Tray tooltip não disponível
            }
            
        } catch (error) {
            console.error('❌ Error loading performance:', error);
        }
    };

    // ===== CARREGAR APPS DE INICIALIZAÇÃO (REAL) =====
    const loadStartupApps = async () => {
        try {
            setLoadingApps(true);
            console.log('🔍 Buscando startup apps...');
            
            const apps = await window.electronAPI.getStartupApps();
            console.log('✅ Apps recebidos:', apps);
            
            setStartupApps(apps || []);
        } catch (error) {
            console.error('❌ Error loading startup apps:', error);
            setStartupApps([]);
        } finally {
            setLoadingApps(false);
        }
    };

    // ===== TOGGLE STARTUP APP (VERSÃO MELHORADA COM VERIFICAÇÃO) =====
    const toggleStartupApp = async (app) => {
        try {
            setTogglingApp(app.Name);
            console.log('🔄 Toggling app:', app.Name, '- Estado atual:', app.Enabled);
            
            const newEnabledState = !app.Enabled;
            console.log('🎯 Novo estado será:', newEnabledState ? 'HABILITADO' : 'DESABILITADO');
            
            const result = await window.electronAPI.toggleStartupApp(app, newEnabledState);
            console.log('📥 Resultado do toggle:', result);
            
            if (result && result.success) {
                console.log(`✅ ${app.Name} ${newEnabledState ? 'habilitado' : 'desabilitado'} com sucesso!`);
                
                setTimeout(async () => {
                    await loadStartupApps();
                    setTogglingApp(null);
                }, 1000);
                
            } else {
                const errorMsg = result?.error || 'Erro desconhecido';
                console.error('❌ Erro ao toggle:', errorMsg);
                
                if (result?.requiresAdmin) {
                    alert('⚠️ Requer privilégios de Administrador!\n\nFeche o Krynnor e execute como Administrador para modificar este aplicativo.');
                } else {
                    alert(`❌ Erro ao modificar ${app.Name}:\n\n${errorMsg}`);
                }
                setTogglingApp(null);
            }
            
        } catch (error) {
            console.error('❌ Erro exception ao toggle app:', error);
            alert('Erro ao modificar aplicativo: ' + error.message);
            setTogglingApp(null);
        }
    };

    useEffect(() => {
        loadPerformance();
        loadStartupApps();
        const interval = setInterval(loadPerformance, 3000);
        return () => clearInterval(interval);
    }, []);

    // ===== LIMPAR RAM (REAL) =====
    const cleanRAM = async () => {
        try {
            console.log('🧹 Iniciando limpeza de RAM...');
            setModalType('cleaning');
            setModalOpen(true);
            
            const ramBefore = performance?.ram?.used || 0;
            const ramBeforeGB = (ramBefore / 1024 / 1024 / 1024).toFixed(2);
            console.log('💾 RAM antes:', ramBeforeGB, 'GB');
            
            await window.electronAPI.clearRAM();
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            await loadPerformance();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const ramAfterPromise = new Promise(resolve => {
                setTimeout(async () => {
                    const newData = await window.electronAPI.getSystemInfo();
                    const totalNew = newData.totalMemory || 0;
                    const freeNew = newData.freeMemory || 0;
                    const usedNew = totalNew - freeNew;
                    resolve(usedNew);
                }, 1000);
            });
            
            const ramAfter = await ramAfterPromise;
            const ramAfterGB = (ramAfter / 1024 / 1024 / 1024).toFixed(2);
            console.log('💾 RAM depois:', ramAfterGB, 'GB');
            
            const freedBytes = Math.max(0, ramBefore - ramAfter);
            const freedMB = Math.round(freedBytes / 1024 / 1024);
            console.log('✅ Liberados:', freedMB, 'MB');
            
            setFreedRAM(freedMB);
            setModalType('complete');
            
            try {
                await window.electronAPI.showNotificationEx(
                    t?.ramFreed || 'RAM Liberada!',
                    `${freedMB} MB ${t?.freed || 'liberados'}!`,
                    'success'
                );
            } catch (e) {
                console.log('Notificação não disponível');
            }
            
        } catch (error) {
            console.error('❌ Erro ao limpar RAM:', error);
            setModalOpen(false);
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '0 GB';
        const gb = bytes / 1024 / 1024 / 1024;
        return `${gb.toFixed(2)} GB`;
    };

    return (
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }} className="p-8">
            
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
                    {t?.performanceOptimizer || 'Performance Optimizer'}
                </h1>
                <p className="text-gray-400">{t?.performanceOptimizerDescription || 'Optimize system performance and manage startup programs'}</p>
            </div>

            {/* SYSTEM CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* CPU CARD */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500/40 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-yellow-500">{t?.cpuUsage || 'CPU USAGE'}</h3>
                            <p className="text-xs text-gray-500">{performance?.cpu?.cores || 8} {t?.cores || 'cores'}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {performance?.ram?.percentage || 0}%
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{performance?.cpu?.model || 'CPU @ 2.60GHz'}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${performance?.ram?.percentage || 0}%` }}></div>
                    </div>
                </div>

                {/* RAM CARD */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/40 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-blue-500">{t?.ramUsage || 'RAM USAGE'}</h3>
                            <p className="text-xs text-gray-500">{t?.memoryUtilization || 'Memory Utilization'}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                        {performance?.ram?.percentage || 0}%
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                        {formatBytes(performance?.ram?.used || 0)} / {formatBytes(performance?.ram?.total || 0)}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${performance?.ram?.percentage || 0}%` }}></div>
                    </div>
                </div>

                {/* FREE RAM CARD */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/40 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-green-500">{t?.memoryOptimization || 'MEMORY OPTIMIZATION'}</h3>
                            <p className="text-xs text-gray-500">{t?.freeUnusedRAM || 'Free unused RAM'}</p>
                        </div>
                    </div>
                    <button
                        onClick={cleanRAM}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {t?.freeRAM || 'FREE RAM'}
                    </button>
                </div>
            </div>

            {/* STARTUP APPLICATIONS */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500/40 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-purple-500">{t?.startupApps || 'Startup Applications'}</h2>
                            <p className="text-gray-400 text-sm">
                                {startupApps.length > 0 
                                    ? `${startupApps.length} ${t?.programsFound || 'programs found'}`
                                    : t?.noProgramsFound || 'No programs found'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={loadStartupApps}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        disabled={loadingApps}
                    >
                        <svg className={`w-4 h-4 ${loadingApps ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {t?.updateInfo || 'Update Information'}
                    </button>
                </div>

                {loadingApps ? (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 mx-auto mb-4">
                            <svg className="w-full h-full animate-spin text-purple-500" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <p className="text-gray-400">{t?.loadingApps || 'Loading applications...'}</p>
                    </div>
                ) : startupApps.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-400">{t?.noProgramsFound || 'No startup programs found'}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-purple-500/30">
                                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Application</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Location</th>
                                    <th className="text-center py-3 px-4 text-gray-400 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {startupApps.map((app, index) => (
                                    <tr key={index} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-white">{app.Name}</div>
                                            {app.Command && (
                                                <div className="text-xs text-gray-500 mt-1 truncate max-w-md">
                                                    {app.Command}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-400">
                                            {app.Location || app.Method || 'Unknown'}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {/* TOGGLE SWITCH */}
                                            <button
                                                onClick={() => toggleStartupApp(app)}
                                                disabled={togglingApp === app.Name}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                                                    app.Enabled ? 'bg-green-500' : 'bg-gray-600'
                                                } ${togglingApp === app.Name ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                                        app.Enabled ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL DE LIMPEZA */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500 rounded-2xl p-8 max-w-md w-full mx-4">
                        {modalType === 'cleaning' ? (
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-6">
                                    <svg className="w-full h-full animate-spin text-green-500" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-green-500 mb-2">
                                    {t?.cleaningMemory || 'Cleaning Memory...'}
                                </h3>
                                <p className="text-gray-400">
                                    {t?.pleaseWait || 'Please wait while we optimize your RAM'}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-green-500 mb-2">
                                    {t?.optimizationComplete || 'Optimization Complete!'}
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    {t?.ramFreed || 'RAM Freed:'} <span className="text-green-500 font-bold">{freedRAM} MB</span>
                                </p>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                                >
                                    {t?.close || 'Close'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PerformanceOptimizer;