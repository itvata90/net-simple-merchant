import { render, screen } from '@testing-library/react';
import Spinner from 'src/core/components/spinner/spinner';

describe('Bootstrap Spinner', () => {
  it('Should render component', () => {
    render(<Spinner color="secondary" data-testid="spinner-test" />);
    const element = screen.getByTestId('spinner-test');
    expect(element).toBeInTheDocument();
  });
});
