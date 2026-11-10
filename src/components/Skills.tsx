import { RichText } from "@/components/RichText";
import type { SkillGroup } from "@/content/site";

interface SkillsProps {
  groups: SkillGroup[];
}

export function Skills({ groups }: SkillsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div
          key={group.category}
          className="space-y-2 rounded-xl border bg-card p-6"
        >
          <h3 className="font-semibold">{group.category}</h3>
          <p className="text-sm text-muted-foreground">
            <RichText text={group.items} />
          </p>
        </div>
      ))}
    </div>
  );
}
