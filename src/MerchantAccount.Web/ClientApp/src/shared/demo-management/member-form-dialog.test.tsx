import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as useFetch from 'src/core/hooks/use-fetch';
import * as useForm from 'src/core/hooks/use-form';
import MemberFormDialog, { ACTIONS } from 'src/shared/demo-management/member-form-dialog';
import memberService from 'src/api/member-service';

const exampleData = {
  data: {
    id: 1,
    username: 'username1',
    firstName: 'firstname1',
    lastName: 'lastname1',
  },

  headers: {
    get: () => 10,
  },
};

const useFetchSpy = jest.spyOn(useFetch, 'default');
const useFormSpy = jest.spyOn(useForm, 'default');

describe('Member form dialog', () => {
  it('Should render member form dialog component', () => {
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={() => {}} action={ACTIONS.ADD} />);
    const element = screen.getByText('Add member');
    expect(useFetchSpy).toBeCalledTimes(1);
    expect(element).toBeInTheDocument();
  });

  it('Should show when open prop is true component', async () => {
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={() => {}} action={ACTIONS.ADD} />);
    waitFor(() => {
      const element = screen.getByRole('dialog');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('show');
    });
  });

  it('Should show "Add member" header when action is add ', async () => {
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={() => {}} action={ACTIONS.ADD} />);
    waitFor(() => {
      const element = screen.getByRole('Add member');
      expect(element).toBeInTheDocument;
    });
  });

  it('Should show "Edit member" header when action is edit ', async () => {
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={() => {}} action={ACTIONS.EDIT} />);
    waitFor(() => {
      const element = screen.getByRole('Add member');
      expect(element).toBeInTheDocument;
    });
  });

  it('Should call onClose callback when click cancel button and data is persisted', async () => {
    const onClose = jest.fn();
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    useFormSpy.mockReturnValue({
      errors: {},
      fieldProps: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isDirty: () => false,
      resetForm: jest.fn(),
      setErrors: jest.fn(),
      setValues: jest.fn(),
      values: {},
      watch: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={onClose} action={ACTIONS.EDIT} />);
    const closeButton = screen.getByText('Cancel');
    expect(closeButton).toBeInTheDocument();

    waitFor(async () => {
      await userEvent.click(closeButton);
      expect(onClose).toBeCalledTimes(1);
    });
  });

  it('Should open confirm callback when click cancel button and field data changed ', async () => {
    const onClose = jest.fn();
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    useFormSpy.mockReturnValue({
      errors: {},
      fieldProps: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isDirty: () => true,
      resetForm: jest.fn(),
      setErrors: jest.fn(),
      setValues: jest.fn(),
      values: {},
      watch: jest.fn(),
    });

    render(<MemberFormDialog openDialog={true} onClose={onClose} action={ACTIONS.EDIT} />);

    const closeButton = screen.getByText('Cancel');
    expect(closeButton).toBeInTheDocument();

    waitFor(async () => {
      await userEvent.click(closeButton);
      const confirmationDialog = screen.getByRole('dialog');

      expect(confirmationDialog).toBeInTheDocument();
      expect(confirmationDialog).toHaveClass('show');
      expect(onClose).toBeCalledTimes(0);
    });
  });

  it('Should call onClose and resetForm when click discard button on discard changes confirmation dialog', async () => {
    const onClose = jest.fn();
    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });

    const resetForm = jest.fn();
    useFormSpy.mockReturnValue({
      errors: {},
      fieldProps: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isDirty: () => true,
      resetForm: resetForm,
      setErrors: jest.fn(),
      setValues: jest.fn(),
      values: {},
      watch: jest.fn(),
    });

    render(<MemberFormDialog openDialog={true} onClose={onClose} action={ACTIONS.EDIT} />);

    const closeButton = screen.getByText('Cancel');
    expect(closeButton).toBeInTheDocument();

    waitFor(async () => {
      await userEvent.click(closeButton);
      const confirmationDialog = screen.getByRole('dialog');

      expect(confirmationDialog).toBeInTheDocument();

      const discardButton = screen.getByText('Discard');
      await userEvent.click(discardButton);

      expect(onClose).toBeCalledTimes(1);
      expect(resetForm).toBeCalledTimes(1);
    });
  });

  it('Should call memberService add function when click save button and action is add', async () => {
    const spy = jest.spyOn(memberService, 'add');
    spy.mockImplementation(jest.fn());

    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={jest.fn()} action={ACTIONS.ADD} />);
    const saveButton = screen.getByText('Save');
    waitFor(async () => {
      expect(saveButton).toBeInTheDocument();
      await userEvent.click(saveButton);
      expect(spy).toBeCalledTimes(1);
    });
  });

  it('Should call memberService update function when click save button and action is edit', async () => {
    const spy = jest.spyOn(memberService, 'update');
    spy.mockImplementation(jest.fn());

    useFetchSpy.mockReturnValue({
      data: exampleData.data,
      error: undefined,
      mutate: jest.fn(),
    });
    render(<MemberFormDialog openDialog={true} onClose={jest.fn()} action={ACTIONS.ADD} />);
    const saveButton = screen.getByText('Save');

    waitFor(async () => {
      expect(saveButton).toBeInTheDocument();
      await userEvent.click(saveButton);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
