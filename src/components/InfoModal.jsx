// src/components/InfoModal.jsx - DESIGN PROFISSIONAL E MODERNO
import React from 'react';

function InfoModal({ type, onClose, t }) {
    // 📚 DICIONÁRIO DE INFORMAÇÕES
    const infoContent = {
        // CPU
        cpuCores: { title: t.cores || 'Cores', content: t.infoContentCores || 'Número de processadores físicos.', example: t.infoExampleCores || 'Exemplo: 8 cores.' },
        cpuThreads: { title: t.threads || 'Threads', content: t.infoContentThreads || 'Threads lógicos (Hyper-Threading).', example: t.infoExampleThreads || 'Exemplo: 8 cores = 16 threads.' },
        cpuSpeed: { title: t.cpuBaseSpeed || 'Base Speed', content: t.infoContentCoreSpeed || 'Frequência base de operação em GHz.', example: t.infoExampleCoreSpeed || 'Exemplo: 3.6 GHz.' },
        cpuBoost: { title: t.cpuMaxSpeed || 'Boost Speed', content: t.infoContentBoostSpeed || 'Frequência máxima turbo.', example: t.infoExampleBoostSpeed || 'Exemplo: 4.8 GHz.' },
        cpuCache: { title: 'Cache', content: t.infoContentCacheL3 || 'Cache compartilhado entre núcleos.', example: t.infoExampleCacheL3 || 'Exemplo: 16 MB.' },
        cpuSocket: { title: t.cpuPackage || 'Socket', content: t.infoContentCpuSocket || 'Tipo de encaixe do processador na placa-mãe.', example: t.infoExampleSocket || 'Exemplo: LGA1200, AM4.' },
        
        // MOTHERBOARD
        chipset: { title: t.chipset || 'Chipset', content: t.infoContentChipset || 'Chip que gerencia comunicação entre componentes.', example: t.infoExampleChipset || 'Exemplo: Z490, X570, B550.' },
        
        // MEMORY
        ramType: { title: t.memoryType || 'RAM Type', content: t.infoContentRAMType || 'Geração da memória RAM.', example: t.infoExampleRAMType || 'Exemplo: DDR4, DDR5.' },
        ramChannels: { title: t.memoryChannels || 'Channels', content: t.infoContentRAMChannels || 'Canais simultâneos de RAM.', example: t.infoExampleChannels || 'Exemplo: Dual-channel, Quad-channel.' },
        ramDCMode: { title: t.memoryDCMode || 'DC Mode', content: t.infoContentDCMode || 'Confirma dual-channel ativo.', example: t.infoExampleDCMode || 'Exemplo: "Dual" significa dual-channel.' },
        ramUncoreFreq: { title: t.memoryUncoreFreq || 'Uncore Freq', content: t.infoContentUncoreFreq || 'Frequência do ring bus interno.', example: t.infoExampleUncoreFreq || 'Exemplo: 2692 MHz.' },
        ramCASLatency: { title: 'CAS Latency', content: t.infoContentCASLatency || 'Latência CAS - menor é melhor.', example: t.infoExampleCASLatency || 'Exemplo: CL16, CL19.' },
        ramRCD: { title: 'tRCD', content: t.infoContentRCD || 'RAS to CAS Delay.', example: t.infoExampleRCD || 'Exemplo: 19 ciclos.' },
        ramRP: { title: 'tRP', content: t.infoContentRP || 'RAS Precharge Time.', example: t.infoExampleRP || 'Exemplo: 19 ciclos.' },
        ramRAS: { title: 'tRAS', content: t.infoContentRAS || 'RAS Active Time.', example: t.infoExampleRAS || 'Exemplo: 43 ciclos.' },
        ramRFC: { title: 'tRFC', content: t.infoContentRFC || 'Row Refresh Cycle Time.', example: t.infoExampleRFC || 'Exemplo: 734 ciclos.' },
        ramCommandRate: { title: 'Command Rate', content: t.infoContentCommandRate || 'Ciclos de espera de comando.', example: t.infoExampleCommandRate || 'Exemplo: 1T (rápido), 2T (lento).' },
        
        // GRAPHICS
        vram: { title: t.gpuMemory || 'VRAM', content: t.infoContentVRAM || 'Memória de vídeo dedicada.', example: t.infoExampleVRAM || 'Exemplo: 8 GB, 16 GB.' },
        gpuTechnology: { title: t.gpuTechnology || 'Technology', content: t.infoContentGPUTech || 'Processo de fabricação do chip.', example: t.infoExampleGPUTech || 'Exemplo: 7nm FinFET, 8nm.' },
        gpuClock: { title: t.gpuClockCore || 'Core Clock', content: t.infoContentGPUClock || 'Frequência do núcleo da GPU.', example: t.infoExampleGPUClock || 'Exemplo: 1.5 GHz.' },
        memoryClock: { title: t.gpuClockMemory || 'Memory Clock', content: t.infoContentMemoryClock || 'Frequência da memória de vídeo.', example: t.infoExampleMemoryClock || 'Exemplo: 1750 MHz.' },
        vramType: { title: t.gpuMemoryType || 'VRAM Type', content: t.infoContentVRAMType || 'Geração da memória de vídeo.', example: t.infoExampleVRAMType || 'Exemplo: GDDR6, GDDR6X.' },
        busWidth: { title: t.gpuBusWidth || 'Bus Width', content: t.infoContentBusWidth || 'Largura do barramento de memória.', example: t.infoExampleBusWidth || 'Exemplo: 256-bit, 384-bit.' },
        
        // STORAGE
        diskType: { title: t.diskType || 'Disk Type', content: t.infoContentDiskType || 'Tecnologia de armazenamento.', example: t.infoExampleDiskType || 'Exemplo: NVMe SSD, SATA SSD, HDD.' },
        fileSystem: { title: t.diskFileSystem || 'File System', content: t.infoContentFileSystem || 'Formato de organização de arquivos.', example: t.infoExampleFileSystem || 'Exemplo: NTFS (Windows), ext4 (Linux).' },
        architecture: { title: t.osArch || 'Architecture', content: t.infoContentArchitecture || 'Arquitetura do processador.', example: t.infoExampleArchitecture || 'Exemplo: x64 (64-bit), x86 (32-bit).' },
        uptime: { title: t.osUptime || 'Uptime', content: t.infoContentUptime || 'Tempo desde última inicialização.', example: t.infoExampleUptime || 'Exemplo: 3d 5h 22m.' }
    };

    const info = infoContent[type] || {
        title: t.information || 'Information',
        content: t.noInfoAvailable || 'No information available.',
        example: ''
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-krynnor-gold rounded-xl p-8 max-w-2xl w-full shadow-2xl transform transition-all"
                style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER PROFISSIONAL */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-krynnor-gold/30">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-krynnor-gold" 
                                style={{ textShadow: '0 0 15px rgba(255, 215, 0, 0.6)' }}>
                                {info.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{t.technicalInfo || 'Technical Information'}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 flex items-center justify-center transition-colors"
                    >
                        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* CONTENT PROFISSIONAL */}
                <div className="space-y-6">
                    {/* Descrição */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-start gap-3 mb-3">
                            <svg className="w-6 h-6 text-krynnor-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                                <h4 className="text-krynnor-gold font-bold text-lg mb-2">{t.description || 'Description'}</h4>
                                <p className="text-gray-300 leading-relaxed">{info.content}</p>
                            </div>
                        </div>
                    </div>

                    {/* Exemplo */}
                    {info.example && (
                        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-blue-500/30">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <div>
                                    <h4 className="text-blue-400 font-bold text-lg mb-2">💡 {t.example || 'Example'}</h4>
                                    <p className="text-gray-300 leading-relaxed">{info.example}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER COM BOTÃO PROFISSIONAL */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full px-8 py-4 bg-gradient-to-r from-krynnor-red to-red-800 hover:from-red-600 hover:to-red-900 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg border-2 border-krynnor-gold"
                        style={{ boxShadow: '0 0 25px rgba(220, 38, 38, 0.5)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t.understood || 'Got it!'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InfoModal;