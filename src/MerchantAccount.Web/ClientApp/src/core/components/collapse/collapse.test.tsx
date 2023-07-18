import { render, screen } from '@testing-library/react';
import Card from 'src/core/components/card/card';
import Collapse from 'src/core/components/collapse/collapse';

describe('Bootstrap Collapse', () => {
  it('Should render collapse component', () => {
    render(
      <Collapse id="collapseExample" className="mt-2" data-testid="collapse-test">
        <Card>
          <Card.Body>
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the
            user activates the relevant trigger.
          </Card.Body>
        </Card>
      </Collapse>,
    );
    const element = screen.getByTestId('collapse-test');
    expect(element).toBeInTheDocument();
  });
});
