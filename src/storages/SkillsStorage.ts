import { SkillEntity } from "app/entities/SkillEntity";

export type SkillsStorage = {
  getAll(): Promise<SkillEntity[]>;
  insert(data: Omit<SkillEntity, "skillId" | "updatedAt">): Promise<SkillEntity>;
  delete(skillId: number): Promise<void>;
}
