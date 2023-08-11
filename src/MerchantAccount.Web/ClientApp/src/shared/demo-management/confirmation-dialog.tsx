import { ReactNode } from 'react';
import Button from 'src/core/components/button/button';
import Modal, { ModalProps } from 'src/core/components/modal/modal';
import Spinner from 'src/core/components/spinner/spinner';

export interface ConfirmationDialogRawProps extends Omit<ModalProps, 'content'> {
  id?: string;
  fieldId?: string | number;
  open?: boolean;
  loading?: boolean;
  onClose?: (value?: string) => void;
  confirmText?: string;
  cancelText?: string;
  content?: ReactNode;
  headerText?: ReactNode;
}
const ConfirmationDialog = (props: ConfirmationDialogRawProps) => {
  const {
    onClose,
    open,
    fieldId,
    loading,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    content = 'Confirm action',
    headerText = 'Confirm',
    ...other
  } = props;

  const handleCancel = () => {
    onClose && onClose();
  };

  const handleOk = () => {
    onClose && onClose('ok');
  };

  return (
    <Modal open={open} onClose={handleCancel} {...other} contentClassName="shadow">
      {headerText && (
        <Modal.Header>
          {headerText}
          <Button onClick={handleCancel} type="button" className="btn-close" aria-label="Close" size="sm" />
        </Modal.Header>
      )}
      {content && <Modal.Body>{content}</Modal.Body>}
      <Modal.Footer>
        <Button color="danger" disabled={loading} onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button color="primary" disabled={loading} onClick={handleOk}>
          {confirmText} {loading && <Spinner size="sm" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
