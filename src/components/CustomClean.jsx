// src/components/CustomClean.jsx - ✅ 100% TRADUZIDO + NOTIFICAÇÕES CORRETAS
import React, { useState } from 'react';

function CustomClean({ t }) {
    const [activeTab, setActiveTab] = useState('windows');
    const [scanning, setScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStage, setScanStage] = useState('');
    const [scanned, setScanned] = useState(false);
    const [cleaning, setCleaning] = useState(false);
    const [cleanProgress, setCleanProgress] = useState(0);
    const [cleanedData, setCleanedData] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    
    const [windowsData, setWindowsData] = useState({ totalSize: 0, categories: [] });
    const [appsData, setAppsData] = useState([]);

    const playThunderSound = () => {
        try {
            const audio = new Audio('/assets/audios/thunderclick.mp3');
            audio.volume = 0.5;
            audio.play().catch(err => console.log('🔇 Som não disponível'));
        } catch (error) {
            console.log('🔇 Som não disponível');
        }
    };

    const simulateProgress = (start, end, delay) => {
        return new Promise(resolve => {
            let current = start;
            const interval = setInterval(() => {
                current += 1;
                setScanProgress(current);
                if (current >= end) {
                    clearInterval(interval);
                    resolve();
                }
            }, delay);
        });
    };

    const handleScan = async () => {
        playThunderSound();
        setScanning(true);
        setScanProgress(0);
        setScanned(false);
        setSelectedItems({});
        setCleanedData(null);

        try {
            setScanStage(t?.startingAnalysis || 'Iniciando análise...');
            await simulateProgress(0, 20, 50);

            setScanStage(t?.readingRegistry || 'Lendo registro do Windows...');
            await simulateProgress(20, 40, 80);
            
            const windowsScanResult = await window.electronAPI.scanWindowsFiles();
            setWindowsData(windowsScanResult);

            setScanStage(t?.scanningApps || 'Escaneando aplicações...');
            await simulateProgress(40, 70, 100);
            
            const appsScanResult = await window.electronAPI.scanAppCaches();
            setAppsData(appsScanResult);

            setScanStage(t?.calculatingSize || 'Calculando tamanho...');
            await simulateProgress(70, 100, 80);

            setScanStage(t?.analysisComplete || 'Análise completa!');
            setScanned(true);
            
            try {
                const totalSizeBytes = 
                    (windowsScanResult?.items || []).reduce((sum, item) => sum + item.size, 0) +
                    (appsScanResult?.items || []).reduce((sum, item) => sum + item.size, 0);
                
                const totalMB = Math.round(totalSizeBytes / 1024 / 1024);
                const totalItems = 
                    (windowsScanResult?.items || []).length + 
                    (appsScanResult?.items || []).length;
                
                await window.electronAPI.showNotificationEx(
                    t?.analysisComplete || 'Análise Completa!',
                    `${totalMB} MB ${t?.unnecessaryFilesFound || 'de arquivos desnecessários encontrados'} ${t?.in || 'em'} ${totalItems} ${t?.categories || 'categorias'}.`,
                    'info'
                );
            } catch (e) {
                console.log('Notificação não disponível');
            }

        } catch (error) {
            console.error('❌ Erro no scan:', error);
            
            try {
                await window.electronAPI.showNotificationEx(
                    t?.scanError || 'Erro no Scan',
                    t?.scanErrorMsg || 'Não foi possível completar o scan.',
                    'error'
                );
            } catch (e) {
                console.log('Notificação não disponível');
            }
            
            alert(t?.scanErrorAlert || 'Erro ao escanear sistema. Verifique o console.');
        } finally {
            setScanning(false);
        }
    };

    const handleClean = async () => {
        playThunderSound();
        setCleaning(true);
        setCleanProgress(0);

        const selected = Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([id, _]) => id);

        if (selected.length === 0) {
            alert(t?.selectItemsToClean || 'Selecione pelo menos um item para limpar!');
            setCleaning(false);
            return;
        }

        try {
            const progressInterval = setInterval(() => {
                setCleanProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 5;
                });
            }, 200);

            const result = await window.electronAPI.cleanSelectedItems(selectedItems);
            
            clearInterval(progressInterval);
            setCleanProgress(100);

            if (result.success) {
                setCleanedData({
                    size: result.totalCleaned,
                    files: result.totalFiles
                });
                
                try {
                    const freedGB = (result.totalCleaned / 1024 / 1024 / 1024).toFixed(2);
                    await window.electronAPI.showNotificationEx(
                        t?.divPurificationComplete || 'Purificação Divina Completa!',
                        `${freedGB} GB ${t?.freed || 'liberados'}! ${result.totalFiles} ${t?.filesBanished || 'arquivos banidos das trevas'}.`,
                        'success'
                    );
                } catch (e) {
                    console.log('Notificação não disponível');
                }
                
                setTimeout(() => {
                    setScanned(false);
                    setSelectedItems({});
                    setCleanedData(null);
                    setCleaning(false);
                    setWindowsData({ totalSize: 0, categories: [] });
                    setAppsData([]);
                }, 3000);
            } else {
                try {
                    await window.electronAPI.showNotificationEx(
                        t?.purificationError || 'Erro na Purificação',
                        t?.purificationErrorMsg || 'Não foi possível completar a limpeza profunda.',
                        'error'
                    );
                } catch (e) {
                    console.log('Notificação não disponível');
                }
                
                alert(t?.cleanErrorAlert || 'Erro durante a limpeza. Verifique o console.');
                setCleaning(false);
            }

        } catch (error) {
            console.error('❌ Erro na limpeza:', error);
            
            try {
                await window.electronAPI.showNotificationEx(
                    t?.criticalError || 'Erro Crítico',
                    t?.criticalErrorMsg || 'Erro ao limpar arquivos. Verifique as permissões.',
                    'error'
                );
            } catch (e) {
                console.log('Notificação não disponível');
            }
            
            alert(t?.cleanErrorAlert || 'Erro ao limpar arquivos. Verifique o console.');
            setCleaning(false);
        }
    };

    const handleSelectAll = () => {
        const newSelected = {};
        const currentData = activeTab === 'windows' ? windowsData.categories : appsData;
        
        currentData.forEach(item => {
            newSelected[item.id] = true;
        });
        
        setSelectedItems(newSelected);
    };

    const handleDeselectAll = () => {
        setSelectedItems({});
    };

    const toggleItemSelection = (id) => {
        setSelectedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getTotalSelected = () => {
        const currentData = activeTab === 'windows' ? windowsData.categories : appsData;
        return currentData.filter(item => selectedItems[item.id]).length;
    };

    const getTotalSize = () => {
        if (activeTab === 'windows') {
            return windowsData.categories
                .filter(item => selectedItems[item.id])
                .reduce((sum, item) => sum + item.size, 0);
        } else {
            return appsData
                .filter(item => selectedItems[item.id])
                .reduce((sum, item) => sum + item.size, 0);
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const gb = bytes / 1024 / 1024 / 1024;
        if (gb >= 1) return `${gb.toFixed(2)} GB`;
        const mb = bytes / 1024 / 1024;
        if (mb >= 1) return `${mb.toFixed(2)} MB`;
        const kb = bytes / 1024;
        return `${kb.toFixed(2)} KB`;
    };

    const getCategoryIcon = (id) => {
        const icons = {
            'temp-files': '🗑️',
            'prefetch': '⚡',
            'windows-logs': '📄',
            'recycle-bin': '♻️',
            'chrome': '🌐',
            'discord': '💬',
            'spotify': '🎵',
            'vs-code': '💻',
            'firefox': '🦊',
            'microsoft-edge': '🌊'
        };
        return icons[id] || '📦';
    };

    const getCategoryName = (id) => {
        const names = {
            'temp-files': t?.tempFiles || 'Arquivos Temporários',
            'prefetch': t?.prefetch || 'Dados Prefetch',
            'windows-logs': t?.windowsLogs || 'Logs do Windows',
            'recycle-bin': t?.recycleBin || 'Lixeira',
            'chrome': t?.chromeCache || 'Google Chrome',
            'discord': t?.discordCache || 'Discord',
            'spotify': t?.spotifyCache || 'Spotify',
            'vs-code': t?.vscodeCache || 'Visual Studio Code',
            'firefox': t?.firefoxCache || 'Mozilla Firefox',
            'microsoft-edge': t?.edgeCache || 'Microsoft Edge'
        };
        return names[id] || id;
    };

    return (
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }} className="p-8">
            
            {/* HEADER - TÍTULO NO TOPO */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold text-red-500 mb-2 flex items-center gap-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t?.customClean || 'Custom Clean'}
                </h1>
                <p className="text-gray-400 text-lg">
                    {t?.customCleanDescription || 'Análise profunda e limpeza seletiva do seu sistema'}
                </p>
            </div>

            {/* BOTÃO PRINCIPAL - 120px ABAIXO */}
            {!scanned && !scanning && (
                <div className="flex justify-center" style={{ marginTop: '120px', marginBottom: '120px' }}>
                    <button
                        onClick={handleScan}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 px-16 rounded-2xl text-2xl transition-all duration-200 transform hover:scale-105 uppercase"
                        style={{ minWidth: '400px' }}
                    >
                        <span className="flex items-center gap-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {t?.startDeepScan || 'INICIAR ANÁLISE PROFUNDA'}
                        </span>
                    </button>
                </div>
            )}

            {/* SCANNING PROGRESS */}
            {scanning && (
                <div className="mb-8 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500 rounded-xl p-8">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4">
                            <svg className="w-full h-full animate-spin text-red-500" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-red-500 mb-2">{scanStage}</h3>
                        <p className="text-gray-400">{scanProgress}%</p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                        <div
                            className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${scanProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* RESULTS */}
            {scanned && !cleaning && !cleanedData && (
                <div className="space-y-6">
                    {/* TABS */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('windows')}
                            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-200 uppercase ${
                                activeTab === 'windows'
                                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            🪟 {t?.windowsFiles || 'ARQUIVOS DO WINDOWS'}
                        </button>
                        <button
                            onClick={() => setActiveTab('apps')}
                            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-200 uppercase ${
                                activeTab === 'apps'
                                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            📦 {t?.applicationCaches || 'CACHES DE APLICAÇÕES'}
                        </button>
                    </div>

                    {/* SELECTION BUTTONS */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={handleSelectAll}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-bold uppercase"
                        >
                            {t?.selectAll || 'SELECIONAR TUDO'}
                        </button>
                        <button
                            onClick={handleDeselectAll}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors font-bold uppercase"
                        >
                            {t?.deselectAll || 'DESSELECIONAR TUDO'}
                        </button>
                    </div>

                    {/* ITEMS LIST */}
                    <div className="space-y-3 mb-6">
                        {(activeTab === 'windows' ? windowsData.categories : appsData).map(item => (
                            <div
                                key={item.id}
                                onClick={() => toggleItemSelection(item.id)}
                                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                                    selectedItems[item.id]
                                        ? 'border-red-500 bg-red-500/10'
                                        : 'border-gray-700 hover:border-gray-600'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl">{getCategoryIcon(item.id)}</div>
                                        <div>
                                            <h3 className="text-white font-bold">{getCategoryName(item.id)}</h3>
                                            <p className="text-gray-400 text-sm">{item.files} {t?.files || 'arquivos'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-red-500">{formatSize(item.size)}</p>
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                            selectedItems[item.id] ? 'bg-red-500 border-red-500' : 'border-gray-600'
                                        }`}>
                                            {selectedItems[item.id] && (
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CLEAN BUTTON */}
                    {getTotalSelected() > 0 && (
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500 rounded-xl p-6">
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-bold text-white mb-1 uppercase">
                                    {getTotalSelected()} {t?.itemsSelected || 'ITENS SELECIONADOS'}
                                </h3>
                                <p className="text-gray-400 uppercase">
                                    {t?.totalToClean || 'TOTAL A LIMPAR:'} <span className="text-red-500 font-bold">{formatSize(getTotalSize())}</span>
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleClean}
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 uppercase"
                                    style={{ minWidth: '350px' }}
                                >
                                    {t?.cleanSelected || 'LIMPAR SELECIONADOS'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* CLEANING PROGRESS */}
            {cleaning && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500 rounded-xl p-8">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4">
                            <svg className="w-full h-full animate-spin text-red-500" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-red-500 mb-2 uppercase">
                            {(t?.cleaningInProgress || 'PURIFICAÇÃO DIVINA EM PROGRESSO...').toUpperCase()}
                        </h3>
                        <p className="text-gray-400">{cleanProgress}%</p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                        <div
                            className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${cleanProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* CLEANING COMPLETE */}
            {cleanedData && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500 rounded-xl p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-500 mb-4 uppercase">
                        {(t?.purificationComplete || 'PURIFICAÇÃO DIVINA COMPLETA!').toUpperCase()}
                    </h3>
                    <div className="space-y-2 text-gray-300">
                        <p className="text-xl">
                            <span className="text-green-500 font-bold">{formatSize(cleanedData.size)}</span> {(t?.liberated || 'LIBERADOS').toUpperCase()}
                        </p>
                        <p>
                            <span className="text-green-500 font-bold">{cleanedData.files}</span> {(t?.filesBanished || 'ARQUIVOS BANIDOS DAS TREVAS').toUpperCase()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomClean;