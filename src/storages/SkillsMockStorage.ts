import { SkillEntity } from "app/entities/SkillEntity";
import { SkillsStorage } from "app/storages/SkillsStorage";

export class SkillsMockStorage implements SkillsStorage {
  private skills: SkillEntity[] = [];

  async getAll(): Promise<SkillEntity[]> {
    return this.skills;
  }

  async insert(data: Omit<SkillEntity, "skillId" | "updatedAt">): Promise<SkillEntity> {
    const skillEntity = {
      skillId: parseInt(this.skills.length + "" + Date.now()),
      name: data.name,
      rate: data.rate,
      updatedAt: new Date(),
    };
    this.skills.push(skillEntity);
    return skillEntity;
  }

  async delete(skillId: number): Promise<void> {
    const index = this.skills.findIndex(s => s.skillId === skillId);
    if (index === -1) {
      throw new Error(`Skill with id ${skillId} not found`);
    }
    this.skills.splice(index, 1);
  }
}
