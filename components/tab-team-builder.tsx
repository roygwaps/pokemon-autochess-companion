"use client"

import { useState, useCallback } from "react"
import { X, Trash2 } from "lucide-react"
import { useMetaData, useBuildsData, getPokemonImage } from "@/lib/use-game-data"
import { SynergyTag } from "./synergy-tag"
import { cn } from "@/lib/utils"

interface TeamSlot {
  name: string | null
  rarity: string
}

const EMPTY_SLOT: TeamSlot = { name: null, rarity: "common" }
const MAX_SLOTS = 8

export function TabTeamBuilder() {
  const { data: meta } = useMetaData()
  const { data: builds } = useBuildsData()
  const [team, setTeam] = useState<TeamSlot[]>(Array(MAX_SLOTS).fill(null).map(() => ({ ...EMPTY_SLOT })))
  const [searchQuery, setSearchQuery] = useState("")
  const [dragOver, setDragOver] = useState<number | null>(null)
  const [draggingFrom, setDraggingFrom] = useState<"pool" | number | null>(null)
  const [draggingPokemon, setDraggingPokemon] = useState<string | null>(null)

  const allPokemon = meta
    ? [...meta.S, ...meta.A, ...meta.B, ...meta.C, ...meta.X]
    : []

  const poolPokemon = allPokemon.filter((p) =>
    searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const teamNames = team.map((s) => s.name).filter(Boolean) as string[]

  function addToTeam(name: string, rarity: string) {
    if (teamNames.includes(name)) return
    const emptyIdx = team.findIndex((s) => s.name === null)
    if (emptyIdx === -1) return
    const newTeam = [...team]
    newTeam[emptyIdx] = { name, rarity }
    setTeam(newTeam)
  }

  function removeFromSlot(idx: number) {
    const newTeam = [...team]
    newTeam[idx] = { ...EMPTY_SLOT }
    setTeam(newTeam)
  }

  function clearTeam() {
    setTeam(Array(MAX_SLOTS).fill(null).map(() => ({ ...EMPTY_SLOT })))
  }

  function handleDropOnSlot(idx: number) {
    if (!draggingPokemon) return
    const pokemon = allPokemon.find((p) => p.name === draggingPokemon)
    if (!pokemon) return

    const newTeam = [...team]

    if (typeof draggingFrom === "number") {
      // Slot → Slot swap
      const temp = newTeam[idx]
      newTeam[idx] = newTeam[draggingFrom]
      newTeam[draggingFrom] = temp
    } else {
      // Pool → Slot
      if (teamNames.includes(pokemon.name)) return
      if (newTeam[idx].name === null) {
        newTeam[idx] = { name: pokemon.name, rarity: pokemon.rarity }
      }
    }

    setTeam(newTeam)
    setDragOver(null)
    setDraggingFrom(null)
    setDraggingPokemon(null)
  }

  function handleDropOnPool() {
    if (typeof draggingFrom === "number") {
      removeFromSlot(draggingFrom)
    }
    setDragOver(null)
    setDraggingFrom(null)
    setDraggingPokemon(null)
  }

  // Calculate active synergies
  const synergyCount: Record<string, number> = {}
  for (const slot of team) {
    if (!slot.name) continue
    const build = builds?.[slot.name]
    if (!build) continue
    for (const syn of build.synergies) {
      synergyCount[syn] = (synergyCount[syn] ?? 0) + 1
    }
  }

  const SYNERGY_THRESHOLDS: Record<string, number[]> = {
    Dragon: [2, 4, 6],
    Psychic: [2, 4, 6],
    Water: [2, 4, 6],
    Fire: [2, 4, 6],
    Fighting: [2, 4],
    Electric: [2, 4],
    Ground: [2, 4],
    Rock: [2, 4],
    Dark: [2, 4],
    Ghost: [2, 4],
    Normal: [2, 4],
    Flying: [2, 4],
    Ice: [2, 4],
    Poison: [2, 4],
    Grass: [2, 4],
    Field: [2, 4],
  }

  const activeSynergies = Object.entries(synergyCount)
    .filter(([syn, count]) => {
      const thresholds = SYNERGY_THRESHOLDS[syn] ?? [2]
      return count >= thresholds[0]
    })
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pokemon Pool */}
        <div className="lg:w-72 flex-shrink-0 space-y-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Pokemon Pool
          </h3>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div
            className="grid grid-cols-4 gap-2 max-h-[420px] overflow-y-auto pr-1"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnPool}
          >
            {poolPokemon.map((p) => {
              const inTeam = teamNames.includes(p.name)
              return (
                <div
                  key={p.name}
                  draggable={!inTeam}
                  onDragStart={() => {
                    setDraggingFrom("pool")
                    setDraggingPokemon(p.name)
                  }}
                  onClick={() => !inTeam && addToTeam(p.name, p.rarity)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border p-1.5 transition-all",
                    inTeam
                      ? "opacity-30 cursor-default border-transparent"
                      : "cursor-pointer border-border hover:border-primary/50 hover:bg-secondary/50"
                  )}
                  title={p.name}
                >
                  <PoolHex name={p.name} rarity={p.rarity} />
                  <span className="text-xs text-center leading-tight truncate w-full text-center">
                    {p.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Slots + Synergies */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Your Team ({teamNames.length}/{MAX_SLOTS})
            </h3>
            <button
              onClick={clearTeam}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm border border-border bg-secondary/40 hover:bg-destructive/20 hover:border-destructive/40 hover:text-destructive transition-colors"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>

          {/* Team slots grid */}
          <div className="grid grid-cols-4 gap-3">
            {team.map((slot, idx) => (
              <div
                key={idx}
                className={cn(
                  "relative rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all",
                  dragOver === idx
                    ? "border-primary/80 bg-primary/10 scale-105"
                    : slot.name
                    ? "border-border bg-card/70"
                    : "border-border/50 bg-card/30"
                )}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(idx)
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => handleDropOnSlot(idx)}
              >
                {slot.name ? (
                  <>
                    <div
                      draggable
                      onDragStart={() => {
                        setDraggingFrom(idx)
                        setDraggingPokemon(slot.name)
                      }}
                      className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing p-2"
                    >
                      <PoolHex name={slot.name} rarity={slot.rarity} size={52} />
                      <span className="text-xs font-medium text-center leading-tight">{slot.name}</span>
                    </div>
                    <button
                      onClick={() => removeFromSlot(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-secondary hover:bg-destructive/80 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                    >
                      <X size={11} />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground/40 font-display uppercase">
                    {idx + 1}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Active Synergies */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Active Synergies
            </h3>
            {activeSynergies.length === 0 ? (
              <p className="text-sm text-muted-foreground/50 italic">Add Pokemon to activate synergies</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {activeSynergies.map(([syn, count]) => {
                  const thresholds = SYNERGY_THRESHOLDS[syn] ?? [2]
                  const maxThresh = [...thresholds].reverse().find((t) => count >= t) ?? thresholds[0]
                  return (
                    <div
                      key={syn}
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 border border-border bg-secondary/40"
                    >
                      <SynergyTag name={syn} count={count} small />
                      <span className="text-xs text-green-400 font-display font-bold">ACTIVE</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PoolHex({ name, rarity, size = 40 }: { name: string; rarity: string; size?: number }) {
  const [err, setErr] = useState(false)
  const RARITY_COLORS: Record<string, string> = {
    common: "#9ca3af", uncommon: "#22c55e", rare: "#3b82f6", epic: "#a855f7", ultra: "#f59e0b",
  }
  const color = RARITY_COLORS[rarity] ?? "#9ca3af"
  const outer = size + 6

  return (
    <div className="relative flex-shrink-0" style={{ width: outer, height: outer }}>
      <div
        className="absolute hex-clip"
        style={{ width: outer, height: outer, backgroundColor: color, opacity: 0.8 }}
      />
      <div
        className="absolute hex-clip overflow-hidden flex items-center justify-center bg-muted"
        style={{ width: size, height: size, top: 3, left: 3 }}
      >
        {err ? (
          <span className="text-xs font-bold text-muted-foreground">{name.slice(0, 2)}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getPokemonImage(name)}
            alt={name}
            width={size - 4}
            height={size - 4}
            style={{ objectFit: "contain" }}
            onError={() => setErr(true)}
          />
        )}
      </div>
    </div>
  )
}
