import { render, screen } from '@testing-library/react';
import Badge from 'src/core/components/badge/badge';

describe('Bootstrap Badge', () => {
  it('Should render component', () => {
    render(
      <Badge background="secondary" value="New" data-testid="badge-test" />
    );
    const element = screen.getByTestId('badge-test');
    expect(element).toBeInTheDocument();
  });
});
