// src/components/Header.jsx
import React from "react";
import LanguageSelector from "./LanguageSelector";

export default function Header({ language, onLanguageChange, t }) {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full neon-red" />
          <div className="absolute inset-0.5 rounded-full overflow-hidden">
            <img
              src="/assets/krynnor.jpeg"
              alt="Krynnor"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div className="absolute -top-1 -right-1 text-krynnor-gold text-sm">
            ⚡
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-krynnor-gold neon-gold">
            Krynnor Cleaner
          </h1>
          <p className="text-xs text-gray-400">
            v1.0.0 (64-bit) — {t.tagline}
          </p>
        </div>
      </div>

      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
}
