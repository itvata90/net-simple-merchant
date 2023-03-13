import classNames from 'classnames';
import { Collapse } from 'bootstrap';
import { ElementType, useEffect, useRef, useState } from 'react';
import { AccordionBaseProps } from 'src/core/interfaces/components';

export interface AccordionItemProps extends Partial<AccordionBaseProps> {
  buttonContent: string;
  bsDataParent?: string;
  defaultShow?: boolean;
  headerClassName?: string;
  buttonClassName?: string;
  collapseClassName?: string;
  headerComponent?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | ElementType<any>;
}
const AccordionItem = ({
  className,
  as: Component = 'div',
  buttonContent,
  children,
  bsDataParent,
  defaultShow,
  headerClassName,
  buttonClassName,
  collapseClassName,
  headerComponent: HeaderComponent = 'h2',
  id,
  ...otherProps
}: AccordionItemProps) => {
  const [toggle, setToggle] = useState(defaultShow);
  const collapseRef = useRef<any>();

  useEffect(() => {
    let myCollapse = collapseRef.current;

    if (toggle) {
      let bsCollapse = new Collapse(myCollapse, {
        toggle: false,
        parent: bsDataParent,
      });
      bsCollapse.show();
    } else {
      let bsCollapse = Collapse.getInstance(myCollapse);
      bsCollapse?.hide();
    }
    myCollapse.addEventListener('hidden.bs.collapse', () => {
      setToggle(false);
    });
  });

  let bsPrefix = `accordion-item`;
  let bsPrefixHeader = `accordion-header`;
  let bsPrefixButton = `accordion-button`;
  let bsPrefixCollapse = `accordion-collapse`;
  return (
    <Component {...otherProps} className={classNames(bsPrefix, className)}>
      <HeaderComponent className={classNames(bsPrefixHeader, headerClassName)}>
        <button
          className={classNames(bsPrefixButton, !toggle && 'collapsed', buttonClassName)}
          onClick={() => setToggle(!toggle)}
        >
          {buttonContent}
        </button>
      </HeaderComponent>
      <div
        className={classNames(bsPrefixCollapse, 'collapse', collapseClassName)}
        ref={collapseRef}
        // data-bs-parent={bsDataParent}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </Component>
  );
};

export default AccordionItem;
