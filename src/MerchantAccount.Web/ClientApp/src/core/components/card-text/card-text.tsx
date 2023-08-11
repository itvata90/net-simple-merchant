import classNames from 'classnames';
import { forwardRef } from 'react';
import { ParagraphBaseProps } from 'src/core/interfaces/components';

export interface CardTextProps extends Partial<ParagraphBaseProps> {}

/**
 * CardText component
 *
 */
const CardText = forwardRef(
  ({ className, ...otherProps }: CardTextProps, ref) => {
    let bsPrefix = `card-text`;
    return (
      <p
        {...otherProps}
        ref={ref as any}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default CardText;
