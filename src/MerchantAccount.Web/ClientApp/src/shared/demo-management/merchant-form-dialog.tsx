import useForm from 'src/core/hooks/use-form';
import useSubmit from 'src/core/hooks/use-submit';
import { memo, useEffect, useState, useMemo } from 'react';
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
import useFetch from 'src/core/hooks/use-fetch';

export enum ACTIONS {
  EDIT = 'edit',
  ADD = 'add',
}

export const emptyMerchantValues = {
  id: '',
  name: '',
  status: '',
  province: '',
  district: '',
  street: '',
  email: '',
  phone: '',
  ownerId: '',
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
    const { data, mutate } = useFetch<IMerchant>(
      `#merchants/${fieldId}`,
      (_url?: string, config?: any) =>
        !fieldId || action === ACTIONS.ADD
          ? emptyMerchantValues
          : merchantService.getSingle(fieldId, config).then((res) => res.data),
      {
        deps: [action, fieldId, openDialog],
        skipCondition: () => !openDialog,
      },
    );

    const initialValues: IMerchant = useMemo(() => data ?? emptyMerchantValues, [data]);

    const [openConfirm, setOpenConfirm] = useState(false);

    const { fieldProps, errors, handleSubmit, submitState, isDirty, resetForm } = useSubmit(
      useForm({ initialValues }),
      action === ACTIONS.EDIT
        ? fieldId
          ? (formData: IMerchant, config?: any) => merchantService.update(fieldId, formData, config)
          : () => {}
        : merchantService.add,
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
        <Modal open={openDialog} onClose={handleClose} animation backdrop>
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header className="d-flex">
              <h5>{action === ACTIONS.EDIT ? 'Edit merchant' : 'Add merchant'}</h5>
              <Button onClick={onClose} type="button" className="btn-close" aria-label="Close" size="sm" />
            </Modal.Header>

            <Modal.Body>
              <Grid row spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control disabled placeholder="Id" label="Id" name="id" {...(fieldProps('id') as any)} />
                    <Form.Label>Id</Form.Label>
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
                    <Form.Label>Name*</Form.Label>
                    <Feedback>{errors['name']}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="province"
                      label={'province'}
                      province="province"
                      {...(fieldProps('province') as any)}
                    />
                    <Form.Label>Province</Form.Label>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="district"
                      label={'district'}
                      name="district"
                      {...(fieldProps('district') as any)}
                    />
                    <Form.Label>District</Form.Label>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="street"
                      label={'street'}
                      name="street"
                      {...(fieldProps('street') as any)}
                    />
                    <Form.Label>Street</Form.Label>
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
                        isEmail: true,
                      }) as any)}
                      feedbackType={!!errors['email'] ? 'is-invalid' : undefined}
                    />
                    <Form.Label>Email*</Form.Label>
                    <Feedback tooltip>
                      {errors['email'] === 'required'
                        ? 'Required'
                        : errors['email'] === 'isEmail'
                        ? 'invalid email'
                        : ''}
                    </Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control placeholder="phone" label={'phone'} name="phone" {...(fieldProps('phone') as any)} />
                    <Form.Label>Phone</Form.Label>
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
                    <Form.Label>Owner Id*</Form.Label>
                    <Feedback tooltip>{errors['ownerId'] === 'required' ? 'Required' : ''}</Feedback>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-floating">
                    <Form.Control
                      placeholder="status"
                      label={'status'}
                      name="status"
                      {...(fieldProps('status') as any)}
                    />
                    <Form.Label>Status</Form.Label>
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

export default MerchantFormDialog;
