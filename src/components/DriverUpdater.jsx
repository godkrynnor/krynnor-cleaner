// src/components/DriverUpdater.jsx - COM MODAL "COMO ATUALIZAR"
import React, { useState } from 'react';
import DriverWisdomModal from './DriverWisdomModal';
import HowToUpdateModal from './HowToUpdateModal';

function DriverUpdater({ t }) {
  const [scanning, setScanning] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const scanDrivers = async () => {
    setScanning(true);
    try {
      const result = await window.electronAPI.scanDrivers();
      setDrivers(result || []);
    } catch (error) {
      console.error('Error scanning drivers:', error);
    } finally {
      setScanning(false);
    }
  };

  const openHowToUpdate = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }} className="p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1
          className="text-5xl font-bold text-krynnor-gold mb-2 flex items-center gap-4"
          style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}
        >
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t?.driverUpdater || 'Driver Updater'}
        </h1>
        <p className="text-gray-400 text-lg">
          {t?.driverUpdaterDescription || 'Mantenha seus drivers sempre atualizados'}
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* SCAN BUTTON CARD */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-krynnor-gold/40 rounded-xl p-8 hover:border-krynnor-gold/60 transition-all shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.4)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {t?.scanDrivers || 'Scan Drivers'}
              </h3>
              <p className="text-sm text-gray-400">
                {t?.scanDescription || 'Detect outdated drivers'}
              </p>
            </div>
          </div>

          <button
            onClick={scanDrivers}
            disabled={scanning}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-xl text-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            style={{ boxShadow: '0 0 25px rgba(234, 179, 8, 0.5)' }}
          >
            {scanning ? (
              <>
                <svg className="animate-spin w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{t?.scanning || 'Scanning...'}</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{t?.startScan || 'START SCAN'}</span>
              </>
            )}
          </button>
        </div>

        {/* WISDOM BUTTON CARD */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/40 rounded-xl p-8 hover:border-blue-500/60 transition-all shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {t?.krynnorWisdom || "Krynnor's Wisdom"}
              </h3>
              <p className="text-sm text-gray-400">
                {t?.wisdomDescription || 'Learn about drivers'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            style={{ boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{t?.learnMore || 'LEARN MORE'}</span>
          </button>
        </div>
      </div>

      {/* DRIVERS LIST */}
      {drivers.length > 0 && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500/40 rounded-xl p-6 hover:border-red-500/60 transition-all shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-krynnor-gold" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                {t?.outdatedDrivers || 'Outdated Drivers'}
              </h3>
              <p className="text-gray-400">
                {drivers.length} {t?.driversFound || 'drivers need attention'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {drivers.map((driver, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{driver.name}</h4>
                      <p className="text-sm text-gray-400">{driver.description || 'Driver component'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => openHowToUpdate(driver)}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t?.howToUpdate || 'Como Atualizar'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NO DRIVERS FOUND */}
      {!scanning && drivers.length === 0 && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/40 rounded-xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">
            {t?.allDriversUpdated || 'All Drivers Up to Date'}
          </h3>
          <p className="text-gray-400">
            {t?.noDriversFound || 'No outdated drivers detected. Your system is optimized!'}
          </p>
        </div>
      )}

      {/* MODALS */}
      {modalOpen && (
        <DriverWisdomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          t={t}
        />
      )}

      {selectedDriver && (
        <HowToUpdateModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          t={t}
        />
      )}
    </div>
  );
}

export default DriverUpdater;