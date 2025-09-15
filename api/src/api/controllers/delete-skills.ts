import { Request, Response } from "express";
import { AppServices } from "app/app-services";

export const deleteSkillController = (app: AppServices) => {
  return async (req: Request<{ skillId?: string }, NonNullable<unknown>, NonNullable<unknown>, NonNullable<unknown>>, res: Response) => {
    const { skillId } = req.params;
    const id = Number(skillId);

    if (isNaN(id) || id <= 0) {
      return res.status(400).send({ message: "Invalid skillId" });
    }

    try {
      await app.storages.skillsStorage.delete(id);
    } catch (err: any) {
      return res.status(404).send({ message: err.message || `Skill with id ${id} not found` });
    }

    return res.status(200).send({ message: `Skill with id ${id} deleted successfully` });
  };
};