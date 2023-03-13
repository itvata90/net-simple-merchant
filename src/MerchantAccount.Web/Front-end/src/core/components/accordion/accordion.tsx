import classNames from 'classnames';
import { Children, cloneElement, isValidElement } from 'react';
import AccordionItem from 'src/core/components/accordion-item/accordion-item';
import { AccordionBaseProps } from 'src/core/interfaces/components';

export interface AccordionProps extends Partial<AccordionBaseProps> {}

const Accordion = ({
  className,
  flush, //Add flush to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.
  as: Component = 'div',
  children,
  id = 'AccordionId',
  alwayOpen,
  ...otherProps
}: AccordionProps) => {
  let bsPrefix = 'accordion';

  const childrenWithCustomProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    if (isValidElement(child)) {
      const { ...others } = child?.props;

      return cloneElement(child, {
        ...others,
        bsDataParent: alwayOpen ? '' : `#${id}`,
      });
    }
    return child;
  });
  return (
    <Component
      {...otherProps}
      id={id}
      className={classNames(bsPrefix, flush && `${bsPrefix}-flush`, className)}
      children={childrenWithCustomProps}
    />
  );
};

export default Object.assign(Accordion, { Item: AccordionItem });
