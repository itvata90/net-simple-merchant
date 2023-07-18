import { render, screen } from '@testing-library/react';
import Button from 'src/core/components/button/button';
import Modal from 'src/core/components/modal/modal';

describe('Bootstrap Modal', () => {
  it('Should render modal component', () => {
    render(
      <Modal className="position-static d-block" dialogClassName="p-0 m-0" data-testid="modal-test">
        <Modal.Header>
          <h5 className="modal-title">Modal title</h5>
          <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </Modal.Header>
        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary">Close</Button>
          <Button color="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>,
    );
    const element = screen.getByTestId('modal-test');
    expect(element).toBeInTheDocument();
  });
});
