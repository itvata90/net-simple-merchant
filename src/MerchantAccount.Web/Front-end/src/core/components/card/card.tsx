import classNames from 'classnames';
import CardBody from '../card-body/card-body';
import CardFooter from '../card-footer/card-footer';
import CardHeader from '../card-header/card-header';
import CardImage from '../card-image/card-image';
import CardLink from '../card-link/card-link';
import CardSubtitle from '../card-subtitle/card-subtitle';
import CardText from '../card-text/card-text';

import { CardBaseProps } from '../../interfaces/components';
import { forwardRef } from 'react';

export interface CardProps extends Partial<CardBaseProps> {}

/**
 * Card component
 *
 */
const Card = forwardRef(({ className, as: Component = 'div', color, ...otherProps }: CardProps, ref) => {
  let bsPrefix = `card`;

  return (
    <Component
      {...otherProps}
      ref={ref as any}
      className={classNames(bsPrefix, color && `text-bg-${color}`, className)}
    />
  );
});

export default Object.assign(Card, {
  Image: CardImage,
  Body: CardBody,
  Title: CardSubtitle,
  Subtitle: CardSubtitle,
  Link: CardLink,
  Text: CardText,
  Header: CardHeader,
  Footer: CardFooter,
});
