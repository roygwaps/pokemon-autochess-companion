import { cn } from "@/lib/utils"

const SYNERGY_CLASS: Record<string, string> = {
  Dragon: "synergy-dragon",
  Psychic: "synergy-psychic",
  Water: "synergy-water",
  Fire: "synergy-fire",
  Fighting: "synergy-fighting",
  Electric: "synergy-electric",
  Ground: "synergy-ground",
  Rock: "synergy-rock",
  Dark: "synergy-dark",
  Ghost: "synergy-ghost",
  Normal: "synergy-normal",
  Flying: "synergy-flying",
  Ice: "synergy-ice",
  Poison: "synergy-poison",
  Grass: "synergy-grass",
  Field: "synergy-field",
  Bug: "synergy-bug",
}

interface SynergyTagProps {
  name: string
  count?: number
  small?: boolean
}

export function SynergyTag({ name, count, small }: SynergyTagProps) {
  const cls = SYNERGY_CLASS[name] ?? "bg-secondary text-secondary-foreground"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded font-display font-semibold uppercase tracking-wide",
        small ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs",
        cls
      )}
    >
      {name}
      {count !== undefined && <span className="opacity-80">x{count}</span>}
    </span>
  )
}
