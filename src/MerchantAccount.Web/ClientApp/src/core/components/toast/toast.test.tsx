import { render, screen } from '@testing-library/react';
import Button from 'src/core/components/button/button';
import Toast from 'src/core/components/toast/toast';

describe('Bootstrap Toast', () => {
  it('Should render component', () => {
    render(
      <Toast containerClassName="position-static d-block" className="position-static d-block" data-testid="toast-test">
        <Toast.Header>
          <img src="https://via.placeholder.com/16" className="rounded me-2" alt="..." />
          <code className="me-auto">Bootstrap</code>
          <small>11 mins ago</small>
          <Button className="btn-close" data-bs-dismiss="toast" aria-label="Close"></Button>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>,
    );
    const element = screen.getByTestId('toast-test');
    expect(element).toBeInTheDocument();
  });
});
