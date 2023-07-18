import { render, screen } from '@testing-library/react';
import List from 'src/core/components/list/list';

describe('Bootstrap List', () => {
  it('Should render list component', () => {
    render(
      <List data-testid="list-test">
        <List.Item>
          <List.Item.Icon>@</List.Item.Icon>
          <List.Item.Text secondary="Hi">Hello</List.Item.Text>
        </List.Item>
        <List.Item>Hello</List.Item>
        <hr />
        <List.Item>Hello</List.Item>
        <List.Item>Hello</List.Item>
      </List>,
    );
    const element = screen.getByTestId('list-test');
    expect(element).toBeInTheDocument();
  });
});
