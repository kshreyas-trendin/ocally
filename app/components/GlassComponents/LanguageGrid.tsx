"use client";

import React from "react";

type LanguageGridProps = {
  languages?: Array<{ code: string; label: string; hello: string }>;
  targetCount?: number; // e.g., 48 total
  className?: string;
  compact?: boolean;
};

const DEFAULT_LANGS: Array<{ code: string; label: string; hello: string }> = [
  { code: "en", label: "English", hello: "Hello" },
  { code: "es", label: "Español", hello: "Hola" },
  { code: "fr", label: "Français", hello: "Bonjour" },
  { code: "de", label: "Deutsch", hello: "Hallo" },
  { code: "it", label: "Italiano", hello: "Ciao" },
  { code: "pt", label: "Português", hello: "Olá" },
  { code: "nl", label: "Nederlands", hello: "Hallo" },
  { code: "sv", label: "Svenska", hello: "Hej" },
  { code: "no", label: "Norsk", hello: "Hei" },
  { code: "da", label: "Dansk", hello: "Hej" },
  { code: "fi", label: "Suomi", hello: "Hei" },
  { code: "pl", label: "Polski", hello: "Cześć" },
  { code: "cs", label: "Čeština", hello: "Ahoj" },
  { code: "ro", label: "Română", hello: "Salut" },
  { code: "hu", label: "Magyar", hello: "Szia" },
  { code: "ru", label: "Русский", hello: "Привет" },
  { code: "uk", label: "Українська", hello: "Привіт" },
  { code: "tr", label: "Türkçe", hello: "Merhaba" },
  { code: "ar", label: "العربية", hello: "مرحبا" },
  { code: "he", label: "עברית", hello: "שלום" },
  { code: "hi", label: "हिन्दी", hello: "नमस्ते" },
  { code: "bn", label: "বাংলা", hello: "হ্যালো" },
  { code: "ta", label: "தமிழ்", hello: "வணக்கம்" },
  { code: "te", label: "తెలుగు", hello: "హలో" },
  { code: "kn", label: "ಕನ್ನಡ", hello: "ನಮಸ್ಕಾರ" },
  { code: "ml", label: "മലയാളം", hello: "നമസ്കാരം" },
  { code: "si", label: "සිංහල", hello: "හෙලෝ" },
  { code: "zh", label: "中文", hello: "你好" },
  { code: "ja", label: "日本語", hello: "こんにちは" },
  { code: "ko", label: "한국어", hello: "안녕하세요" },
];

export const LanguageGrid: React.FC<LanguageGridProps> = ({
  languages = DEFAULT_LANGS,
  targetCount = 48,
  className = "",
  compact = false,
}) => {
  const remaining = Math.max(targetCount - languages.length, 0);
  return (
    <div className={`w-full ${className}`.trim()} style={{ padding: compact ? 10 : 14 }}>
      {compact ? (
        <>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {languages.map((l) => (
              <div key={l.code} className="px-4 py-3 text-center transition-all hover:scale-105" aria-label={`${l.label} greeting`}>
                <div className="text-lg font-bold leading-tight text-foreground md:text-xl">{l.hello}</div>
                <div className="mt-1 text-xs font-medium tracking-wide text-foreground/70 md:text-sm">{l.label}</div>
              </div>
            ))}
          </div>
          {remaining > 0 && (
            <div className="mt-3 flex items-center justify-center">
              <span className="text-xs tracking-wide text-foreground/60" aria-label={`${remaining} more languages`}>+ {remaining} more</span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {languages.map((l) => (
              <div key={l.code} className="px-4 py-3 text-center transition-all hover:scale-105">
                <div className="text-base font-bold leading-tight text-foreground md:text-xl">{l.hello}</div>
                <div className="mt-1 text-xs font-medium tracking-wide text-foreground/70 md:text-sm">{l.label}</div>
              </div>
            ))}
          </div>
          {remaining > 0 && (
            <div className="mt-3 flex items-center justify-center">
              <span className="text-xs tracking-wide text-foreground/60 md:text-sm" aria-label={`${remaining} more languages`}>+ {remaining} more</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LanguageGrid;


