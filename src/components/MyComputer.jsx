// src/components/MyComputer.jsx - USANDO API CORRETA get-detailed-system-info
import React, { useState, useEffect } from 'react';
import InfoModal from './InfoModal';

// ⚡ LOADING SCREEN PROFISSIONAL
const LoadingScreen = ({ t }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 10;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);
    
    return (
        // ⬇️ Sem blackbox aqui: removido bg/backdrop/rounded
        <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10 px-8 max-w-md">
                {/* Ícone Animado */}
                <div className="mb-8 relative flex items-center justify-center">
                    {/* ❌ removido o anel amarelo */}
                    {/* <div className="absolute w-32 h-32 border-4 border-krynnor-gold/20 rounded-full animate-spin"></div> */}
                    {/* mantém só o anel vermelho */}
                    <div
                        className="absolute w-24 h-24 border-4 border-krynnor-red/20 rounded-full animate-spin"
                        style={{ animationDirection: 'reverse', animationDuration: '2s' }}
                    />
                    
                    <div
                        className="w-20 h-20 bg-gradient-to-br from-krynnor-red to-red-800 rounded-lg flex items-center justify-center shadow-lg"
                        style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
                    >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                
                {/* Título */}
                <h2
                    className="text-3xl font-bold text-krynnor-gold mb-4"
                    style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
                >
                    {t.gatheringSystemInfo || 'Gathering System Information'}
                </h2>
                
                {/* Barra de Progresso */}
                <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden mb-3">
                    <div
                        className="h-full bg-gradient-to-r from-krynnor-red to-krynnor-gold transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                <p className="text-gray-400 text-sm">{Math.round(progress)}%</p>
            </div>
        </div>
    );
};

function MyComputer({ t }) {
    const [loading, setLoading] = useState(true);
    const [systemInfo, setSystemInfo] = useState(null);
    const [selectedTab, setSelectedTab] = useState('cpu');
    const [modalInfo, setModalInfo] = useState(null);

    const tabs = [
        { id: 'cpu', label: t.cpu || 'CPU', icon: '🎯' },
        { id: 'motherboard', label: t.motherboard || 'Motherboard', icon: '⚡' },
        { id: 'memory', label: t.memory || 'Memory', icon: '💾' },
        { id: 'graphics', label: t.graphics || 'Graphics', icon: '🎮' },
        { id: 'storage', label: t.storage || 'Storage', icon: '💿' }
    ];

    useEffect(() => {
        loadSystemInfo();
    }, []);

    const loadSystemInfo = async () => {
        setLoading(true);
        try {
            console.log('📊 Chamando get-detailed-system-info...');
            // ✅ CORRIGIDO: Chamando a API CORRETA
            const info = await window.electronAPI.getDetailedSystemInfo();
            console.log('✅ Dados recebidos:', info);
            setSystemInfo(info);
        } catch (error) {
            console.error('❌ Erro ao carregar informações:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingScreen t={t} />;
    }

    const InfoRow = ({ label, value, infoType }) => (
        <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-800/30 rounded transition-colors">
            <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">{label}</span>
                {infoType && (
                    <button
                        onClick={() => setModalInfo(infoType)}
                        className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                    >
                        <span className="text-blue-400 text-xs">?</span>
                    </button>
                )}
            </div>
            <span className="text-white font-medium text-sm">{value || t.notAvailable || 'N/A'}</span>
        </div>
    );

    const renderCPUTab = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-krynnor-gold" 
                        style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                        {t.processorInfo || 'Processor Information'}
                    </h3>
                    <p className="text-gray-400 text-sm">{t.cpuDescription || 'Central Processing Unit details'}</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
                <InfoRow label={t.cpuBrand || 'Brand'} value={systemInfo?.cpu?.manufacturer} />
                <InfoRow label={t.cpuModel || 'Model'} value={systemInfo?.cpu?.brand} />
                <InfoRow label={t.cpuCores || 'Cores'} value={systemInfo?.cpu?.cores} infoType="cpuCores" />
                <InfoRow label={t.cpuThreads || 'Threads'} value={systemInfo?.cpu?.threads} infoType="cpuThreads" />
                <InfoRow label={t.cpuBaseSpeed || 'Current Speed'} value={systemInfo?.cpu?.speed ? `${systemInfo.cpu.speed} GHz` : 'N/A'} infoType="cpuSpeed" />
                <InfoRow label={t.cpuMaxSpeed || 'Max Speed'} value={systemInfo?.cpu?.speedMax ? `${systemInfo.cpu.speedMax} GHz` : 'N/A'} infoType="cpuBoost" />
                <InfoRow label={t.cpuCache || 'L3 Cache'} value={systemInfo?.cpu?.cache?.l3 ? `${systemInfo.cpu.cache.l3} MB` : 'N/A'} infoType="cpuCache" />
                <InfoRow label={t.cpuSocket || 'Socket'} value={systemInfo?.cpu?.socket} infoType="cpuSocket" />
                <InfoRow label={t.cpuTemperature || 'Temperature'} value={systemInfo?.cpu?.temperature} />
            </div>
        </div>
    );

    const renderMotherboardTab = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-krynnor-gold"
                        style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                        {t.motherboardInfo || 'Motherboard Information'}
                    </h3>
                    <p className="text-gray-400 text-sm">{t.moboDescription || 'System board details'}</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
                <InfoRow label={t.moboManufacturer || 'Manufacturer'} value={systemInfo?.motherboard?.manufacturer} />
                <InfoRow label={t.moboModel || 'Model'} value={systemInfo?.motherboard?.model} />
                <InfoRow label={t.moboChipset || 'Chipset'} value={systemInfo?.motherboard?.chipset} infoType="chipset" />
                <InfoRow label={t.moboSerial || 'Serial Number'} value={systemInfo?.motherboard?.serial} />
                
                <div className="my-4 pt-4 border-t border-gray-700">
                    <h4 className="text-krynnor-gold font-bold mb-3 text-lg">{t.biosInfo || 'BIOS Information'}</h4>
                    <InfoRow label={t.biosVendor || 'Vendor'} value={systemInfo?.bios?.vendor} />
                    <InfoRow label={t.biosVersion || 'Version'} value={systemInfo?.bios?.version} />
                    <InfoRow label={t.biosDate || 'Release Date'} value={systemInfo?.bios?.releaseDate} />
                </div>
            </div>
        </div>
    );

    const renderMemoryTab = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-krynnor-gold"
                        style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                        {t.memoryInfo || 'Memory Information'}
                    </h3>
                    <p className="text-gray-400 text-sm">{t.memoryDescription || 'RAM specifications'}</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
                <InfoRow label={t.memoryType || 'Type'} value={systemInfo?.memory?.type} infoType="ramType" />
                <InfoRow label={t.memorySize || 'Total Size'} value={systemInfo?.memory?.total} />
                <InfoRow label={t.memoryUsed || 'Used'} value={systemInfo?.memory?.used} />
                <InfoRow label={t.memoryFree || 'Free'} value={systemInfo?.memory?.free} />
                <InfoRow label={t.memorySpeed || 'Speed'} value={systemInfo?.memory?.clockSpeed} />
                <InfoRow label={t.memoryChannels || 'Channels'} value={systemInfo?.memory?.channels} infoType="ramChannels" />
                <InfoRow label={t.memoryDCMode || 'DC Mode'} value={systemInfo?.memory?.dcMode} infoType="ramDCMode" />
                
                <div className="my-4 pt-4 border-t border-gray-700">
                    <h4 className="text-krynnor-gold font-bold mb-3 text-lg">{t.timings || 'Memory Timings'}</h4>
                    <InfoRow label="CAS# Latency (CL)" value={systemInfo?.memory?.cl} infoType="ramCASLatency" />
                    <InfoRow label="RAS# to CAS# (tRCD)" value={systemInfo?.memory?.rcd} infoType="ramRCD" />
                    <InfoRow label="RAS# Precharge (tRP)" value={systemInfo?.memory?.rp} infoType="ramRP" />
                    <InfoRow label="RAS# Active Time (tRAS)" value={systemInfo?.memory?.ras} infoType="ramRAS" />
                    <InfoRow label="Row Refresh (tRFC)" value={systemInfo?.memory?.rfc} infoType="ramRFC" />
                    <InfoRow label="Command Rate (CR)" value={systemInfo?.memory?.cr} infoType="ramCommandRate" />
                </div>
            </div>
        </div>
    );

    const renderGraphicsTab = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-krynnor-gold"
                        style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                        {t.graphicsInfo || 'Graphics Information'}
                    </h3>
                    <p className="text-gray-400 text-sm">{t.gpuDescription || 'Video card specifications'}</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
                <InfoRow label={t.gpuName || 'GPU Name'} value={systemInfo?.graphics?.model} />
                <InfoRow label={t.gpuVendor || 'Vendor'} value={systemInfo?.graphics?.vendor} />
                <InfoRow label={t.gpuMemory || 'Video Memory'} value={systemInfo?.graphics?.vram} infoType="vram" />
                <InfoRow label={t.gpuClockCore || 'Core Clock'} value={systemInfo?.graphics?.clockCore} infoType="gpuClock" />
                <InfoRow label={t.gpuMemoryType || 'Memory Type'} value={systemInfo?.graphics?.memoryType} infoType="vramType" />
                <InfoRow label={t.gpuDriver || 'Driver Version'} value={systemInfo?.graphics?.driverVersion} />
            </div>
        </div>
    );

    const renderStorageTab = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-krynnor-gold"
                        style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                        {t.storageInfo || 'Storage Information'}
                    </h3>
                    <p className="text-gray-400 text-sm">{t.storageDescription || 'Disk and OS details'}</p>
                </div>
            </div>

            {systemInfo?.storage?.disks?.map((disk, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
                    <h4 className="text-krynnor-gold font-bold mb-4 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {disk.name}
                    </h4>
                    <InfoRow label={t.diskType || 'Type'} value={disk.fsType} infoType="diskType" />
                    <InfoRow label={t.diskSize || 'Size'} value={disk.size} />
                    <InfoRow label={t.diskUsed || 'Used'} value={disk.used} />
                    <InfoRow label={t.diskAvailable || 'Available'} value={disk.available} />
                    <InfoRow label={t.diskMount || 'Mount Point'} value={disk.mount} />
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>{t.diskUsage || 'Usage'}</span>
                            <span className="font-medium text-white">{disk.use}</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-krynnor-red to-krynnor-gold transition-all duration-500"
                                style={{ width: disk.use }}
                            />
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
                <h4 className="text-krynnor-gold font-bold mb-4 text-lg">{t.osInfo || 'Operating System'}</h4>
                <InfoRow label={t.osPlatform || 'Platform'} value={systemInfo?.os?.platform} />
                <InfoRow label={t.osDistro || 'Distribution'} value={systemInfo?.os?.distro} />
                <InfoRow label={t.osArch || 'Architecture'} value={systemInfo?.os?.arch} infoType="architecture" />
                <InfoRow label={t.osUptime || 'Uptime'} value={systemInfo?.os?.uptime} infoType="uptime" />
            </div>
        </div>
    );

    const renderContent = () => {
        switch (selectedTab) {
            case 'cpu': return renderCPUTab();
            case 'motherboard': return renderMotherboardTab();
            case 'memory': return renderMemoryTab();
            case 'graphics': return renderGraphicsTab();
            case 'storage': return renderStorageTab();
            default: return renderCPUTab();
        }
    };

    return (
        // ⬇️ Sem blackbox aqui também: removidos bg/backdrop/rounded
        <div className="p-8">
            <div className="relative z-10">
                {/* HEADER PROFISSIONAL */}
                <div className="mb-8">
                    <h1
                        className="text-5xl font-bold text-krynnor-gold mb-2 flex items-center gap-4" 
                        style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}
                    >
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t.myComputerTitle || 'My Computer'}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {t.myComputerDescription || 'Complete system specifications and information'}
                    </p>
                </div>

                {/* TABS PROFISSIONAIS */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                                selectedTab === tab.id
                                    ? 'bg-gradient-to-r from-krynnor-red to-red-800 text-white border-2 border-krynnor-gold shadow-lg'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border-2 border-gray-700'
                            }`}
                            style={selectedTab === tab.id ? { boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)' } : {}}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="mb-8">
                    {renderContent()}
                </div>

                {/* REFRESH BUTTON PROFISSIONAL */}
                <div className="flex justify-center">
                    <button
                        onClick={loadSystemInfo}
                        className="px-8 py-4 bg-gradient-to-r from-krynnor-red to-red-800 hover:from-red-600 hover:to-red-900 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg border-2 border-krynnor-gold"
                        style={{ boxShadow: '0 0 25px rgba(220, 38, 38, 0.5)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>{t.refresh || 'Refresh Information'}</span>
                    </button>
                </div>
            </div>

            {/* INFO MODAL */}
            {modalInfo && (
                <InfoModal
                    type={modalInfo}
                    onClose={() => setModalInfo(null)}
                    t={t}
                />
            )}
        </div>
    );
}

export default MyComputer;
