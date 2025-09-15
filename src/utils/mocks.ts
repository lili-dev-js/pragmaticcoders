import { SkillsStorage } from "app/storages/SkillsStorage";
import { AppConfig } from "app/config";

export type MockAppServicesWithOneMethod <TMethodName extends keyof SkillsStorage > = {
  appConfig: AppConfig;
  storages: {
    skillsStorage: Pick<SkillsStorage, TMethodName>
  };
};
