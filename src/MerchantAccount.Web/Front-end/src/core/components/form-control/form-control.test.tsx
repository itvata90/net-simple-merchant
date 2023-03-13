import { render, screen } from '@testing-library/react';
import FormControl from 'src/core/components/form-control/form-control';

describe('Bootstrap FormControl', () => {
  it('Should render form control', () => {
    render(<FormControl data-testid="form-control-test" />);
    const inputEl = screen.getByTestId('form-control-test');
    expect(inputEl).toBeInTheDocument();
  });
  it('Should render disabled form control', () => {
    render(<FormControl data-testid="form-control-test-disabled" disabled />);
    const inputEl = screen.getByTestId('form-control-test-disabled');
    expect(inputEl).toHaveAttribute('disabled');
  });
  it('Should render readonly form control', () => {
    render(<FormControl data-testid="form-control-test-readonly" readOnly />);
    const inputEl = screen.getByTestId('form-control-test-readonly');
    expect(inputEl).toHaveAttribute('readonly');
  });
  it('Should render form control as textarea', () => {
    render(<FormControl data-testid="form-control-test-textarea" as="textarea" />);
    const inputEl = screen.getByTestId('form-control-test-textarea');
    expect(inputEl.tagName.toLowerCase()).toBe('textarea');
  });
  it('Should render a small form control', () => {
    render(<FormControl data-testid="form-control-test-small" size="sm" />);
    const inputEl = screen.getByTestId('form-control-test-small');
    expect(inputEl).toHaveClass('form-control-sm');
  });
});
