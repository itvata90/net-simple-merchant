import useForm from 'src/core/hooks/use-form';
import useSubmit from 'src/core/hooks/use-submit';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from 'src/core/components/modal/modal';
import Form from 'src/core/components/form/form';
import Grid from 'src/core/components/grid/grid';
import Button from 'src/core/components/button/button';
import Feedback from 'src/core/components/feedback/feedback';
import Spinner from 'src/core/components/spinner/spinner';
import { STATES, useAlert } from 'src/core/hooks/alert-context';
import memberService from 'src/api/member-service';
import { IMember } from 'src/interfaces/member';
import ConfirmationDialog from 'src/shared/demo-management/confirmation-dialog';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Tooltip from 'src/core/components/tooltip/tooltip';
import useFetch from 'src/core/hooks/use-fetch';

export enum ACTIONS {
  EDIT = 'edit',
  ADD = 'add',
}

const emptyMemberValues = {
  id: '',
  username: '',
  lastName: '',
  firstName: '',
};

interface MemberFormDialogProps {
  fieldId?: string | number;
  openDialog: boolean;
  onClose: () => void;
  action: ACTIONS;
  onSubmitSuccess?: (responseData?: any, error?: string) => void;
}

const MemberFormDialog = memo(
  ({ openDialog, onClose, action, onSubmitSuccess, fieldId, ...props }: MemberFormDialogProps) => {
    const { data, mutate } = useFetch<IMember>(
      `#members/${fieldId}`,
      (_url?: string, config?: any) =>
        !fieldId || action === ACTIONS.ADD
          ? emptyMemberValues
          : memberService.getSingle(fieldId, config).then((res) => res.data),
      {
        deps: [action, fieldId, openDialog],
        skipCondition: () => !openDialog,
      },
    );

    const initialValues: IMember = useMemo(() => data ?? emptyMemberValues, [data]);

    const [openConfirm, setOpenConfirm] = useState(false);

    const { fieldProps, errors, handleSubmit, submitState, isDirty, resetForm } = useSubmit(
      useForm({ initialValues }),
      action === ACTIONS.EDIT
        ? fieldId
          ? (formData: IMember, config?: any) => memberService.update(fieldId, formData, config)
          : () => {}
        : memberService.add,
    );

    const { showMessage } = useAlert();

    useEffect(() => {
      if (submitState?.loading) {
        return;
      } else if (!!submitState?.data) {
        mutate(submitState?.data);
        onSubmitSuccess && onSubmitSuccess(submitState.data);
        showMessage('Successfully', STATES.SUCCESS);
        resetForm();
      } else if (!!submitState?.error) {
        showMessage('Failed', STATES.ERROR);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitState?.loading]);

    const handleCloseConfirm = (value: any) => {
      setOpenConfirm(false);
      if (value === 'ok') {
        resetForm();
        onClose();
      }
    };
    const handleClose = () => {
      if (isDirty()) {
        setOpenConfirm(true);
        return;
      }
      onClose();
    };

    return (
      <>
        <Modal open={openDialog} onClose={handleClose} animation {...props}>
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header className="d-flex">
              <h5 className="m-0">{action === ACTIONS.EDIT ? 'Edit member' : 'Add member'}</h5>
              <Button onClick={onClose} type="button" className="btn-close" aria-label="Close" size="sm" />
            </Modal.Header>

            <Modal.Body>
              <Grid row spacing={2}>
                <Grid xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control disabled placeholder="Id" name="id" {...(fieldProps('id') as any)} />
                    <Form.Label>Id</Form.Label>
                  </div>
                </Grid>
                <Grid xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="Username"
                      label={'Username'}
                      name="username"
                      {...(fieldProps('username', { required: true }) as any)}
                      feedbackType={!!errors['username'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Username*</Form.Label>
                    <Feedback tooltip>{errors['username'] === 'required' ? 'Required' : ''}</Feedback>
                  </div>
                </Grid>
                <Grid xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control placeholder="First Name" name="firstName" {...(fieldProps('firstName') as any)} />
                    <Form.Label>First Name</Form.Label>
                  </div>
                </Grid>
                <Grid xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control placeholder="Last Name" name="lastName" {...(fieldProps('lastName') as any)} />
                    <Form.Label>Last Name</Form.Label>
                  </div>
                </Grid>
              </Grid>
            </Modal.Body>
            <Modal.Footer divider>
              <Button onClick={handleClose} disabled={submitState?.loading} color="danger">
                Cancel
              </Button>
              <Button type="submit" disabled={submitState?.loading} color="primary">
                Save {submitState?.loading && <Spinner size="sm" />}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <ConfirmationDialog
          size="sm"
          open={openConfirm}
          onClose={handleCloseConfirm}
          backdrop={false}
          content={<p className="m-0">Do you want to discard changes?</p>}
          cancelText="Back"
          confirmText="Discard"
          className="pt-3"
          headerText={
            <h5 className="d-flex align-items-center">
              <Tooltip text="Hello">
                <div className="me-2">
                  <HiOutlineExclamationCircle />
                </div>
              </Tooltip>{' '}
              Confirm your action
            </h5>
          }
        />
      </>
    );
  },
);

export default MemberFormDialog;
