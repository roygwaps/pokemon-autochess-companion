"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { useBuildsData, useMetaData, getPokemonImage } from "@/lib/use-game-data"
import { SynergyTag } from "./synergy-tag"
import { PokemonHex } from "./pokemon-hex"
import { cn } from "@/lib/utils"

const TIER_COLORS: Record<string, string> = {
  S: "#ef4444", A: "#f97316", B: "#eab308", C: "#22c55e", X: "#06b6d4",
}

interface TabBuildsProps {
  searchQuery: string
  preselected?: string | null
}

export function TabBuilds({ searchQuery: globalSearch, preselected }: TabBuildsProps) {
  const { data: builds, loading } = useBuildsData()
  const { data: meta } = useMetaData()
  const [localSearch, setLocalSearch] = useState(preselected ?? "")
  const [selected, setSelected] = useState<string | null>(preselected ?? null)

  const q = (localSearch || globalSearch).toLowerCase()

  const allPokemon = useMemo(() => {
    if (!builds) return []
    return Object.entries(builds).map(([name, build]) => ({ name, ...build }))
  }, [builds])

  const filtered = useMemo(() => {
    if (!q) return allPokemon
    return allPokemon.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.synergies.some((s) => s.toLowerCase().includes(q))
    )
  }, [allPokemon, q])

  const selectedBuild = selected ? builds?.[selected] : null

  if (loading) {
    return <div className="h-48 rounded-lg bg-card animate-pulse" />
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Pokemon builds..."
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value)
            setSelected(null)
          }}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pokemon list */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
            {filtered.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelected(p.name === selected ? null : p.name)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-all hover:bg-secondary/60",
                  selected === p.name
                    ? "border-primary/60 bg-primary/10"
                    : "border-border bg-card/50"
                )}
              >
                <PokemonHex
                  name={p.name}
                  rarity={p.rarity}
                  size={44}
                  tooltip={false}
                  isSelected={selected === p.name}
                />
                <span className="text-xs text-center leading-tight font-medium">{p.name}</span>
                <span
                  className="text-xs font-display font-bold"
                  style={{ color: TIER_COLORS[p.tier] ?? "#e8eaf0" }}
                >
                  {p.tier}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Build detail */}
        {selected && selectedBuild ? (
          <div className="flex-1 rounded-lg border border-border bg-card p-6 animate-fade-in-up space-y-5">
            {/* Header */}
            <div className="flex items-start gap-5">
              <PokemonHex name={selected} rarity={selectedBuild.rarity} size={80} tooltip={false} />
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-display text-3xl font-bold">{selected}</h2>
                  <span
                    className="font-display text-sm font-bold px-2.5 py-1 rounded"
                    style={{
                      color: TIER_COLORS[selectedBuild.tier],
                      backgroundColor: `${TIER_COLORS[selectedBuild.tier]}18`,
                      border: `1px solid ${TIER_COLORS[selectedBuild.tier]}40`,
                    }}
                  >
                    {selectedBuild.tier} TIER
                  </span>
                  <span className="text-sm px-2.5 py-1 rounded bg-secondary text-secondary-foreground font-display uppercase tracking-wide">
                    {selectedBuild.role}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedBuild.synergies.map((s) => (
                    <SynergyTag key={s} name={s} />
                  ))}
                </div>
              </div>
            </div>

            {/* Best items */}
            <div>
              <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Best Items
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedBuild.bestItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-transform hover:scale-105"
                    style={{
                      backgroundColor: `${item.color}18`,
                      borderColor: `${item.color}50`,
                      color: "#e8eaf0",
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}80` }}
                    />
                    {item.name}
                    {idx === 0 && (
                      <span
                        className="text-xs font-display uppercase ml-1 opacity-70"
                        style={{ color: "#c89b3c" }}
                      >
                        BIS
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Alt items */}
            {selectedBuild.altItems.length > 0 && (
              <div>
                <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Alt Items
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBuild.altItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-border bg-secondary/50"
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 opacity-60"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="rounded-xl border border-border bg-secondary/30 px-5 py-4">
              <p className="text-sm text-foreground/80 italic leading-relaxed">{selectedBuild.notes}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center rounded-lg border border-dashed border-border min-h-[200px]">
            <p className="text-muted-foreground text-sm">Select a Pokemon to see build details</p>
          </div>
        )}
      </div>
    </div>
  )
}
