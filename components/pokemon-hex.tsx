"use client"

import { useState } from "react"
import { getPokemonImage } from "@/lib/use-game-data"

const RARITY_COLORS: Record<string, string> = {
  common: "#9ca3af",
  uncommon: "#22c55e",
  rare: "#3b82f6",
  epic: "#a855f7",
  ultra: "#f59e0b",
}

interface PokemonHexProps {
  name: string
  rarity: string
  size?: number
  isCarry?: boolean
  isSelected?: boolean
  onClick?: () => void
  tooltip?: boolean
  role?: string
  tier?: string
}

export function PokemonHex({
  name,
  rarity,
  size = 60,
  isCarry = false,
  isSelected = false,
  onClick,
  tooltip = true,
  role,
  tier,
}: PokemonHexProps) {
  const [imgError, setImgError] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const rarityColor = RARITY_COLORS[rarity] ?? "#9ca3af"
  const outerSize = size + 8

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      style={{ width: outerSize, height: outerSize }}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Rarity glow ring */}
      <div
        className="absolute hex-clip transition-all duration-200 group-hover:scale-110"
        style={{
          width: outerSize,
          height: outerSize,
          backgroundColor: rarityColor,
          boxShadow: isSelected
            ? `0 0 16px 4px ${rarityColor}80`
            : `0 0 8px 1px ${rarityColor}40`,
        }}
      />
      {/* Inner hex */}
      <div
        className="absolute hex-clip overflow-hidden flex items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: "#0f1118",
          top: 4,
          left: 4,
        }}
      >
        {imgError ? (
          <span className="text-xs font-bold text-muted-foreground">{name.slice(0, 3)}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getPokemonImage(name)}
            alt={name}
            width={size - 8}
            height={size - 8}
            style={{ objectFit: "contain", imageRendering: "pixelated" }}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Carry crown */}
      {isCarry && (
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs z-10"
          style={{ color: "#c89b3c" }}
        >
          ★
        </div>
      )}

      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          style={{ minWidth: 90 }}
        >
          <div className="bg-card border border-border rounded px-2 py-1 text-center shadow-lg whitespace-nowrap">
            <p className="text-xs font-bold font-display uppercase tracking-wide" style={{ color: rarityColor }}>
              {name}
            </p>
            {(role || tier) && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {tier && <span className="mr-1">{tier}</span>}
                {role && <span>{role}</span>}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
