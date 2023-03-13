import { render, screen } from '@testing-library/react';
import FormCheck from 'src/core/components/form-check/form-check';

describe('Bootstrap FormCheck', () => {
  it('Should render form check', () => {
    render(<FormCheck data-testid="form-check-test" />);
    const inputEl = screen.getByTestId('form-check-test');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl.parentNode).toHaveClass('form-check');
  });
  it('Should render disabled form check', () => {
    render(<FormCheck data-testid="form-check-test-disabled" disabled />);
    const inputEl = screen.getByTestId('form-check-test-disabled');
    expect(inputEl).toHaveAttribute('disabled');
  });
  it('Should render readonly form check', () => {
    render(<FormCheck data-testid="form-check-test-readonly" readOnly />);
    const inputEl = screen.getByTestId('form-check-test-readonly');
    expect(inputEl).toHaveAttribute('readonly');
  });
  it('Should render radio', () => {
    render(<FormCheck data-testid="form-check-test-radio" type="radio" />);
    const inputEl = screen.getByTestId('form-check-test-radio');
    expect(inputEl).toHaveAttribute('type', 'radio');
  });
  it('Should render switch', () => {
    render(<FormCheck data-testid="form-check-test-switch" type="switch" />);
    const inputEl = screen.getByTestId('form-check-test-switch');
    expect(inputEl).toHaveAttribute('type', 'checkbox');
    expect(inputEl.parentNode).toHaveClass('form-switch');
  });
});
