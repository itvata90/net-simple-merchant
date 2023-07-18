import { render, screen } from '@testing-library/react';
import Button from 'src/core/components/button/button';
import OffCanvas from 'src/core/components/off-canvas/off-canvas';

describe('Bootstrap OffCanvas', () => {
  it('Should render OffCanvas component', () => {
    render(
      <OffCanvas className="position-static d-block" data-testid="off-canvas-test">
        <OffCanvas.Header>
          <OffCanvas.Title>OffCanvas title</OffCanvas.Title>
          <Button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </OffCanvas.Header>
        <OffCanvas.Body>
          <p>OffCanvas body text goes here.</p>
        </OffCanvas.Body>
      </OffCanvas>,
    );
    const element = screen.getByTestId('off-canvas-test');
    expect(element).toBeInTheDocument();
  });
});
