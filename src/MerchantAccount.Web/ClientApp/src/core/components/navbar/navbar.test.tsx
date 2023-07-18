import { render, screen } from '@testing-library/react';
import Navbar from 'src/core/components/navbar/navbar';

describe('Bootstrap Navbar', () => {
  it('Should render navbar component', () => {
    render(<Navbar data-testid="navbar-test">Navbar</Navbar>);
    const element = screen.getByTestId('navbar-test');
    expect(element).toBeInTheDocument();
  });
});
