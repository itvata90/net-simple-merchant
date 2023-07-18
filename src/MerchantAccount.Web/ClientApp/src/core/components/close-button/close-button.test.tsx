import { render, screen } from '@testing-library/react';
import CloseButton from 'src/core/components/close-button/close-button';

describe('Bootstrap Modal', () => {
  it('Should render hide the modal component', async () => {
    render(<CloseButton data-testid="close-button-test" dismiss="modal" aria-label="Close" />);
    const element = screen.getByTestId('close-button-test');
    expect(element).toBeInTheDocument();
  });
});
