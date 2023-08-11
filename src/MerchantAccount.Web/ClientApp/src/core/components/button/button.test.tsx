import { render, screen } from '@testing-library/react';
import Button from 'src/core/components/button/button';

describe('Bootstrap Button', () => {
  it('Should render button component', () => {
    render(
      <Button color="primary" data-testid="button-test">
        Primary
      </Button>
    );
    const element = screen.getByTestId('button-test');
    expect(element).toBeInTheDocument();
  });
  it('Should render disabled button', () => {
    render(<Button data-testid="button-test-disabled" disabled />);
    const buttonEl = screen.getByTestId('button-test-disabled');
    expect(buttonEl).toHaveAttribute('disabled');
  });
});
