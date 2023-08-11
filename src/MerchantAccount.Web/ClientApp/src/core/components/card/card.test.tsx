import { render, screen } from '@testing-library/react';
import Card from 'src/core/components/card/card';

describe('Bootstrap Card', () => {
  it('Should render card component', () => {
    render(
      <Card style={{ width: '18rem' }} data-testid="card-test">
        <Card.Image
          src="https://via.placeholder.com/250x150"
          position="top"
          alt="img"
        />
        <Card.Body>
          <Card.Title variant="h5">Card title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Go somewhere</Card.Link>
        </Card.Body>
      </Card>
    );
    const element = screen.getByTestId('card-test');
    expect(element).toBeInTheDocument();
  });
});
