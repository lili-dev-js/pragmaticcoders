export interface TSkills extends TNewSkills {
  skillId: number;
  updatedAt: string;
}

export interface TNewSkills {
  name: string;
  rate: string;
}
