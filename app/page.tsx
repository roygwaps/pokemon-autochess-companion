"use client"

import { useState, useCallback } from "react"
import { Search, ChartBar as BarChart2, RefreshCw, Zap, Users, BookOpen, Wrench } from "lucide-react"
import { TabMeta } from "@/components/tab-meta"
import { TabComps } from "@/components/tab-comps"
import { TabBuilds } from "@/components/tab-builds"
import { TabTeamBuilder } from "@/components/tab-team-builder"
import { ShopOddsWidget } from "@/components/shop-odds-widget"
import { cn } from "@/lib/utils"

type Tab = "meta" | "comps" | "builds" | "builder"

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "meta", label: "META", icon: <Zap size={15} /> },
  { id: "comps", label: "COMPS", icon: <Users size={15} /> },
  { id: "builds", label: "BUILDS", icon: <BookOpen size={15} /> },
  { id: "builder", label: "TEAM BUILDER", icon: <Wrench size={15} /> },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("meta")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
  const [showShopOdds, setShowShopOdds] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSelectPokemon = useCallback((name: string) => {
    setSelectedPokemon(name)
  }, [])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery) {
      setActiveTab("meta")
    }
  }

  function handleRefresh() {
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg border"
                style={{
                  background: "linear-gradient(135deg, #c89b3c22 0%, #c89b3c44 100%)",
                  borderColor: "#c89b3c40",
                }}
              >
                <Zap className="h-5 w-5" style={{ color: "#c89b3c" }} />
              </div>
              <div className="hidden sm:block">
                <h1
                  className="text-xl font-bold font-display tracking-wide leading-none"
                  style={{ color: "#c89b3c" }}
                >
                  PAC ACADEMY
                </h1>
                <p className="text-xs text-muted-foreground tracking-wider">POKEMON AUTO CHESS</p>
              </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Pokemon, synergy, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border bg-card/60 pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none transition-colors"
                  style={{
                    borderColor: searchQuery ? "#c89b3c60" : undefined,
                    boxShadow: searchQuery ? "0 0 0 1px #c89b3c30" : undefined,
                  }}
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowShopOdds(true)}
                className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm font-display font-semibold uppercase tracking-wide hover:border-primary/40 hover:bg-secondary transition-all"
                style={{ color: "#c89b3c" }}
              >
                <BarChart2 size={14} />
                Shop Odds
              </button>
              <button
                onClick={handleRefresh}
                title="Refresh data"
                className="w-9 h-9 rounded-lg border border-border bg-secondary/40 flex items-center justify-center hover:border-primary/40 transition-all text-muted-foreground hover:text-foreground"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mx-auto max-w-7xl px-4 border-t border-border">
          <nav className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-sm font-display font-semibold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 -mb-px",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6" key={refreshKey}>
        {activeTab === "meta" && (
          <TabMeta
            searchQuery={searchQuery}
            selectedPokemon={selectedPokemon}
            onSelectPokemon={handleSelectPokemon}
          />
        )}
        {activeTab === "comps" && (
          <TabComps
            searchQuery={searchQuery}
            onSelectPokemon={(name) => {
              handleSelectPokemon(name)
              setActiveTab("builds")
            }}
          />
        )}
        {activeTab === "builds" && (
          <TabBuilds searchQuery={searchQuery} preselected={selectedPokemon} />
        )}
        {activeTab === "builder" && <TabTeamBuilder />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground">
          Not affiliated with Pokemon Auto Chess. Community companion tool.
        </div>
      </footer>

      {/* Shop Odds Modal */}
      {showShopOdds && <ShopOddsWidget onClose={() => setShowShopOdds(false)} />}
    </div>
  )
}
