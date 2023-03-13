import { render, screen } from '@testing-library/react';
import Backdrop from 'src/core/components/backdrop/backdrop';

describe('Bootstrap Backdrop', () => {
  it('Should show backdrop', () => {
    render(<Backdrop open data-testid="backdrop" />);
    const element = screen.getByTestId('backdrop');
    expect(element).toBeVisible();
  });
});
