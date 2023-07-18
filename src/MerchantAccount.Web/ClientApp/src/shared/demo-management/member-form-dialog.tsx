import useForm from 'src/core/hooks/use-form';
import useSubmit from 'src/core/hooks/use-submit';
import { memo, useEffect, useState } from 'react';
import Modal from 'src/core/components/modal/modal';
import Form from 'src/core/components/form/form';
import Grid from 'src/core/components/grid/grid';
import Button from 'src/core/components/button/button';
import roleService from 'src/api/merchant-service';
import Feedback from 'src/core/components/feedback/feedback';
import Spinner from 'src/core/components/spinner/spinner';
import { STATES, useAlert } from 'src/core/hooks/alert-context';
import memberService from 'src/api/member-service';
import { IMember } from 'src/interfaces/member';
import ConfirmationDialog from 'src/shared/demo-management/confirmation-dialog';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Tooltip from 'src/core/components/tooltip/tooltip';
import { getFormatDate } from 'src/core/functions/get-format-date';

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

const MemberFormDialog = memo(({ openDialog, onClose, action, onSubmitSuccess, fieldId }: MemberFormDialogProps) => {
  const [roleOptions, setRoleOptions] = useState<Array<any>>([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [initialValues, setInitialValues] = useState<IMember>(emptyMemberValues);
  const [loadingErrorMsg, setLoadingErrorMsg] = useState<string | undefined>(undefined);

  const { fieldProps, isDirty, handleSubmit, setErrors, values, handleChange, submitState } = useSubmit(
    useForm({ initialValues }),
    action === ACTIONS.EDIT
      ? fieldId
        ? (formData: IMember, config?: any) => memberService.update(fieldId, formData, config)
        : () => {}
      : memberService.add,
  );
  useEffect(() => {
    if (action === ACTIONS.EDIT && fieldId) {
      const getDetail = async () => {
        try {
          const response = await memberService.getSingle(fieldId);
          const _initialValues = response.data;
          response && setInitialValues(response.data);
          const responseRoleOptions = await roleService.get();
          let newRoleOptions = responseRoleOptions.data.list;
          responseRoleOptions && setRoleOptions(newRoleOptions);
        } catch (error: any) {
          setLoadingErrorMsg(error.message);
        }
      };
      getDetail();
    }
    setErrors({});
    setInitialValues(emptyMemberValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, fieldId]);

  const { showMessage } = useAlert();

  useEffect(() => {
    if (!submitState?.loading && submitState?.data) {
      onSubmitSuccess && onSubmitSuccess(submitState.data);
      showMessage('Successfully', STATES.SUCCESS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitState?.loading]);

  const handleCloseConfirm = (value: any) => {
    setOpenConfirm(false);
    if (value === 'ok') {
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
      <Modal open={openDialog} onClose={handleClose} animation>
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header>{action === 'edit' ? 'Edit member' : 'Add member'}</Modal.Header>

          <Modal.Body>
            <Grid row spacing={1}>
              <Grid xs={12} sm={6}>
                <div className="form-floating">
                  <Form.Control disabled placeholder="Id" name="id" {...(fieldProps('id', {}) as any)} />
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
                  />
                  <Form.Label>Username</Form.Label>
                </div>
              </Grid>
              <Grid xs={12} sm={6}>
                <div className="form-floating">
                  <Form.Control placeholder="First Name" name="firstName" {...(fieldProps('firstName', {}) as any)} />

                  <Form.Label>First Name</Form.Label>
                </div>
              </Grid>
              <Grid xs={12} sm={6}>
                <div className="form-floating">
                  <Form.Control placeholder="Last Name" name="lastName" {...(fieldProps('lastName', {}) as any)} />

                  <Form.Label>Last Name</Form.Label>
                </div>
              </Grid>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
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
        dialogClassName="shadow-lg"
        content={<p>Are you want to discard changes?</p>}
        cancelText="Back"
        confirmText="Discard"
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
});

export default MemberFormDialog;
