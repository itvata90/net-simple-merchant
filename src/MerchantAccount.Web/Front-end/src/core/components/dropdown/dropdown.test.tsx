import { act, render, screen, within } from '@testing-library/react';
import Dropdown from 'src/core/components/dropdown/dropdown';

describe('Bootstrap Dropdown', () => {
  it('Should render dropdown component', () => {
    render(
      <Dropdown data-testid="dropdown-test">
        <Dropdown.Toggle color="primary">Dropdown button</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );
    const element = screen.getByTestId('dropdown-test');
    expect(element).toBeInTheDocument();
  });
  it('Should show dropdown menu when the toggle has clicked', () => {
    render(
      <Dropdown data-testid="dropdown-test-wrapper">
        <Dropdown.Toggle data-testid="dropdown-toggle-test" color="primary">
          Dropdown button
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="dropdown-menu-test">
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );
    const element = screen.getByTestId('dropdown-test-wrapper');
    const toggle = screen.getByTestId('dropdown-toggle-test');
    expect(element).toBeInTheDocument();
    within(element).getByRole('list', { hidden: true });
    act(() => {
      toggle.click();
      within(element).getByRole('list', { hidden: false });
    });
  });
});
