import {
  Button,
  useDisclosure,
  Text,
  Input,
  Field,
  Flex,
} from '@chakra-ui/react';
import { Modal } from '../../components/modal';
import { useForm } from 'react-hook-form';
import { postSkill } from '../../api';
import { TNewSkills } from '../../types';

interface TProps {
  reload: () => void;
}

export const CreateSkill = ({ reload }: TProps) => {
  const { open, setOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewSkills>();

  const onSubmit = async (values: TNewSkills) => {
    const response = await postSkill(values);
    if (response) {
      reload();
      reset();
      onClose();
    }
  };

  return (
    <Modal
      tittle="Create skill"
      open={open}
      setOpen={setOpen}
      tittleButtonOpen="Add skills"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root color="gray.600">
          <Field.Label>
            Name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register('name', { required: true })}
            placeholder="Enter name"
          />
          {errors.name && <Text color="red.500">This field is required</Text>}
        </Field.Root>
        <Field.Root mt={4} color="gray.600">
          <Field.Label>
            Name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register('rate', { required: true })}
            placeholder="Enter rate"
          />
          {errors.rate && <Text color="red.500">This field is required</Text>}
        </Field.Root>
        <Flex justifyContent="flex-end" mt={4}>
          <Button variant="outline" colorPalette="red" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" colorPalette="green" color="gray.50">
            Save
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
