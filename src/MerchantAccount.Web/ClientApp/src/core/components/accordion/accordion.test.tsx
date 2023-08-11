import { render, screen } from '@testing-library/react';
import Accordion from 'src/core/components/accordion/accordion';

describe('Bootstrap Accordion', () => {
  it('Should render accordion component', () => {
    render(
      <Accordion
        id="accordionExample"
        className="w-100"
        data-testid="accordion-test"
      >
        <Accordion.Item buttonContent="Accordion Item #1" headerComponent="h6">
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </Accordion.Item>
        <Accordion.Item buttonContent="Accordion Item #2" headerComponent="h6">
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </Accordion.Item>{' '}
        <Accordion.Item buttonContent="Accordion Item #3" headerComponent="h6">
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </Accordion.Item>
      </Accordion>
    );
    const element = screen.getByTestId('accordion-test');
    expect(element).toBeInTheDocument();
  });
});
