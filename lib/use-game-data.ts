"use client"

import { useEffect, useState } from "react"

export interface PokemonMeta {
  name: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "ultra"
  role: string
  synergies: string[]
}

export interface MetaData {
  S: PokemonMeta[]
  A: PokemonMeta[]
  B: PokemonMeta[]
  C: PokemonMeta[]
  X: PokemonMeta[]
}

export interface ItemBuild {
  name: string
  color: string
}

export interface BuildEntry {
  tier: string
  role: string
  rarity: string
  synergies: string[]
  bestItems: ItemBuild[]
  altItems: ItemBuild[]
  notes: string
  comp: string | null
}

export type BuildsData = Record<string, BuildEntry>

export interface CompSynergy {
  name: string
  count: number
}

export interface CompEntry {
  id: string
  name: string
  tier: string
  carry: string
  units: string[]
  earlyGame: string[]
  synergies: CompSynergy[]
  notes: string
}

export interface ShopOdds {
  level: number
  common: number
  uncommon: number
  rare: number
  epic: number
  ultra: number
}

export interface MechanicsData {
  shopOdds: ShopOdds[]
  poolSizes: Record<string, number>
  xpToLevel: { level: number; xp: number }[]
  experienceByRank: { rank: number; xp: number }[]
}

function useJsonData<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [path])

  return { data, loading, error }
}

export function useMetaData() {
  return useJsonData<MetaData>("/data/meta.json")
}

export function useBuildsData() {
  return useJsonData<BuildsData>("/data/builds.json")
}

export function useCompsData() {
  return useJsonData<CompEntry[]>("/data/comps.json")
}

export function useMechanicsData() {
  return useJsonData<MechanicsData>("/data/mechanics.json")
}

export function getPokemonImage(name: string): string {
  return `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`
}
