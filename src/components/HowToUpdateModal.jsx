// src/components/HowToUpdateModal.jsx - MODAL EDUCATIVO PROFISSIONAL
import React, { useState } from 'react';

function HowToUpdateModal({ driver, onClose, t }) {
    const [currentStep, setCurrentStep] = useState(0);

    // Passos do guia de atualização
    const steps = [
        {
            id: 'identify',
            title: t?.stepIdentifyTitle || '1. Identify the Driver',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            color: 'from-blue-500 to-blue-600',
            content: [
                {
                    text: t?.stepIdentifyContent1 || 'Make note of your hardware:',
                    highlight: driver.name
                },
                {
                    text: t?.stepIdentifyContent2 || 'Check your system specifications in "My Computer" to confirm the exact model.'
                }
            ],
            warning: t?.stepIdentifyWarning || 'Installing the wrong driver can cause system instability!'
        },
        {
            id: 'official',
            title: t?.stepOfficialTitle || '2. Visit Official Websites',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: 'from-green-500 to-green-600',
            content: [
                {
                    text: t?.stepOfficialContent1 || 'Always download from official manufacturer websites:',
                    list: [
                        'Intel: intel.com/content/www/us/en/download-center',
                        'AMD: amd.com/support',
                        'NVIDIA: nvidia.com/drivers',
                        'Realtek: realtek.com/downloads'
                    ]
                }
            ],
            danger: t?.stepOfficialDanger || '⚠️ NEVER download drivers from third-party sites like driver-easy.com, driverpack-solution.com, or similar!'
        },
        {
            id: 'download',
            title: t?.stepDownloadTitle || '3. Download Safely',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            ),
            color: 'from-purple-500 to-purple-600',
            content: [
                {
                    text: t?.stepDownloadContent1 || 'Safety checklist:',
                    list: [
                        t?.stepDownloadCheck1 || '✓ Verify the website URL (must be official)',
                        t?.stepDownloadCheck2 || '✓ Check file size (official drivers are usually 100-500MB)',
                        t?.stepDownloadCheck3 || '✓ Scan downloaded file with antivirus',
                        t?.stepDownloadCheck4 || '✓ Read release notes and compatibility'
                    ]
                }
            ],
            tip: t?.stepDownloadTip || '💡 Tip: Create a system restore point before installing!'
        },
        {
            id: 'install',
            title: t?.stepInstallTitle || '4. Install Correctly',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'from-yellow-500 to-yellow-600',
            content: [
                {
                    text: t?.stepInstallContent1 || 'Installation process:',
                    list: [
                        t?.stepInstallStep1 || '1. Close all running applications',
                        t?.stepInstallStep2 || '2. Run installer as Administrator (right-click → Run as administrator)',
                        t?.stepInstallStep3 || '3. Follow on-screen instructions',
                        t?.stepInstallStep4 || '4. Restart computer when prompted'
                    ]
                }
            ],
            warning: t?.stepInstallWarning || '⚠️ Do not interrupt the installation process!'
        },
        {
            id: 'verify',
            title: t?.stepVerifyTitle || '5. Verify Installation',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            color: 'from-red-500 to-red-600',
            content: [
                {
                    text: t?.stepVerifyContent1 || 'After restart, verify:',
                    list: [
                        t?.stepVerifyCheck1 || '✓ Check Device Manager (no yellow warnings)',
                        t?.stepVerifyCheck2 || '✓ Test hardware functionality',
                        t?.stepVerifyCheck3 || '✓ Run Krynnor Cleaner scan again',
                        t?.stepVerifyCheck4 || '✓ Monitor system stability for 24 hours'
                    ]
                }
            ],
            success: t?.stepVerifySuccess || '✅ If everything works correctly, the update is complete!'
        }
    ];

    const currentStepData = steps[currentStep];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-krynnor-gold rounded-2xl max-w-4xl w-full shadow-2xl transform transition-all overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-krynnor-red to-red-800 p-6 border-b-2 border-krynnor-gold">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    {t?.howToUpdateModalTitle || 'How to Update Drivers Safely'}
                                </h2>
                                <p className="text-gray-200 text-sm">{driver.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="mt-6">
                        <div className="flex justify-between text-xs text-white/80 mb-2">
                            <span>{t?.progress || 'Progress'}</span>
                            <span>{currentStep + 1} / {steps.length}</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                            <div 
                                className="h-full bg-gradient-to-r from-krynnor-gold to-yellow-500 rounded-full transition-all duration-500"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {/* STEP HEADER */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${currentStepData.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            {currentStepData.icon}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-krynnor-gold" 
                                style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                                {currentStepData.title}
                            </h3>
                        </div>
                    </div>

                    {/* STEP CONTENT */}
                    <div className="space-y-4">
                        {currentStepData.content.map((item, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                                <p className="text-gray-300 font-medium mb-3">{item.text}</p>
                                {item.highlight && (
                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                        <p className="text-blue-400 font-mono font-bold">{item.highlight}</p>
                                    </div>
                                )}
                                {item.list && (
                                    <ul className="space-y-2 ml-4">
                                        {item.list.map((listItem, idx) => (
                                            <li key={idx} className="text-gray-300 flex items-start gap-2">
                                                <span className="text-krynnor-gold mt-1">•</span>
                                                <span>{listItem}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        {/* WARNING */}
                        {currentStepData.warning && (
                            <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p className="text-yellow-200 font-medium">{currentStepData.warning}</p>
                                </div>
                            </div>
                        )}

                        {/* DANGER */}
                        {currentStepData.danger && (
                            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-200 font-medium">{currentStepData.danger}</p>
                                </div>
                            </div>
                        )}

                        {/* TIP */}
                        {currentStepData.tip && (
                            <div className="bg-purple-500/10 border-2 border-purple-500/50 rounded-xl p-4">
                                <p className="text-purple-200 font-medium">{currentStepData.tip}</p>
                            </div>
                        )}

                        {/* SUCCESS */}
                        {currentStepData.success && (
                            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-4">
                                <p className="text-green-200 font-medium">{currentStepData.success}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-6 bg-gray-900/50 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                            disabled={currentStep === 0}
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>{t?.previous || 'Previous'}</span>
                        </button>

                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                                className="px-6 py-3 bg-gradient-to-r from-krynnor-red to-red-800 hover:from-red-600 hover:to-red-900 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                                style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' }}
                            >
                                <span>{t?.next || 'Next'}</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t?.finish || 'Finish'}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToUpdateModal;