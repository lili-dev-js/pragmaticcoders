import { Button, Center, Flex } from '@chakra-ui/react';
import DefaultTable from '../../components/defaultTable';
import { useEffect, useState } from 'react';
import { getSkills } from '../../api';
import { TSkills } from '../../types';
import { format } from 'date-fns';
import { CreateSkill } from './createSkill';
import { ModalDeleteSkill } from './modalDeleteSkill';

export const SkillsView = () => {
  const [skills, setSkills] = useState<TSkills[]>();
  const [deleteSkillId, setDeleteSkillID] = useState<number>();

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const response = await getSkills();
    if (response) {
      setSkills(response.skills);
    }
  };

  const handleDeleteSkill = (skillId: number) => {
    setDeleteSkillID(skillId);
  };

  return (
    <Center maxWidth="1000px" flexDirection="column" w="100%" py={4}>
      <ModalDeleteSkill
        reload={loadSkills}
        skillId={deleteSkillId}
        onClose={() => setDeleteSkillID(undefined)}
      />
      <Flex justify="flex-end" w="100%" mb={4}>
        <CreateSkill reload={loadSkills} />
      </Flex>
      <DefaultTable
        headers={['ID', 'Name', 'Rate', 'Updated at', 'Actions']}
        data={skills?.map((skill) => ({
          ...skill,
          updatedAt: format(skill.updatedAt, 'yyyy-MM-dd HH:mm'),
          action: (
            <Button
              size="xs"
              py="auto"
              colorPalette="red"
              onClick={() => handleDeleteSkill(skill.skillId)}
            >
              delete
            </Button>
          ),
        }))}
      />
    </Center>
  );
};
