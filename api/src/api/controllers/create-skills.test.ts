import { Request, Response } from "express";
import { expect } from "chai";
import sinon from "sinon";
import { AppServices } from "app/app-services";
import { MockAppServicesWithOneMethod } from "app/utils/mocks";

import { createSkillController } from "./create-skill";

type TSkill = {
  skillId: number;
  name: string;
  rate: number;
  updatedAt: Date;
}

type TSkillInsertData = Omit<TSkill, "skillId" | "updatedAt">;

const validSkillData = { name: "andrezj", rate: 5 };
const createdSkill = {
  skillId: 7,
  name: "andrezj",
  rate: 5,
  updatedAt: new Date("2025-09-15T06:49:57.643Z"),
};

const makeContext = () => {
  const sendStub = sinon.stub();
  const statusStub = sinon.stub().returns({ send: sendStub });

  const app: Partial<MockAppServicesWithOneMethod<"insert">> = {
    storages: {
      skillsStorage: { insert: sinon.stub<[TSkillInsertData], Promise<TSkill>>() },
    },
  };

  const req: Partial<Request> = { body: { ...validSkillData } };
  const res: Partial<Response> & { statusStub: sinon.SinonStub; sendStub: sinon.SinonStub } = {
    status: statusStub,
    send: sendStub,
    statusStub,
    sendStub,
  };

  return { app, req, res };
};

describe("createSkillController", () => {
  afterEach(() => sinon.restore());

  it("should create a skill with valid data", async () => {
    const { app, req, res } = makeContext();
    const controller = createSkillController(app as AppServices);

    (app!.storages!.skillsStorage.insert as sinon.SinonStub).resolves(createdSkill);

    await controller(req as Request, res as Response);

    expect(app!.storages!.skillsStorage.insert).to.have.been.calledWith(validSkillData);
    expect(res!.statusStub).to.have.been.calledWith(200);
    expect(res!.sendStub).to.have.been.calledWith({
      ...createdSkill,
      updatedAt: createdSkill.updatedAt.toISOString(),
    });
  });

  [11, -1].forEach(rate => {
    it(`should throw error if rate = ${rate}`, async () => {
      const { app, req, res } = makeContext();
      req!.body.rate = rate;
      const controller = createSkillController(app as AppServices);

      try {
        await controller(req as Request, res as Response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          expect(err.message).to.equal("Invalid skill rate");
        } else {
          throw err;
        }
      }

      expect(app!.storages!.skillsStorage.insert).to.not.have.been.called;
    });
  });
});
