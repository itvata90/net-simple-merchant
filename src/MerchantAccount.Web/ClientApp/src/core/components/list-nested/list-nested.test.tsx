import { render, screen } from '@testing-library/react';
import List from 'src/core/components/list/list';

describe('Bootstrap List Nested', () => {
  it('Should render list nested component', () => {
    const listNested = [
      {
        header: 'Home',
      },
      {
        subheader: 'Management',
        children: [
          {
            header: 'User',
          },
          {
            header: 'Role',
          },
        ],
      },
    ];
    render(
      <List data-testid="nested-test">
        <List.Nested items={listNested} />
      </List>,
    );
    const element = screen.getByTestId('nested-test');
    const nested = element.firstChild;
    expect(nested).toBeInTheDocument();
  });
});
