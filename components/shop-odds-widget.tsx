"use client"

import { useState } from "react"
import { X, ChartBar as BarChart2 } from "lucide-react"
import { useMechanicsData } from "@/lib/use-game-data"
import { cn } from "@/lib/utils"

const RARITY_COLORS: Record<string, string> = {
  common: "#9ca3af",
  uncommon: "#22c55e",
  rare: "#3b82f6",
  epic: "#a855f7",
  ultra: "#f59e0b",
}

interface ShopOddsWidgetProps {
  onClose: () => void
}

export function ShopOddsWidget({ onClose }: ShopOddsWidgetProps) {
  const { data: mechanics, loading } = useMechanicsData()
  const [level, setLevel] = useState(5)

  const odds = mechanics?.shopOdds.find((o) => o.level === level)

  function rollsToFind3Star(rarity: string, pct: number): string {
    if (pct === 0) return "—"
    const pool = mechanics?.poolSizes[rarity] ?? 18
    // Expected rolls to see one copy: 1 / (chance_per_slot * 5_slots)
    const chancePerRoll = (pct / 100) * 5
    const rollsFor1 = 1 / chancePerRoll
    // 3-star needs 9 copies (3 at 1-star → 3 at 2-star → 1 at 3-star = 9 units)
    return `~${Math.round(rollsFor1 * 9)}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold">Shop Odds Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Level selector */}
          <div>
            <label className="text-xs font-display uppercase tracking-widest text-muted-foreground block mb-2">
              Level
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "w-10 h-10 rounded-lg font-display font-bold text-sm transition-all",
                    level === l
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Odds table */}
          {loading ? (
            <div className="h-32 bg-secondary/30 rounded-lg animate-pulse" />
          ) : odds ? (
            <div className="space-y-2">
              <h3 className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                Probabilities at Level {level}
              </h3>
              {(["common", "uncommon", "rare", "epic", "ultra"] as const).map((rarity) => {
                const pct = odds[rarity]
                const color = RARITY_COLORS[rarity]
                return (
                  <div key={rarity} className="flex items-center gap-3">
                    <span
                      className="w-20 text-xs font-display uppercase font-bold flex-shrink-0"
                      style={{ color }}
                    >
                      {rarity}
                    </span>
                    <div className="flex-1 h-5 bg-secondary rounded overflow-hidden relative">
                      <div
                        className="h-full rounded transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: `${color}60` }}
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-bold"
                        style={{ color: pct > 0 ? color : "#4a5568" }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <span className="w-12 text-xs text-right text-muted-foreground flex-shrink-0">
                      {rollsToFind3Star(rarity, pct)} rolls
                    </span>
                  </div>
                )
              })}
            </div>
          ) : null}

          {/* XP to level */}
          {mechanics && (
            <div>
              <h3 className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-2">
                XP Required for Level {level}
              </h3>
              <div className="rounded-lg bg-secondary/30 px-4 py-2.5 text-sm">
                {(() => {
                  const xpEntry = mechanics.xpToLevel.find((x) => x.level === level)
                  return xpEntry ? (
                    <span>
                      <span className="font-bold text-primary">{xpEntry.xp} XP</span>
                      <span className="text-muted-foreground"> total required</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Level 1 — no XP needed</span>
                  )
                })()}
              </div>
            </div>
          )}

          {/* Pool sizes */}
          <div>
            <h3 className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-2">
              Pool Sizes
            </h3>
            <div className="flex gap-2 flex-wrap">
              {mechanics &&
                Object.entries(mechanics.poolSizes).map(([rarity, size]) => (
                  <div
                    key={rarity}
                    className="flex items-center gap-1.5 rounded px-2.5 py-1 text-xs border"
                    style={{
                      color: RARITY_COLORS[rarity],
                      borderColor: `${RARITY_COLORS[rarity]}30`,
                      backgroundColor: `${RARITY_COLORS[rarity]}10`,
                    }}
                  >
                    <span className="font-display uppercase font-bold">{rarity}</span>
                    <span className="opacity-70">× {size}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
