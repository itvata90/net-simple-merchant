import classNames from 'classnames';
import { forwardRef } from 'react';
import { LinkBaseProps } from 'src/core/interfaces/components';

export interface CardLinkProps extends Partial<LinkBaseProps> {}

/**
 * CardLink component
 *
 */
const CardLink = forwardRef(
  ({ className, children, ...otherProps }: CardLinkProps, ref) => {
    let bsPrefix = `card-link`;
    return (
      <a
        {...otherProps}
        ref={ref as any}
        className={classNames(bsPrefix, className)}
      >
        {children}
      </a>
    );
  }
);

export default CardLink;
