// src/components/StartupAppsTable.jsx
import React, { useState, useEffect } from 'react';

function StartupAppsTable({ t }) {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadApps = async () => {
        try {
            setLoading(true);
            const startupApps = await window.electronAPI.getStartupApps();
            setApps(startupApps || []);
        } catch (error) {
            console.error('Erro ao carregar apps:', error);
            setApps([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApps();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-krynnor-gold mx-auto"></div>
                <p className="text-gray-400 mt-4">Carregando...</p>
            </div>
        );
    }

    if (apps.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                Nenhum aplicativo encontrado
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Publisher</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Startup impact</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {apps.map((app, index) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <td className="py-3 px-4 text-white">{app.name}</td>
                            <td className="py-3 px-4 text-gray-400">{app.publisher || 'Unknown'}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-xs ${
                                    app.status === 'Enabled' 
                                        ? 'bg-green-900/30 text-green-400' 
                                        : 'bg-gray-700 text-gray-400'
                                }`}>
                                    {app.status}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-xs ${
                                    app.impact === 'High' 
                                        ? 'bg-red-900/30 text-red-400' 
                                        : app.impact === 'Medium'
                                        ? 'bg-yellow-900/30 text-yellow-400'
                                        : 'bg-green-900/30 text-green-400'
                                }`}>
                                    {app.impact || 'Low'}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <button className="text-blue-400 hover:text-blue-300 text-sm">
                                    Toggle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StartupAppsTable;