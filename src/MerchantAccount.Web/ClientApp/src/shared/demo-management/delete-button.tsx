import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from 'src/core/components/button/button';
import { STATES, useAlert } from 'src/core/hooks/alert-context';
import ConfirmationDialog from 'src/shared/demo-management/confirmation-dialog';

interface DeleteButtonProps {
  id?: string;
  fieldId: string | number;
  onDelete?: (id: string | number, error?: string) => void;
  fetcher: (id: string | number, config?: any) => void;
}

const DeleteButton = ({ fieldId, onDelete, fetcher }: DeleteButtonProps) => {
  const handleClickDelete = () => {
    setOpenDialog(true);
  };
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useAlert();

  const handleCloseConfirmDialog = async (result?: string) => {
    if (result === 'ok') {
      try {
        setLoading(true);
        await fetcher(fieldId);
        // Set on table
        showMessage('Successfully', STATES.SUCCESS);
        onDelete && onDelete(fieldId);
      } catch (error) {
        // Handle error
        showMessage('Error', STATES.ERROR);
      } finally {
        setLoading(false);
        setOpenDialog(false);
      }
    }
    setOpenDialog(false);
  };

  return (
    <>
      <Button id={`delete-role-button-${fieldId}`} onClick={handleClickDelete} color="danger">
        <AiOutlineDelete />
      </Button>
      <ConfirmationDialog
        loading={loading}
        fieldId={fieldId}
        id={`confirm-dialog-${fieldId}`}
        open={openDialog}
        onClose={(result?: string) => handleCloseConfirmDialog(result)}
      />
    </>
  );
};

export default DeleteButton;
