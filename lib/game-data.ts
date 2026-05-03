// Game data extracted from Pokemon Auto Chess
// This file contains the core data needed for the companion app

import type { Synergy } from "./types";

// Base item components
export const ItemComponents = [
  "FOSSIL_STONE",
  "TWISTED_SPOON",
  "MYSTIC_WATER",
  "MAGNET",
  "BLACK_GLASSES",
  "MIRACLE_SEED",
  "NEVER_MELT_ICE",
  "CHARCOAL",
  "HEART_SCALE",
  "SILK_SCARF",
] as const;

// Item recipes - result: [component1, component2]
export const ItemRecipes: Record<string, [string, string]> = {
  // Fossil Stone combinations
  OLD_AMBER: ["FOSSIL_STONE", "FOSSIL_STONE"],
  DAWN_STONE: ["FOSSIL_STONE", "TWISTED_SPOON"],
  WATER_STONE: ["FOSSIL_STONE", "MYSTIC_WATER"],
  THUNDER_STONE: ["FOSSIL_STONE", "MAGNET"],
  FIRE_STONE: ["FOSSIL_STONE", "CHARCOAL"],
  MOON_STONE: ["FOSSIL_STONE", "HEART_SCALE"],
  DUSK_STONE: ["FOSSIL_STONE", "BLACK_GLASSES"],
  LEAF_STONE: ["FOSSIL_STONE", "MIRACLE_SEED"],
  ICE_STONE: ["FOSSIL_STONE", "NEVER_MELT_ICE"],
  
  // Twisted Spoon combinations
  CHOICE_SPECS: ["TWISTED_SPOON", "TWISTED_SPOON"],
  SOUL_DEW: ["TWISTED_SPOON", "MYSTIC_WATER"],
  UPGRADE: ["TWISTED_SPOON", "MAGNET"],
  REAPER_CLOTH: ["TWISTED_SPOON", "BLACK_GLASSES"],
  ABILITY_SHIELD: ["TWISTED_SPOON", "MIRACLE_SEED"],
  POWER_LENS: ["TWISTED_SPOON", "NEVER_MELT_ICE"],
  POKEMONOMICON: ["TWISTED_SPOON", "CHARCOAL"],
  HEAVY_DUTY_BOOTS: ["TWISTED_SPOON", "HEART_SCALE"],
  
  // Mystic Water combinations
  AQUA_EGG: ["MYSTIC_WATER", "MYSTIC_WATER"],
  BLUE_ORB: ["MYSTIC_WATER", "MAGNET"],
  SCOPE_LENS: ["MYSTIC_WATER", "BLACK_GLASSES"],
  STAR_DUST: ["MYSTIC_WATER", "NEVER_MELT_ICE"],
  GREEN_ORB: ["MYSTIC_WATER", "MIRACLE_SEED"],
  DEEP_SEA_TOOTH: ["MYSTIC_WATER", "CHARCOAL"],
  SHINY_CHARM: ["MYSTIC_WATER", "HEART_SCALE"],
  
  // Magnet combinations
  XRAY_VISION: ["MAGNET", "MAGNET"],
  RAZOR_FANG: ["MAGNET", "BLACK_GLASSES"],
  GRACIDEA_FLOWER: ["MAGNET", "MIRACLE_SEED"],
  LOADED_DICE: ["MAGNET", "NEVER_MELT_ICE"],
  PUNCHING_GLOVE: ["MAGNET", "CHARCOAL"],
  MUSCLE_BAND: ["MAGNET", "HEART_SCALE"],
  
  // Black Glasses combinations
  WONDER_BOX: ["BLACK_GLASSES", "BLACK_GLASSES"],
  SMOKE_BALL: ["BLACK_GLASSES", "MIRACLE_SEED"],
  WIDE_LENS: ["BLACK_GLASSES", "NEVER_MELT_ICE"],
  RAZOR_CLAW: ["BLACK_GLASSES", "CHARCOAL"],
  SAFETY_GOGGLES: ["BLACK_GLASSES", "HEART_SCALE"],
  
  // Miracle Seed combinations
  KINGS_ROCK: ["MIRACLE_SEED", "MIRACLE_SEED"],
  STICKY_BARB: ["MIRACLE_SEED", "HEART_SCALE"],
  PROTECTIVE_PADS: ["MIRACLE_SEED", "CHARCOAL"],
  MAX_REVIVE: ["MIRACLE_SEED", "NEVER_MELT_ICE"],
  
  // Never Melt Ice combinations
  ASSAULT_VEST: ["NEVER_MELT_ICE", "NEVER_MELT_ICE"],
  SHELL_BELL: ["NEVER_MELT_ICE", "CHARCOAL"],
  POKE_DOLL: ["NEVER_MELT_ICE", "HEART_SCALE"],
  
  // Charcoal combinations
  RED_ORB: ["CHARCOAL", "CHARCOAL"],
  FLAME_ORB: ["CHARCOAL", "HEART_SCALE"],
  
  // Heart Scale combinations
  ROCKY_HELMET: ["HEART_SCALE", "HEART_SCALE"],
  
  // Silk Scarf combinations (Normal synergy items)
  FRIEND_BOW: ["SILK_SCARF", "FOSSIL_STONE"],
  BLACK_BELT: ["SILK_SCARF", "BLACK_GLASSES"],
  MACH_RIBBON: ["SILK_SCARF", "MAGNET"],
  EXPLOSIVE_BAND: ["SILK_SCARF", "CHARCOAL"],
  TWIST_BAND: ["SILK_SCARF", "NEVER_MELT_ICE"],
  LUCKY_RIBBON: ["SILK_SCARF", "TWISTED_SPOON"],
  BIG_EATER_BELT: ["SILK_SCARF", "MIRACLE_SEED"],
  COVER_BAND: ["SILK_SCARF", "HEART_SCALE"],
  EFFICIENT_BANDANNA: ["SILK_SCARF", "MYSTIC_WATER"],
  NULLIFY_BANDANNA: ["SILK_SCARF", "SILK_SCARF"],
};

// Item descriptions
export const ItemDescriptions: Record<string, string> = {
  // Components
  FOSSIL_STONE: "A mysterious stone containing ancient power. Grants +1 Fossil synergy.",
  TWISTED_SPOON: "A spoon imbued with psychic power. Grants +1 Psychic synergy.",
  MYSTIC_WATER: "Water infused with mystical energy. Grants +1 Water synergy.",
  MAGNET: "A powerful magnet that attracts electricity. Grants +1 Electric synergy.",
  BLACK_GLASSES: "Dark-tinted glasses. Grants +1 Dark synergy.",
  MIRACLE_SEED: "A seed brimming with life force. Grants +1 Grass synergy.",
  NEVER_MELT_ICE: "Ice that never melts. Grants +1 Ice synergy.",
  CHARCOAL: "Burning charcoal that boosts Fire moves. Grants +1 Fire synergy.",
  HEART_SCALE: "A pretty scale. Grants +1 Fairy synergy.",
  SILK_SCARF: "A silky scarf. Required for Normal synergy items.",
  
  // Craftable items
  OLD_AMBER: "Ancient amber containing DNA. +2 Fossil synergy.",
  DAWN_STONE: "A stone that evolves certain Pokemon. +1 Psychic synergy.",
  WATER_STONE: "A stone that evolves certain Pokemon. +1 Water synergy.",
  THUNDER_STONE: "A stone that evolves certain Pokemon. +1 Electric synergy.",
  FIRE_STONE: "A stone that evolves certain Pokemon. +1 Fire synergy.",
  MOON_STONE: "A stone that evolves certain Pokemon. +1 Fairy synergy.",
  DUSK_STONE: "A stone that evolves certain Pokemon. +1 Dark synergy.",
  LEAF_STONE: "A stone that evolves certain Pokemon. +1 Grass synergy.",
  ICE_STONE: "A stone that evolves certain Pokemon. +1 Ice synergy.",
  CHOICE_SPECS: "+50% AP, but only your ability deals damage.",
  SOUL_DEW: "Holder gains 30 AP and heals 2% max HP when hitting with ability.",
  UPGRADE: "Holder gains 20% Attack Speed and 20 AP.",
  REAPER_CLOTH: "Holder has +30% crit chance. Crits deal bonus true damage.",
  ABILITY_SHIELD: "Holder is immune to AP reduction and ability-blocking effects.",
  POWER_LENS: "Holder's abilities ignore 30% of target's Special Defense.",
  POKEMONOMICON: "Abilities burn and wound targets.",
  HEAVY_DUTY_BOOTS: "Holder is immune to ground-based effects and traps.",
  AQUA_EGG: "When holder drops below 30% HP, heal for 50% max HP (once per fight).",
  BLUE_ORB: "Summons rain at fight start. Holder gains +20 AP.",
  SCOPE_LENS: "+25% crit chance. Abilities can crit.",
  STAR_DUST: "+20 DEF and +20 SPE_DEF.",
  GREEN_ORB: "Summons terrain at fight start based on highest synergy.",
  DEEP_SEA_TOOTH: "+40 ATK when holder is below 50% HP.",
  SHINY_CHARM: "Increases chance of finding shiny Pokemon.",
  XRAY_VISION: "Holder's attacks reveal and reduce target's defense.",
  RAZOR_FANG: "+30% crit chance. Crits apply Wound.",
  GRACIDEA_FLOWER: "Holder heals nearby allies when using ability.",
  LOADED_DICE: "Holder's multi-hit abilities always hit max times.",
  PUNCHING_GLOVE: "+30% ATK. Punching moves deal bonus damage.",
  MUSCLE_BAND: "+35% ATK. Attacks deal bonus damage equal to target's max HP.",
  WONDER_BOX: "At round start, gain a random item component.",
  SMOKE_BALL: "When holder takes damage, has a chance to Blind attacker.",
  WIDE_LENS: "Holder's attacks and abilities never miss.",
  RAZOR_CLAW: "+30% crit chance. +20% crit damage.",
  SAFETY_GOGGLES: "Immune to weather and powder effects.",
  KINGS_ROCK: "Attacks have 20% chance to Flinch target.",
  STICKY_BARB: "Deals damage to attackers. Transfers to attacker on death.",
  PROTECTIVE_PADS: "Immune to contact-based effects.",
  MAX_REVIVE: "Once per fight, revive with 50% HP after being KO'd.",
  ASSAULT_VEST: "+50 SPE_DEF. Cannot use abilities.",
  SHELL_BELL: "Heal 15% of damage dealt.",
  POKE_DOLL: "Holder cannot be targeted until they attack.",
  RED_ORB: "Summons sun at fight start. Holder gains +40% ATK.",
  FLAME_ORB: "Burns the holder but greatly increases ATK.",
  ROCKY_HELMET: "Deals damage to attackers equal to 15% of their ATK.",
  FRIEND_BOW: "+1 Normal synergy. Increases friendship with holder.",
  BLACK_BELT: "+1 Fighting synergy. +20% damage to higher HP targets.",
  MACH_RIBBON: "+20% Attack Speed at fight start.",
  EXPLOSIVE_BAND: "Attacks deal splash damage.",
  TWIST_BAND: "Holder's ability affects additional targets.",
  LUCKY_RIBBON: "Holder has increased item drop chance.",
  BIG_EATER_BELT: "Holder can eat two dishes. +1 Gourmet synergy.",
  COVER_BAND: "+30 DEF when HP is above 50%.",
  EFFICIENT_BANDANNA: "Abilities cost 20% less PP.",
  NULLIFY_BANDANNA: "Holder is immune to stat debuffs.",
};

// Tools (from Artificial synergy)
export const Tools = [
  "LIGHT_BALL",
  "PROTECTOR",
  "DRAGON_SCALE",
  "METAL_COAT",
  "AIR_BALLOON",
  "MACHO_BRACE",
  "METRONOME",
  "EXPLORER_KIT",
  "SPELL_TAG",
  "SHED_SHELL",
  "BERSERK_GENE",
  "SURFBOARD",
  "COOKING_POT",
  "RUNNING_SHOES",
  "INCENSE",
  "ELECTIRIZER",
  "MAGMARIZER",
  "POKERUS_VIAL",
  "MAX_ELIXIR",
  "EXP_SHARE",
  "TERRAIN_EXTENDER",
] as const;

export const ToolDescriptions: Record<string, string> = {
  LIGHT_BALL: "+1 Light synergy. Doubles Pikachu's stats.",
  PROTECTOR: "+1 Rock synergy. +40 DEF.",
  DRAGON_SCALE: "+1 Dragon synergy. +30 DEF and SPE_DEF.",
  METAL_COAT: "+1 Steel synergy. +25 DEF.",
  AIR_BALLOON: "+1 Flying synergy. Immune to Ground attacks until hit.",
  MACHO_BRACE: "+1 Fighting synergy. +30% ATK but -20% Speed.",
  METRONOME: "+1 Sound synergy. Each consecutive ability use deals +15% damage.",
  EXPLORER_KIT: "+1 Ground synergy. Reveals buried items.",
  SPELL_TAG: "+1 Ghost synergy. +30% damage to full HP targets.",
  SHED_SHELL: "+1 Bug synergy. Cannot be trapped or blocked.",
  BERSERK_GENE: "+1 Monster synergy. Confuses holder but massively boosts ATK.",
  SURFBOARD: "+1 Aquatic synergy. Holder can move over water.",
  COOKING_POT: "+1 Gourmet synergy. Can cook dishes.",
  RUNNING_SHOES: "+1 Field synergy. +30% Speed at fight start.",
  INCENSE: "+1 Flora synergy. Nearby allies heal each turn.",
  ELECTIRIZER: "+1 Electric synergy. Evolves Electabuzz.",
  MAGMARIZER: "+1 Fire synergy. Evolves Magmar.",
  POKERUS_VIAL: "+1 Poison synergy. Holder spreads Pokerus (XP boost).",
  MAX_ELIXIR: "Restore all PP once when holder reaches 0 PP.",
  EXP_SHARE: "Holder gains XP when nearby allies defeat enemies.",
  TERRAIN_EXTENDER: "Terrain effects last 50% longer.",
};

// Shiny items (from fighting shiny teams)
export const ShinyItems = [
  "DYNAMAX_BAND",
  "SHINY_STONE",
  "RARE_CANDY",
  "EVIOLITE",
  "WHITE_FLUTE",
  "GOLD_BOTTLE_CAP",
  "ABSORB_BULB",
  "SACRED_ASH",
  "COMET_SHARD",
  "REPEAT_BALL",
  "GOLD_BOW",
  "RED_SCALE",
] as const;

export const ShinyItemDescriptions: Record<string, string> = {
  DYNAMAX_BAND: "Holder can Dynamax, becoming huge with boosted HP.",
  SHINY_STONE: "+1 Light synergy. Evolves certain Pokemon.",
  RARE_CANDY: "Instantly level up the holder by 1.",
  EVIOLITE: "+50% DEF and SPE_DEF if holder can still evolve.",
  WHITE_FLUTE: "Attract additional wild Pokemon to your team.",
  GOLD_BOTTLE_CAP: "Maximize all of holder's stats.",
  ABSORB_BULB: "When hit by Water move, gain +20 AP.",
  SACRED_ASH: "Revive all fainted team members once per game.",
  COMET_SHARD: "Sell for a large amount of gold.",
  REPEAT_BALL: "Higher catch rate on Pokemon you've owned before.",
  GOLD_BOW: "Holder doesn't count toward team size limit.",
  RED_SCALE: "A rare scale from a red Gyarados. Very valuable.",
};

// Berries (from Grass synergy)
export const Berries = [
  "AGUAV_BERRY",
  "APICOT_BERRY",
  "ASPEAR_BERRY",
  "BABIRI_BERRY",
  "CHERI_BERRY",
  "CHESTO_BERRY",
  "GANLON_BERRY",
  "JABOCA_BERRY",
  "LANSAT_BERRY",
  "LEPPA_BERRY",
  "LIECHI_BERRY",
  "LUM_BERRY",
  "ORAN_BERRY",
  "PECHA_BERRY",
  "PERSIM_BERRY",
  "PETAYA_BERRY",
  "RAWST_BERRY",
  "ROWAP_BERRY",
  "SALAC_BERRY",
  "SITRUS_BERRY",
] as const;

export const BerryDescriptions: Record<string, string> = {
  AGUAV_BERRY: "Restores HP when below 25% HP. May confuse if nature dislikes.",
  APICOT_BERRY: "Raises SPE_DEF when HP drops below 25%.",
  ASPEAR_BERRY: "Cures Freeze status.",
  BABIRI_BERRY: "Reduces super-effective Steel damage once.",
  CHERI_BERRY: "Cures Paralysis status.",
  CHESTO_BERRY: "Cures Sleep status.",
  GANLON_BERRY: "Raises DEF when HP drops below 25%.",
  JABOCA_BERRY: "Damages attacker when hit by physical move.",
  LANSAT_BERRY: "Raises crit rate when HP drops below 25%.",
  LEPPA_BERRY: "Restores 10 PP when PP reaches 0.",
  LIECHI_BERRY: "Raises ATK when HP drops below 25%.",
  LUM_BERRY: "Cures any status condition.",
  ORAN_BERRY: "Restores 10 HP when below 50% HP.",
  PECHA_BERRY: "Cures Poison status.",
  PERSIM_BERRY: "Cures Confusion status.",
  PETAYA_BERRY: "Raises AP when HP drops below 25%.",
  RAWST_BERRY: "Cures Burn status.",
  ROWAP_BERRY: "Damages attacker when hit by special move.",
  SALAC_BERRY: "Raises Speed when HP drops below 25%.",
  SITRUS_BERRY: "Restores 25% max HP when below 50% HP.",
};

// Synergy colors for UI
export const SynergyColors: Record<Synergy, string> = {
  NORMAL: "#A8A878",
  FLYING: "#A890F0",
  FIELD: "#E0C068",
  DARK: "#705848",
  GROUND: "#E0C068",
  PSYCHIC: "#F85888",
  GRASS: "#78C850",
  BUG: "#A8B820",
  WATER: "#6890F0",
  AQUATIC: "#4FC3F7",
  POISON: "#A040A0",
  FAIRY: "#EE99AC",
  FIGHTING: "#C03028",
  FIRE: "#F08030",
  GHOST: "#705898",
  ROCK: "#B8A038",
  MONSTER: "#7B68EE",
  AMORPHOUS: "#9966CC",
  WILD: "#228B22",
  SOUND: "#8B4513",
  FLORA: "#90EE90",
  STEEL: "#B8B8D0",
  ELECTRIC: "#F8D030",
  ICE: "#98D8D8",
  BABY: "#FFB6C1",
  HUMAN: "#DEB887",
  DRAGON: "#7038F8",
  LIGHT: "#FFD700",
  GOURMET: "#D2691E",
  FOSSIL: "#8B7355",
  ARTIFICIAL: "#A9A9A9",
};

// Format item name for display
export function formatItemName(item: string): string {
  return item
    .split("_")
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

// Get items that a component builds into
export function getBuildsInto(component: string): { item: string; recipe: [string, string] }[] {
  return Object.entries(ItemRecipes)
    .filter(([_, recipe]) => recipe.includes(component))
    .map(([item, recipe]) => ({ item, recipe }));
}

// Get item category
export function getItemCategory(item: string): string {
  if (ItemComponents.includes(item as typeof ItemComponents[number])) return "Component";
  if (ItemRecipes[item]) return "Craftable";
  if (Tools.includes(item as typeof Tools[number])) return "Tool";
  if (ShinyItems.includes(item as typeof ShinyItems[number])) return "Shiny";
  if (Berries.includes(item as typeof Berries[number])) return "Berry";
  return "Special";
}
