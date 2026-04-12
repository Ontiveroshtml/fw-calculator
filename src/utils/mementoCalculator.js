/**
 * Mementos / hero skill cost model.
 * Upgrades are applied in fixed order: skill 0 → 1 → 2 → 3, each from current to target level.
 * Row index = number of skills already at level 5 at the moment of payment.
 */

export const DEFAULT_HERO_MEMENTO = {
  id: "default",
  unlockCost: 10,
  skillCount: 4,
  minLevel: 1,
  maxLevel: 5,
  /** [skillsAt5WhenPaying][stepIndex]; stepIndex 0 = 1→2, … 3 = 4→5 */
  costTable: [
    [10, 10, 15, 15],
    [25, 30, 35, 40],
    [40, 45, 50, 55],
    [70, 75, 80, 85],
  ],
};

function clampSkillLevels(levels, config) {
  const { skillCount, minLevel, maxLevel } = config;
  return Array.from({ length: skillCount }, (_, i) => {
    const v = Number(levels[i]);
    if (!Number.isFinite(v)) return minLevel;
    return Math.min(maxLevel, Math.max(minLevel, Math.round(v)));
  });
}

/** @param {number[]} levels */
function countMaxed(levels) {
  return levels.filter((l) => l >= 5).length;
}

/**
 * Applies upgrades from `fromLevels` to `toLevels` in order: for each skill index 0..n-1,
 * raise that skill until it reaches toLevels[i]. Assumes toLevels[i] >= fromLevels[i].
 * @returns {{ total: number, perSkill: number[] }}
 */
export function computeMementoPath(fromLevels, toLevels, config = DEFAULT_HERO_MEMENTO) {
  const cfg = config;
  const from = clampSkillLevels(fromLevels, cfg);
  const to = clampSkillLevels(toLevels, cfg);
  const n = cfg.skillCount;
  const table = cfg.costTable;
  const perSkill = Array(n).fill(0);
  let total = 0;

  const state = [...from];

  for (let i = 0; i < n; i++) {
    while (state[i] < to[i]) {
      const maxedBefore = countMaxed(state);
      const row = Math.min(maxedBefore, table.length - 1);
      const stepIndex = state[i] - 1;
      const cost = table[row][stepIndex];
      total += cost;
      perSkill[i] += cost;
      state[i] += 1;
    }
  }

  return { total, perSkill };
}

export function initialSkillLevels(config = DEFAULT_HERO_MEMENTO) {
  return Array(config.skillCount).fill(config.minLevel);
}

export function maxSkillLevels(config = DEFAULT_HERO_MEMENTO) {
  return Array(config.skillCount).fill(config.maxLevel);
}

/**
 * Full summary for UI: totals, remaining, per-skill remaining.
 */
export function getMementoSummary(currentLevels, heroUnlocked, config = DEFAULT_HERO_MEMENTO) {
  const start = initialSkillLevels(config);
  const maxedState = maxSkillLevels(config);
  const current = clampSkillLevels(currentLevels, config);

  const skillsMaxTotal = computeMementoPath(start, maxedState, config).total;
  const unlock = config.unlockCost;
  const grandTotal = unlock + skillsMaxTotal;

  const remainingSkills = computeMementoPath(current, maxedState, config);
  const remainingUnlock = heroUnlocked ? 0 : unlock;
  const remainingTotal = remainingSkills.total + remainingUnlock;

  return {
    current,
    grandTotal,
    remainingTotal,
    perSkillRemaining: remainingSkills.perSkill,
    heroUnlocked,
  };
}
