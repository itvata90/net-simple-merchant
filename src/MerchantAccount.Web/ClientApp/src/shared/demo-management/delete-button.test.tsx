import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteButton from 'src/shared/demo-management/delete-button';

describe('Delete button', () => {
  it('Should render delete button component', () => {
    render(<DeleteButton fieldId={1} onDelete={jest.fn()} fetcher={jest.fn()} />);
    const element = screen.getByRole('delete-button');
    expect(element).toBeInTheDocument();
  });

  it('Should open confirmation dialog when clicked', async () => {
    render(<DeleteButton fieldId={1} onDelete={jest.fn()} fetcher={jest.fn()} />);
    const element = screen.getByRole('delete-button');

    waitFor(async () => {
      await userEvent.click(element);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveClass('show');
      expect(dialog).toHaveTextContent('Confirm delete');
    });
  });

  it('Should not call onDelete and fetcher callback when click cancel on confirmation', async () => {
    const onDelete = jest.fn();
    const fetcher = jest.fn();
    render(<DeleteButton fieldId={1} onDelete={onDelete} fetcher={fetcher} />);
    const element = screen.getByRole('delete-button');

    waitFor(async () => {
      await userEvent.click(element);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const cancelButton = screen.getByText('Cancel');
      await userEvent.click(cancelButton);

      expect(fetcher).toBeCalledTimes(0);
      expect(onDelete).toBeCalledTimes(0);
    });
  });

  it('Should not call onDelete and fetcher callback when click confim on confirmation', async () => {
    const onDelete = jest.fn();
    const fetcher = jest.fn();
    render(<DeleteButton fieldId={1} onDelete={onDelete} fetcher={fetcher} />);
    const element = screen.getByRole('delete-button');

    waitFor(async () => {
      await userEvent.click(element);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const confirmButton = screen.getByText('Confirm');
      await userEvent.click(confirmButton);

      expect(fetcher).toBeCalledTimes(1);
      expect(onDelete).toBeCalledTimes(1);
    });
  });
});
