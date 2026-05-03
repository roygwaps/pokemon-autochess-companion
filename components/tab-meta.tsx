"use client"

import { useMetaData, useBuildsData, type PokemonMeta } from "@/lib/use-game-data"
import { PokemonHex } from "./pokemon-hex"
import { SynergyTag } from "./synergy-tag"

const TIERS = ["S", "A", "B", "C", "X"] as const
type Tier = typeof TIERS[number]

const TIER_LABELS: Record<Tier, { label: string; color: string; border: string; glow: string }> = {
  S: { label: "S", color: "#ef4444", border: "border-red-500/40", glow: "rgba(239,68,68,0.15)" },
  A: { label: "A", color: "#f97316", border: "border-orange-500/40", glow: "rgba(249,115,22,0.15)" },
  B: { label: "B", color: "#eab308", border: "border-yellow-500/40", glow: "rgba(234,179,8,0.15)" },
  C: { label: "C", color: "#22c55e", border: "border-green-500/40", glow: "rgba(34,197,94,0.15)" },
  X: { label: "X", color: "#06b6d4", border: "border-cyan-500/40", glow: "rgba(6,182,212,0.15)" },
}

interface TabMetaProps {
  onSelectPokemon: (name: string) => void
  selectedPokemon: string | null
  searchQuery: string
}

export function TabMeta({ onSelectPokemon, selectedPokemon, searchQuery }: TabMetaProps) {
  const { data: meta, loading } = useMetaData()
  const { data: builds } = useBuildsData()

  if (loading) {
    return (
      <div className="space-y-4">
        {TIERS.map((tier) => (
          <div key={tier} className="h-24 rounded-lg bg-card animate-pulse" />
        ))}
      </div>
    )
  }

  if (!meta) {
    return <div className="text-center py-12 text-muted-foreground">Failed to load meta data.</div>
  }

  const q = searchQuery.toLowerCase()

  function filterPokemon(list: PokemonMeta[]) {
    if (!q) return list
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.synergies.some((s) => s.toLowerCase().includes(q))
    )
  }

  return (
    <div className="space-y-3">
      {TIERS.map((tier, i) => {
        const pokemon = filterPokemon(meta[tier] ?? [])
        const { color, border, glow } = TIER_LABELS[tier]

        return (
          <div
            key={tier}
            className={`flex items-center gap-4 rounded-lg border ${border} overflow-hidden animate-tier-row`}
            style={{
              backgroundColor: glow,
              boxShadow: `inset 0 0 40px ${glow}`,
              animationDelay: `${i * 80}ms`,
            }}
          >
            {/* Tier label */}
            <div
              className="flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center"
              style={{ backgroundColor: `${color}20`, borderRight: `2px solid ${color}60` }}
            >
              <span
                className="font-display text-3xl font-bold leading-none"
                style={{ color }}
              >
                {tier}
              </span>
              <span className="text-xs text-muted-foreground font-display uppercase tracking-widest mt-0.5">
                TIER
              </span>
            </div>

            {/* Pokemon hexes */}
            <div className="flex flex-wrap gap-2 py-3 pr-4">
              {pokemon.length === 0 ? (
                <span className="text-sm text-muted-foreground italic">No matches</span>
              ) : (
                pokemon.map((p) => (
                  <PokemonHex
                    key={p.name}
                    name={p.name}
                    rarity={p.rarity}
                    size={52}
                    isSelected={selectedPokemon === p.name}
                    role={p.role}
                    tier={tier}
                    onClick={() => onSelectPokemon(p.name)}
                  />
                ))
              )}
            </div>
          </div>
        )
      })}

      {/* Pokemon detail side panel */}
      {selectedPokemon && builds?.[selectedPokemon] && (
        <div className="mt-6 rounded-lg border border-border bg-card p-6 animate-fade-in-up">
          <PokemonDetailPanel name={selectedPokemon} />
        </div>
      )}
    </div>
  )
}

function PokemonDetailPanel({ name }: { name: string }) {
  const { data: builds } = useBuildsData()
  const { data: meta } = useMetaData()
  const build = builds?.[name]

  if (!build) return null

  const metaPokemon = Object.values(meta ?? {})
    .flat()
    .find((p) => p.name === name)

  const tierColors: Record<string, string> = {
    S: "#ef4444", A: "#f97316", B: "#eab308", C: "#22c55e", X: "#06b6d4",
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        <PokemonHex name={name} rarity={build.rarity} size={80} tooltip={false} />
        <span className="font-display text-2xl font-bold">{name}</span>
        <div className="flex gap-2">
          <span
            className="font-display text-sm font-bold px-2 py-0.5 rounded"
            style={{
              color: tierColors[build.tier] ?? "#e8eaf0",
              border: `1px solid ${tierColors[build.tier] ?? "#e8eaf0"}40`,
              backgroundColor: `${tierColors[build.tier] ?? "#e8eaf0"}15`,
            }}
          >
            {build.tier} TIER
          </span>
          <span className="text-sm px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-display uppercase">
            {build.role}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {build.synergies.map((s) => (
            <SynergyTag key={s} name={s} small />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide font-display mb-2">
            Best Items
          </h4>
          <div className="flex flex-wrap gap-2">
            {build.bestItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border"
                style={{
                  backgroundColor: `${item.color}20`,
                  borderColor: `${item.color}60`,
                  color: "#e8eaf0",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {build.altItems.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide font-display mb-2">
              Alt Items
            </h4>
            <div className="flex flex-wrap gap-2">
              {build.altItems.map((item, idx) => (
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

        <div className="rounded-lg bg-secondary/40 border border-border px-4 py-3">
          <p className="text-sm text-foreground/80 italic">{build.notes}</p>
        </div>
      </div>
    </div>
  )
}
