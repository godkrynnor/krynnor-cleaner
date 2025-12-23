// src/App.jsx - ✅ COM SISTEMA DE NOTIFICAÇÕES COMPLETO
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HealthCheck from "./components/HealthCheck";
import CustomClean from "./components/CustomClean";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import DriverUpdater from "./components/DriverUpdater";
import MyComputer from "./components/MyComputer";
import Tools from './components/Tools';
import Options from './components/Options';
import { translations } from "./locales";

const SIDEBAR_W = 288; // w-72
const HEADER_H = 80;   // h-20
const FOOTER_H = 48;   // h-12

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("health");
  const [systemInfo, setSystemInfo] = useState(null);
  const [language, setLanguage] = useState("pt-BR");
  const thunderAudioRef = useRef(null);

  // ============================================
  // ✅ LISTENER PARA TRAY "LIMPAR SISTEMA"
  // ============================================
  useEffect(() => {
    console.log('📡 Configurando listener de tray...');
    
    // Listener para quando usuário clicar em "Limpar Sistema" no tray
    const cleanup = window.electronAPI.onOpenHealthCheck(() => {
      console.log('📱 Usuário clicou em "Limpar Sistema" no tray');
      setCurrentScreen('health');
    });
    
    // Cleanup function para remover listener
    return cleanup;
  }, []);

  // ============================================
  // ✅ NOTIFICAÇÃO DE BOAS-VINDAS (PRIMEIRA VEZ)
  // ============================================
  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('krynnor-welcome-notification');
    
    if (!hasShownWelcome) {
      // Aguardar 2 segundos após app iniciar
      setTimeout(async () => {
        try {
          await window.electronAPI.showNotificationEx(
            'Krynnor Cleaner Ativado! 🛡️',
            'Monitoramento de sistema iniciado. Você será notificado quando houver necessidade de limpeza ou otimização.',
            'info'
          );
          localStorage.setItem('krynnor-welcome-notification', 'true');
          console.log('✅ Notificação de boas-vindas exibida');
        } catch (error) {
          console.log('⚠️ Notificação não disponível:', error);
        }
      }, 2000);
    } else {
      console.log('ℹ️ Notificação de boas-vindas já foi exibida anteriormente');
    }
  }, []);

  // ============================================
  // ✅ CARREGAMENTO INICIAL DO SISTEMA
  // ============================================
  useEffect(() => {
    (async () => {
      try {
        const info = await window.electronAPI?.getSystemInfo?.();
        setSystemInfo(info || null);
        console.log('📊 Informações do sistema carregadas:', info);
      } catch (error) {
        console.error('❌ Erro ao carregar informações do sistema:', error);
      }
    })();
    
    const saved = localStorage.getItem("krynnor-language");
    if (saved && translations[saved]) {
      setLanguage(saved);
      console.log('🌐 Idioma carregado:', saved);
    }
  }, []);

  const t = translations[language];

  const handleNavigate = (screen) => {
    if (screen !== currentScreen) {
      console.log(`🔄 Navegando para: ${screen}`);
      setCurrentScreen(screen);
    }
  };

  const handleLanguageChange = (lng) => {
    setLanguage(lng);
    localStorage.setItem("krynnor-language", lng);
    console.log('🌐 Idioma alterado para:', lng);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "health":
        return <HealthCheck t={t} />;
      case "clean":
        return <CustomClean t={t} />;
      case "performance":
        return <PerformanceOptimizer t={t} />;
      case "driver":
        return <DriverUpdater t={t} language={language} />;
      case "mypc":
        return <MyComputer t={t} />;
      case "tools":
        return <Tools t={t} />;
      case "options":
        return <Options t={t} />;
      default:
        return <HealthCheck t={t} />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white">
      {/* 🎥 vídeo de fundo — opacidade uniforme em tudo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] opacity-20 pointer-events-none"
      >
        <source src="/assets/videos/krynnorofc.mp4" type="video/mp4" />
      </video>
      {/* overlay leve e uniforme (contraste) */}
      <div className="fixed inset-0 bg-black bg-opacity-10 z-[-1]" />

      {/* ===== SIDEBAR ABAIXO DO HEADER ===== */}
      <aside
        className="fixed left-0 w-72 z-30 bg-black/20 backdrop-blur-sm border-r-2 border-krynnor-red"
        aria-label="sidebar"
        style={{
          top: HEADER_H,
          height: `calc(100vh - ${HEADER_H}px)`,
        }}
      >
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          t={t}
        />
      </aside>

      {/* ===== HEADER FULL-WIDTH NO TOPO ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-sm border-b-2 border-krynnor-red"
        style={{ height: HEADER_H }}
      >
        <div className="h-20 px-6 flex items-center justify-between">
          <Header
            language={language}
            onLanguageChange={handleLanguageChange}
            t={t}
          />
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO — rola sozinha / respeita header e footer */}
      <main
        className="relative overflow-y-auto overflow-x-hidden px-4"
        style={{
          marginLeft: SIDEBAR_W,
          paddingTop: HEADER_H,
          paddingBottom: FOOTER_H,
          height: `calc(100vh)`,
        }}
      >
        {renderScreen()}
      </main>

      {/* FOOTER FIXO — info do sistema (mantido como estava) */}
      <footer
        className="fixed bottom-0 right-0 z-40 bg-black/20 backdrop-blur-sm text-gray-300 border-t-2 border-krynnor-red/30"
        style={{ left: SIDEBAR_W, height: FOOTER_H }}
      >
        <div className="h-12 w-full flex items-center justify-between px-4">
          <span className="text-sm">
            {systemInfo
              ? `${systemInfo.platform || "win32"} | ${systemInfo.cpuCount || systemInfo.cpus || "?"} cores`
              : "—"}
          </span>
          <button className="text-sm hover:text-krynnor-gold transition-colors">
            {t.checkForUpdates}
          </button>
        </div>
      </footer>
    </div>
  );
}