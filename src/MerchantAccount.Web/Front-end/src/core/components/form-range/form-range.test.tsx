import { render, screen } from '@testing-library/react';
import FormRange from 'src/core/components/form-range/form-range';

describe('Bootstrap FormRange', () => {
  it('Should render form range', () => {
    render(<FormRange data-testid="form-range-test" />);
    const inputEl = screen.getByTestId('form-range-test');
    expect(inputEl).toBeInTheDocument();
  });
  it('Should render disabled form range', () => {
    render(<FormRange data-testid="form-range-test-disabled" disabled />);
    const inputEl = screen.getByTestId('form-range-test-disabled');
    expect(inputEl).toHaveAttribute('disabled');
  });
  it('Should render readonly form range', () => {
    render(<FormRange data-testid="form-range-test-readonly" readOnly />);
    const inputEl = screen.getByTestId('form-range-test-readonly');
    expect(inputEl).toHaveAttribute('readonly');
  });
});
