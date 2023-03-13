import { render, screen } from '@testing-library/react';
import Alert from 'src/core/components/alert/alert';

describe('Bootstrap Alert', () => {
  it('Should render alert component', () => {
    render(
      <Alert color="primary" data-testid="alert-test">
        A simple primary alert—check it out!
      </Alert>,
    );
    const element = screen.getByTestId('alert-test');
    expect(element).toBeInTheDocument();
  });
});
