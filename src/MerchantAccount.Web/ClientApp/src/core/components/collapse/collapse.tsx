import { HTMLAttributes, useEffect, useRef } from 'react';
import { Collapse as BsCollapse } from 'bootstrap';
import classNames from 'classnames';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface CollapseProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  in?: boolean;
  direction?: 'vertical' | 'horizontal';
}

const Collapse = ({
  in: toggle = false,
  as: Component = 'div',
  className,
  direction,
  ...otherProps
}: CollapseProps) => {
  const collapseRef = useRef<any>();
  let bsPrefix = 'collapse';

  useEffect(() => {
    if (toggle !== undefined) {
      let myCollapse = collapseRef.current;
      let bsCollapse = new BsCollapse(myCollapse, { toggle });
    }
  }, []);
  useEffect(() => {
    if (toggle !== undefined) {
      let myCollapse = collapseRef.current;
      let bsCollapse = BsCollapse.getInstance(myCollapse);
      toggle ? bsCollapse?.show() : bsCollapse?.hide();
    }
  }, [toggle]);
  return (
    <Component
      {...otherProps}
      ref={collapseRef}
      className={classNames(
        bsPrefix,
        direction === 'horizontal' && `${bsPrefix}-horizontal`,
        className
      )}
    />
  );
};

export default Collapse;
