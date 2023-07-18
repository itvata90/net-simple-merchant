import useForm from 'src/core/hooks/use-form';
import useSubmit from 'src/core/hooks/use-submit';
import { memo, useEffect, useState } from 'react';
import Modal from 'src/core/components/modal/modal';
import Form from 'src/core/components/form/form';
import Grid from 'src/core/components/grid/grid';
import { IMerchant } from 'src/interfaces/merchant';
import Button from 'src/core/components/button/button';
import merchantService from 'src/api/merchant-service';
import Feedback from 'src/core/components/feedback/feedback';
import Spinner from 'src/core/components/spinner/spinner';
import { STATES, useAlert } from 'src/core/hooks/alert-context';
import ConfirmationDialog from 'src/shared/demo-management/confirmation-dialog';
import Tooltip from 'src/core/components/tooltip/tooltip';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export enum ACTIONS {
  EDIT = 'edit',
  ADD = 'add',
}

export const emptyMerchantValues = {
  name: '',
  status: '',
  province: '',
  district: '',
  street: '',
  email: '',
  phone: '',
  ownerId: -1,
};

interface MerchantFormDialogProps {
  fieldId?: string | number;
  openDialog: boolean;
  onClose: () => void;
  action: ACTIONS;
  onSubmitSuccess?: (responseData?: any, error?: string) => void;
}

const MerchantFormDialog = memo(
  ({ openDialog, onClose, action, onSubmitSuccess, fieldId }: MerchantFormDialogProps) => {
    const [initialValues, setInitialValues] = useState<IMerchant>(emptyMerchantValues);
    const [loadingErrorMsg, setLoadingErrorMsg] = useState<string | undefined>(undefined);
    const [openConfirm, setOpenConfirm] = useState(false);
    const { fieldProps, errors, handleSubmit, values, handleChange, submitState, watch, isDirty } = useSubmit(
      useForm({ initialValues }),
      action === ACTIONS.EDIT
        ? fieldId
          ? (formData: IMerchant, config?: any) => merchantService.update(fieldId, formData, config)
          : () => {}
        : merchantService.add,
    );
    useEffect(() => {
      setInitialValues({ ...emptyMerchantValues });
      if (openDialog) {
        if (action === ACTIONS.EDIT && fieldId) {
          const getDetail = async () => {
            try {
              const response = await merchantService.getSingle(fieldId);
              response && setInitialValues(response.data);
            } catch (error: any) {
              setLoadingErrorMsg(error.message);
            }
          };
          getDetail();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action, fieldId, openDialog]);

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
        <Modal open={openDialog} onClose={handleClose} animation backdrop>
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header as="h5">{action === 'edit' ? 'Edit merchant' : 'Add merchant'}</Modal.Header>

            <Modal.Body>
              <Grid row spacing={1}>
                <Grid item xs={12} sm={6} style={{ display: action === ACTIONS.ADD ? 'none' : 'block' }}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="Id"
                      label="Id"
                      name="id"
                      {...(fieldProps('id', { required: true }) as any)}
                      feedbackType={!!errors['id'] ? 'is-invalid' : undefined}
                      readOnly
                    />
                    <Form.Label>Id</Form.Label>
                    <Feedback>{errors['id']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="name"
                      label={'name'}
                      name="name"
                      {...(fieldProps('name', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['name'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Name</Form.Label>
                    <Feedback>{errors['name']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="province"
                      label={'province'}
                      province="province"
                      {...(fieldProps('province', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['province'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Province</Form.Label>
                    <Feedback>{errors['province']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="district"
                      label={'district'}
                      name="district"
                      {...(fieldProps('district', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['district'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>District</Form.Label>
                    <Feedback>{errors['district']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="street"
                      label={'street'}
                      name="street"
                      {...(fieldProps('street', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['street'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Street</Form.Label>
                    <Feedback>{errors['street']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="email"
                      label={'email'}
                      name="email"
                      {...(fieldProps('email', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['email'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Email</Form.Label>
                    <Feedback>{errors['email']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="phone"
                      label={'phone'}
                      name="phone"
                      {...(fieldProps('phone', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['phone'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Phone</Form.Label>
                    <Feedback>{errors['phone']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="ownerId"
                      label={'ownerId'}
                      name="ownerId"
                      {...(fieldProps('ownerId', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['ownerId'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>OwnerId</Form.Label>
                    <Feedback>{errors['ownerId']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="status"
                      label={'status'}
                      name="status"
                      {...(fieldProps('status', {
                        required: true,
                        maxLength: 27,
                      }) as any)}
                      feedbackType={!!errors['status'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Status</Form.Label>
                    <Feedback>{errors['status']}</Feedback>
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
  },
);

export default MerchantFormDialog;
