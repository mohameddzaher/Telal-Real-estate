"use client";

import { useState, useEffect } from "react";
import { useContentStore } from "@/store/content";
import { RotateCcw, Save, Check } from "lucide-react";

type SavedSection = "hero" | "signature" | "stats" | "cta" | null;

export default function AdminHomepagePage() {
  const { homepage, updateHomepage, resetHomepage } = useContentStore();
  const [savedSection, setSavedSection] = useState<SavedSection>(null);
  const [mounted, setMounted] = useState(false);

  // Local form state for each section
  const [heroTitle, setHeroTitle] = useState("");
  const [heroTitleAr, setHeroTitleAr] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroSubtitleAr, setHeroSubtitleAr] = useState("");

  const [signatureQuote, setSignatureQuote] = useState("");
  const [signatureQuoteAr, setSignatureQuoteAr] = useState("");

  const [statProjects, setStatProjects] = useState(0);
  const [statUnits, setStatUnits] = useState(0);
  const [statPortfolio, setStatPortfolio] = useState(0);
  const [statYears, setStatYears] = useState(0);

  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaTitleAr, setCtaTitleAr] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [ctaDescriptionAr, setCtaDescriptionAr] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync local state with store on mount / store changes
  useEffect(() => {
    if (!mounted) return;
    setHeroTitle(homepage.heroTitle);
    setHeroTitleAr(homepage.heroTitleAr);
    setHeroSubtitle(homepage.heroSubtitle);
    setHeroSubtitleAr(homepage.heroSubtitleAr);
    setSignatureQuote(homepage.signatureQuote);
    setSignatureQuoteAr(homepage.signatureQuoteAr);
    setStatProjects(homepage.statProjects);
    setStatUnits(homepage.statUnits);
    setStatPortfolio(homepage.statPortfolio);
    setStatYears(homepage.statYears);
    setCtaTitle(homepage.ctaTitle);
    setCtaTitleAr(homepage.ctaTitleAr);
    setCtaDescription(homepage.ctaDescription);
    setCtaDescriptionAr(homepage.ctaDescriptionAr);
  }, [mounted, homepage]);

  const showSaved = (section: SavedSection) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const saveHero = () => {
    updateHomepage({ heroTitle, heroTitleAr, heroSubtitle, heroSubtitleAr });
    showSaved("hero");
  };

  const saveSignature = () => {
    updateHomepage({ signatureQuote, signatureQuoteAr });
    showSaved("signature");
  };

  const saveStats = () => {
    updateHomepage({ statProjects, statUnits, statPortfolio, statYears });
    showSaved("stats");
  };

  const saveCta = () => {
    updateHomepage({ ctaTitle, ctaTitleAr, ctaDescription, ctaDescriptionAr });
    showSaved("cta");
  };

  const handleReset = () => {
    if (confirm("Reset all homepage content to defaults? This cannot be undone.")) {
      resetHomepage();
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-white">Homepage Editor</h1>
          <p className="text-sm text-gray-mid mt-1">
            Edit the homepage sections. Changes are saved to browser storage and reflected immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-light border border-black-border rounded-sm hover:text-white hover:border-gray-mid transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Default
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-white">Hero Section</h2>
          {savedSection === "hero" && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                Hero Title (English)
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="input-luxury w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                Hero Title (Arabic)
              </label>
              <input
                type="text"
                value={heroTitleAr}
                onChange={(e) => setHeroTitleAr(e.target.value)}
                className="input-luxury w-full"
                dir="rtl"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                Subtitle (English)
              </label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={3}
                className="input-luxury w-full resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                Subtitle (Arabic)
              </label>
              <textarea
                value={heroSubtitleAr}
                onChange={(e) => setHeroSubtitleAr(e.target.value)}
                rows={3}
                className="input-luxury w-full resize-none"
                dir="rtl"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={saveHero} className="btn-gold gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </section>

      {/* Signature Statement */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-white">Signature Statement</h2>
          {savedSection === "signature" && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
              Quote (English)
            </label>
            <textarea
              value={signatureQuote}
              onChange={(e) => setSignatureQuote(e.target.value)}
              rows={4}
              className="input-luxury w-full resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
              Quote (Arabic)
            </label>
            <textarea
              value={signatureQuoteAr}
              onChange={(e) => setSignatureQuoteAr(e.target.value)}
              rows={4}
              className="input-luxury w-full resize-none"
              dir="rtl"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={saveSignature} className="btn-gold gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-white">Stats</h2>
          {savedSection === "stats" && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
              Projects Completed
            </label>
            <input
              type="number"
              value={statProjects}
              onChange={(e) => setStatProjects(Number(e.target.value))}
              className="input-luxury w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
              Units Delivered
            </label>
            <input
              type="number"
              value={statUnits}
              onChange={(e) => setStatUnits(Number(e.target.value))}
              className="input-luxury w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
              Portfolio Value (B SAR)
            </label>
            <input
              type="number"
              step="0.1"
              value={statPortfolio}
              onChange={(e) => setStatPortfolio(Number(e.target.value))}
              className="input-luxury w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
              Years of Excellence
            </label>
            <input
              type="number"
              value={statYears}
              onChange={(e) => setStatYears(Number(e.target.value))}
              className="input-luxury w-full"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={saveStats} className="btn-gold gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-white">Footer CTA</h2>
          {savedSection === "cta" && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                CTA Title (English)
              </label>
              <input
                type="text"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                className="input-luxury w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                CTA Title (Arabic)
              </label>
              <input
                type="text"
                value={ctaTitleAr}
                onChange={(e) => setCtaTitleAr(e.target.value)}
                className="input-luxury w-full"
                dir="rtl"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                Description (English)
              </label>
              <textarea
                value={ctaDescription}
                onChange={(e) => setCtaDescription(e.target.value)}
                rows={3}
                className="input-luxury w-full resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-mid uppercase tracking-wider mb-2">
                Description (Arabic)
              </label>
              <textarea
                value={ctaDescriptionAr}
                onChange={(e) => setCtaDescriptionAr(e.target.value)}
                rows={3}
                className="input-luxury w-full resize-none"
                dir="rtl"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={saveCta} className="btn-gold gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
