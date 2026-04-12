import { useMemo, useState } from "react";
import { SkillCard } from "../../components/SkillCard";
import { Summary } from "../../components/Summary";
import {
  DEFAULT_HERO_MEMENTO,
  getMementoSummary,
  initialSkillLevels,
} from "../../utils/mementoCalculator";

export function CalculadoraMementos() {
  const [levels, setLevels] = useState(() => initialSkillLevels());
  const [heroUnlocked, setHeroUnlocked] = useState(true);

  const summary = useMemo(
    () => getMementoSummary(levels, heroUnlocked, DEFAULT_HERO_MEMENTO),
    [levels, heroUnlocked],
  );

  const setSkillLevel = (index, value) => {
    setLevels((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div className="page-surface flex flex-col gap-8">
      <Summary
        grandTotal={summary.grandTotal}
        remainingTotal={summary.remainingTotal}
        heroUnlocked={heroUnlocked}
        onHeroUnlockedChange={setHeroUnlocked}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {summary.current.map((lv, i) => (
          <SkillCard
            key={i}
            skillIndex={i}
            level={lv}
            remainingForSkill={summary.perSkillRemaining[i]}
            onLevelChange={(v) => setSkillLevel(i, v)}
            config={DEFAULT_HERO_MEMENTO}
          />
        ))}
      </div>
    </div>
  );
}
