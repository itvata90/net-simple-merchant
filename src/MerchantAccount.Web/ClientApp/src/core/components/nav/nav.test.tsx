import { render, screen } from '@testing-library/react';
import Nav from 'src/core/components/nav/nav';
describe('Bootstrap Nav', () => {
  it('Should render nav component', () => {
    render(
      <Nav data-testid="nav-test">
        <Nav.Link href="#" active>
          Active
        </Nav.Link>
        <Nav.Link href="#">Link</Nav.Link>
        <Nav.Link href="#" disabled>
          Disabled
        </Nav.Link>
      </Nav>
    );
    const element = screen.getByTestId('nav-test');

    expect(element).toBeInTheDocument();
  });
});
