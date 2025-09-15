import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { getTestApp } from "app/setup-integration-tests.test";

chai.use(chaiHttp);

const makeContext = async () => {
  const testApp = await getTestApp();
  const agent = chai.request.agent(testApp.app);
  return { testApp, agent };
};

describe("deleteSkillController", () => {
  it("should delete a skill by id", async () => {
    const { testApp, agent } = await makeContext();

    const createdSkill = await testApp.services.storages.skillsStorage.insert({
      name: "TypeScript",
      rate: 8,
    });

    const response = await agent.delete(`/skills/${createdSkill.skillId}`);
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property(
      "message",
      `Skill with id ${createdSkill.skillId} deleted successfully`
    );

    const skillsAfterDelete = await testApp.services.storages.skillsStorage.getAll();
    const deletedSkill = skillsAfterDelete.find(s => s.skillId === createdSkill.skillId);
    expect(deletedSkill).to.be.undefined;
  });

  it("should return error for invalid skillId", async () => {
    const { agent } = await makeContext();

    const response = await agent.delete("/skills/abc");
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property("message").that.includes("Invalid skillId");
  });

  it("should return error if skillId does not exist", async () => {
    const { agent } = await makeContext();

    const nonExistentId = 9999999;

    const response = await agent.delete(`/skills/${nonExistentId}`);
    expect(response.status).to.eq(404);
    expect(response.body)
      .to.have.property("message")
      .that.includes(`Skill with id ${nonExistentId} not found`);
  });
});