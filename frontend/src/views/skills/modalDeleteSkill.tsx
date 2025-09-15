import { Modal } from '../../components/modal';
import { deleteSkill } from '../../api';
import { Button, Flex } from '@chakra-ui/react';

interface TProps {
  onClose: () => void;
  skillId?: number;
  reload: () => void;
}

export const ModalDeleteSkill = ({ skillId, onClose, reload }: TProps) => {
  const handleConfirmDelete = async () => {
    if (skillId) {
      const response = await deleteSkill(skillId);
      if (response) {
        onClose();
        reload();
      }
    }
  };

  return (
    <Modal
      tittle="Delete skill"
      open={!!skillId}
      setOpen={(open) => !open && onClose()}
    >
      Are you sure you want to remove this skill?
      <Flex justifyContent="flex-end" mt={4}>
        <Button variant="outline" colorPalette="red" mr={4} onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          colorPalette="red"
          color="gray.50"
          onClick={handleConfirmDelete}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};
