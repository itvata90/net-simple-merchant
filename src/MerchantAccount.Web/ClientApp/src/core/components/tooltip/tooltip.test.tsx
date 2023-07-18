import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Tooltip from 'src/core/components/tooltip/tooltip';
import userEvent from '@testing-library/user-event';

describe('Bootstrap Toast', () => {
  it('Should show tooltip when mouse enter', async () => {
    render(
      <Tooltip text="Tooltip text">
        <button data-testid="child" className="btn btn-primary" type="button">
          My button
        </button>
      </Tooltip>,
    );
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
    await act(async () => {
      userEvent.hover(element);
      await waitFor(() => expect(element).toHaveAttribute('aria-describedby'), { timeout: 2000 });
    });
  });
});
