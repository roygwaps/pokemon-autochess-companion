"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Star } from "lucide-react"
import { useCompsData, getPokemonImage, type CompEntry } from "@/lib/use-game-data"
import { SynergyTag } from "./synergy-tag"
import { cn } from "@/lib/utils"

const TIER_COLORS: Record<string, string> = {
  S: "#ef4444",
  A: "#f97316",
  B: "#eab308",
  C: "#22c55e",
  X: "#06b6d4",
}

interface TabCompsProps {
  onSelectPokemon?: (name: string) => void
  searchQuery: string
}

export function TabComps({ onSelectPokemon, searchQuery }: TabCompsProps) {
  const { data: comps, loading } = useCompsData()
  const [expanded, setExpanded] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-lg bg-card animate-pulse" />
        ))}
      </div>
    )
  }

  if (!comps) return <div className="text-center py-12 text-muted-foreground">Failed to load comps.</div>

  const q = searchQuery.toLowerCase()
  const filtered = q
    ? comps.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.units.some((u) => u.toLowerCase().includes(q)) ||
          c.synergies.some((s) => s.name.toLowerCase().includes(q))
      )
    : comps

  return (
    <div className="space-y-3">
      {filtered.map((comp, i) => {
        const isOpen = expanded === comp.id
        const color = TIER_COLORS[comp.tier] ?? "#e8eaf0"

        return (
          <div
            key={comp.id}
            className="rounded-lg border border-border overflow-hidden animate-fade-in-up transition-all"
            style={{
              animationDelay: `${i * 60}ms`,
              boxShadow: isOpen ? `0 0 24px ${color}20` : undefined,
              borderColor: isOpen ? `${color}40` : undefined,
            }}
          >
            {/* Header row */}
            <button
              className="w-full flex items-center gap-4 p-4 bg-card hover:bg-secondary/40 transition-colors text-left"
              onClick={() => setExpanded(isOpen ? null : comp.id)}
            >
              {/* Tier badge */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display text-xl font-bold"
                style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
              >
                {comp.tier}
              </div>

              {/* Comp name */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold tracking-wide">{comp.name}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {comp.synergies.map((s) => (
                    <SynergyTag key={s.name} name={s.name} count={s.count} small />
                  ))}
                </div>
              </div>

              {/* Unit previews */}
              <div className="hidden sm:flex items-center gap-1 mr-4">
                {comp.units.slice(0, 5).map((unit) => (
                  <UnitAvatar key={unit} name={unit} isCarry={unit === comp.carry} size={36} />
                ))}
                {comp.units.length > 5 && (
                  <span className="text-xs text-muted-foreground ml-1">+{comp.units.length - 5}</span>
                )}
              </div>

              {/* Expand icon */}
              <div className="flex-shrink-0 text-muted-foreground">
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {/* Expanded detail */}
            {isOpen && (
              <div className="border-t border-border bg-muted/30 p-5 space-y-5 animate-fade-in-up">
                {/* Full unit list */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display mb-3">
                    Full Lineup
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {comp.units.map((unit) => (
                      <div
                        key={unit}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => onSelectPokemon?.(unit)}
                      >
                        <UnitAvatar name={unit} isCarry={unit === comp.carry} size={52} />
                        <span className="text-xs text-center group-hover:text-primary transition-colors font-medium">
                          {unit}
                        </span>
                        {unit === comp.carry && (
                          <span
                            className="text-xs font-display uppercase"
                            style={{ color: "#c89b3c" }}
                          >
                            Carry
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Early game transition */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display mb-3">
                    Early Game Units
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {comp.earlyGame.map((unit) => (
                      <div
                        key={unit}
                        className="flex items-center gap-2 rounded-lg bg-secondary/50 border border-border px-3 py-1.5 text-sm"
                      >
                        <UnitAvatar name={unit} isCarry={false} size={24} showImg />
                        <span>{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="rounded-lg bg-secondary/40 border border-border px-4 py-3">
                  <p className="text-sm text-foreground/80 italic">{comp.notes}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function UnitAvatar({
  name,
  isCarry,
  size,
  showImg = true,
}: {
  name: string
  isCarry: boolean
  size: number
  showImg?: boolean
}) {
  const [err, setErr] = useState(false)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className={cn(
          "w-full h-full rounded-full overflow-hidden border-2 flex items-center justify-center bg-muted",
          isCarry ? "border-yellow-500/80" : "border-border"
        )}
        style={isCarry ? { boxShadow: "0 0 8px rgba(234,179,8,0.4)" } : undefined}
      >
        {showImg && !err ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getPokemonImage(name)}
            alt={name}
            width={size}
            height={size}
            style={{ objectFit: "contain" }}
            onError={() => setErr(true)}
          />
        ) : (
          <span className="text-xs font-bold text-muted-foreground">{name.slice(0, 2)}</span>
        )}
      </div>
      {isCarry && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#c89b3c" }}>
          <Star size={9} fill="#08090d" stroke="none" />
        </div>
      )}
    </div>
  )
}
