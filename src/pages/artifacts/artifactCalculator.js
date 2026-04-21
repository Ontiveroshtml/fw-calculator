export const ARTIFACT_STEEL_COSTS = [
  { color: "White", star: 0, tier: "White", steel: 0 },
  { color: "White", star: 1, tier: "White 1*", steel: 10 },
  { color: "Green", star: 0, tier: "Green", steel: 15 },
  { color: "Green", star: 1, tier: "Green 1*", steel: 30 },
  { color: "Green", star: 2, tier: "Green 2*", steel: 45 },
  { color: "Blue", star: 0, tier: "Blue", steel: 50 },
  { color: "Blue", star: 1, tier: "Blue 1*", steel: 100 },
  { color: "Blue", star: 2, tier: "Blue 2*", steel: 150 },
  { color: "Blue", star: 3, tier: "Blue 3*", steel: 200 },
  { color: "Purple", star: 0, tier: "Purple", steel: 250 },
  { color: "Purple", star: 1, tier: "Purple 1*", steel: 300 },
  { color: "Purple", star: 2, tier: "Purple 2*", steel: 350 },
  { color: "Purple", star: 3, tier: "Purple 3*", steel: 450 },
  { color: "Gold", star: 0, tier: "Gold", steel: 550 },
  { color: "Gold", star: 1, tier: "Gold 1*", steel: 600 },
  { color: "Gold", star: 2, tier: "Gold 2*", steel: 650 },
  { color: "Gold", star: 3, tier: "Gold 3*", steel: 650 },
  { color: "Red", star: 0, tier: "Red", steel: 700 },
];

export const ARTIFACT_COLORS = ["White", "Green", "Blue", "Purple", "Gold", "Red"];

export const ARTIFACT_STEEL_TOTAL = ARTIFACT_STEEL_COSTS.reduce((sum, item) => sum + item.steel, 0);

function getTierProgressFromBase(steelOwned) {
  let steel = Math.max(0, Math.floor(Number(steelOwned) || 0));
  let reachedIndex = -1;
  let nextIndex = 0;

  while (nextIndex < ARTIFACT_STEEL_COSTS.length && steel >= ARTIFACT_STEEL_COSTS[nextIndex].steel) {
    steel -= ARTIFACT_STEEL_COSTS[nextIndex].steel;
    reachedIndex = nextIndex;
    nextIndex += 1;
  }

  const reachedTier = reachedIndex >= 0 ? ARTIFACT_STEEL_COSTS[reachedIndex].tier : "Base";
  const nextTier = ARTIFACT_STEEL_COSTS[nextIndex]?.tier ?? "MAX";
  const steelForNextTier = ARTIFACT_STEEL_COSTS[nextIndex]?.steel ?? 0;

  return {
    reachedTier,
    nextTier,
    steelIntoNextTier: steel,
    steelForNextTier,
    isMaxed: nextTier === "MAX",
  };
}

function buildOverflowBreakdown(overflowSteel) {
  const safeOverflow = Math.max(0, Math.floor(Number(overflowSteel) || 0));
  const fullArtifacts = Math.floor(safeOverflow / ARTIFACT_STEEL_TOTAL);
  const remainder = safeOverflow % ARTIFACT_STEEL_TOTAL;
  const partial = getTierProgressFromBase(remainder);

  const steps = [];
  for (let i = 0; i < fullArtifacts; i++) {
    steps.push({ type: "full", reachedTier: "Red" });
  }
  if (remainder > 0) {
    steps.push({
      type: "partial",
      reachedTier: partial.reachedTier,
      steelRemaining: partial.steelIntoNextTier,
    });
  }

  return {
    fullArtifacts,
    partialReachedTier: remainder > 0 ? partial.reachedTier : null,
    remainderSteel: partial.steelIntoNextTier,
    steps,
  };
}

export function getArtifactSummary(currentTierIndex, steelOwned) {
  const idx = Math.max(0, Math.min(Number(currentTierIndex) || 0, ARTIFACT_STEEL_COSTS.length - 1));
  const safeSteel = Math.max(0, Math.floor(Number(steelOwned) || 0));
  const currentTier = ARTIFACT_STEEL_COSTS[idx].tier;
  const remainingToRed = ARTIFACT_STEEL_COSTS
    .slice(idx + 1)
    .reduce((sum, item) => sum + item.steel, 0);

  let reachedIndex = idx;
  let steelLeft = safeSteel;

  for (let i = idx + 1; i < ARTIFACT_STEEL_COSTS.length; i++) {
    if (steelLeft < ARTIFACT_STEEL_COSTS[i].steel) break;
    steelLeft -= ARTIFACT_STEEL_COSTS[i].steel;
    reachedIndex = i;
  }

  const reachedTier = ARTIFACT_STEEL_COSTS[reachedIndex].tier;
  const nextTier = ARTIFACT_STEEL_COSTS[reachedIndex + 1]?.tier ?? "MAX";
  const steelForNextTier = ARTIFACT_STEEL_COSTS[reachedIndex + 1]?.steel ?? 0;
  const steelIntoNextTier = nextTier === "MAX" ? 0 : steelLeft;
  const overflowAfterRed = Math.max(safeSteel - remainingToRed, 0);
  const overflowBreakdown =
    overflowAfterRed > 0 ? buildOverflowBreakdown(overflowAfterRed) : null;

  return {
    currentTier,
    reachedTier,
    nextTier,
    steelForNextTier,
    steelIntoNextTier,
    missingToNextTier: Math.max(steelForNextTier - steelIntoNextTier, 0),
    remainingToRed,
    missingToRed: Math.max(remainingToRed - safeSteel, 0),
    overflowAfterRed,
    overflowBreakdown,
  };
}
