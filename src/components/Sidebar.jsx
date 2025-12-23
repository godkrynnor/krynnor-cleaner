// src/components/Sidebar.jsx - BOTÃO REDESENHADO PROFISSIONAL
import React from "react";

export default function Sidebar({ currentScreen, onNavigate, t }) {
  const menu = [
    { id: "health", icon: "/assets/menu-icons/health-check.png", label: t.healthCheck },
    { id: "clean", icon: "/assets/menu-icons/custom-clean.png", label: t.customClean },
    { id: "performance", icon: "/assets/menu-icons/performance.png", label: t.performanceOptimizer },
    { id: "driver", icon: "/assets/menu-icons/driver-updater.png", label: t.driverUpdater, badge: "2" },
    { id: "mypc", icon: "/assets/menu-icons/software-updater.png", label: t.myComputer },
    { id: "tools", icon: "/assets/menu-icons/tools.png", label: t.tools },
    { id: "options", icon: "/assets/menu-icons/options.png", label: t.options },
  ];

  const openWebsite = () => {
    if (window.electronAPI && window.electronAPI.openExternal) {
      window.electronAPI.openExternal('https://krynnor.com.br');
    } else {
      window.open('https://krynnor.com.br', '_blank');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 py-4">
        {menu.map((m) => (
          <button
            key={m.id}
            onClick={() => onNavigate(m.id)}
            className={`w-full px-6 py-3.5 flex items-center gap-3 text-left transition-all relative group ${
              currentScreen === m.id
                ? "bg-krynnor-red text-white neon-red"
                : "text-gray-300 hover:bg-krynnor-card hover:text-white"
            }`}
          >
            <img src={m.icon} alt={m.label} className="w-6 h-6" />
            <span className="flex-1 font-medium">{m.label}</span>
            {m.badge && (
              <span className="bg-krynnor-red text-white text-xs font-bold px-2 py-0.5 rounded-full neon-red">
                {m.badge}
              </span>
            )}
            {currentScreen === m.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-krynnor-gold neon-gold" />
            )}
          </button>
        ))}
      </div>

      {/* BOTÃO ABOUT KRYNNOR - REDESENHADO MODERNO */}
      <div className="p-4 border-t border-krynnor-red/30">
        <button 
          onClick={openWebsite}
          className="w-full bg-gradient-to-r from-krynnor-red to-red-800 hover:from-red-700 hover:to-red-900 text-white px-4 py-3 rounded-lg font-semibold text-left transition-all duration-200 flex items-center justify-between shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
          style={{ boxShadow: '0 4px 14px 0 rgba(220, 38, 38, 0.4)' }}
        >
          {/* LEFT SIDE: Icon + Text */}
          <div className="flex items-center gap-3">
            {/* Lightning Icon */}
            <div className="w-9 h-9 bg-krynnor-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg 
                className="w-5 h-5 text-krynnor-gold" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight">
                {t.aboutKrynnor || 'About Krynnor'}
              </span>
              <span className="text-xs text-gray-300 leading-tight">
                {t.visitWebsite || 'Visit Website'}
              </span>
            </div>
          </div>
          
          {/* RIGHT SIDE: Arrow */}
          <div className="flex items-center justify-center">
            <svg 
              className="w-5 h-5 text-krynnor-gold group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}