// preload.js - COMPLETO COM NOTIFICAÇÕES
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // ============================================
    // SISTEMA
    // ============================================
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
    getDetailedSystemInfo: () => ipcRenderer.invoke('get-detailed-system-info'),
    
    // ============================================
    // CUSTOM CLEAN
    // ============================================
    scanWindowsFiles: () => ipcRenderer.invoke('scan-windows-files'),
    scanAppCaches: () => ipcRenderer.invoke('scan-app-caches'),
    cleanSelectedItems: (selectedItems) => ipcRenderer.invoke('clean-selected-items', selectedItems),
    
    // ============================================
    // APPS INSTALADOS
    // ============================================
    getInstalledApps: () => ipcRenderer.invoke('get-installed-apps'),
    
    // ============================================
    // HEALTH CHECK
    // ============================================
    scanSystem: () => ipcRenderer.invoke('scan-system'),
    scanSystemHealth: () => ipcRenderer.invoke('scan-system-health'),
    
    // ============================================
    // PERFORMANCE
    // ============================================
    getStartupApps: () => ipcRenderer.invoke('get-startup-apps'),
    clearRAM: () => ipcRenderer.invoke('clear-ram'),
    toggleStartupApp: (appData, enable) => ipcRenderer.invoke('toggle-startup-app', appData, enable),
    
    // ============================================
    // DRIVERS
    // ============================================
    scanDrivers: () => ipcRenderer.invoke('scan-drivers'),
    openDriverSearch: (query) => ipcRenderer.invoke('open-driver-search', query),
    
    // ============================================
    // EXTERNAL & NOTIFICAÇÕES ANTIGAS
    // ============================================
    openExternal: (url) => ipcRenderer.invoke('open-external', url),
    showNotification: (title, body) => ipcRenderer.invoke('show-notification', { title, body, type: 'info' }),
    
    // ============================================
    // ✅ NOVAS FUNÇÕES - SISTEMA DE NOTIFICAÇÕES
    // ============================================
    
    /**
     * Mostrar notificação nativa do Windows
     * @param {string} title - Título da notificação
     * @param {string} body - Corpo da notificação
     * @param {string} type - Tipo: 'info', 'success', 'warning', 'error'
     * @returns {Promise<{success: boolean}>}
     * 
     * Exemplo de uso:
     * await window.electronAPI.showNotificationEx('Sucesso!', 'Limpeza completa!', 'success');
     */
    showNotificationEx: (title, body, type = 'info') => 
        ipcRenderer.invoke('show-notification', { title, body, type }),
    
    /**
     * Atualizar texto do tooltip do tray icon
     * @param {string} text - Novo texto do tooltip
     * @returns {Promise<{success: boolean}>}
     * 
     * Exemplo de uso:
     * await window.electronAPI.updateTrayTooltip('Krynnor - RAM: 45% (4.5/10 GB)');
     */
    updateTrayTooltip: (text) => 
        ipcRenderer.invoke('update-tray-tooltip', text),
    
    /**
     * Forçar verificação imediata do sistema
     * @returns {Promise<{success: boolean}>}
     * 
     * Exemplo de uso:
     * await window.electronAPI.checkSystemNow();
     */
    checkSystemNow: () => 
        ipcRenderer.invoke('check-system-now'),
    
    /**
     * Listener para quando usuário clicar em "Limpar Sistema" no tray
     * @param {function} callback - Função a ser chamada
     * @returns {function} Função de cleanup para remover o listener
     * 
     * Exemplo de uso:
     * useEffect(() => {
     *     const cleanup = window.electronAPI.onOpenHealthCheck(() => {
     *         navigate('/health-check');
     *     });
     *     return cleanup;
     * }, []);
     */
    onOpenHealthCheck: (callback) => {
        const listener = () => callback();
        ipcRenderer.on('open-health-check', listener);
        
        // Retornar função de cleanup
        return () => {
            ipcRenderer.removeListener('open-health-check', listener);
        };
    }
});

console.log('✅ Preload carregado - COM SISTEMA DE NOTIFICAÇÕES');
console.log('📱 Funções disponíveis:');
console.log('   - showNotificationEx(title, body, type)');
console.log('   - updateTrayTooltip(text)');
console.log('   - checkSystemNow()');
console.log('   - onOpenHealthCheck(callback)');