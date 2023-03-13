import classNames from 'classnames';
import { forwardRef } from 'react';
import { LinkBaseProps } from '../../interfaces/components';

export interface AlertLinkProps extends Partial<LinkBaseProps> {}

const AlertLink = forwardRef(({ className, ...otherProps }: AlertLinkProps, ref) => {
  let bsPrefix = 'alert-link';
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});

export default AlertLink;
