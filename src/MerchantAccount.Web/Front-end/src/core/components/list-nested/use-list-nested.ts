import { useState, useEffect, useRef, ReactNode } from 'react';
import classes from 'src/core/components/list-nested/list-nested.module.scss';

interface ItemsObject {
  header?: ReactNode;
  subheader?: ReactNode;
  children?: ItemsObject[];
  avatar?: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  as?: React.ElementType<any>;
  collapsible?: boolean;
  draggable?: boolean;
  collapsed?: boolean;
}

const useListNested = (items: ItemsObject[], draggable: boolean = false) => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [orders, setOrders] = useState<number[]>([]);

  useEffect(() => {
    if (items) {
      const _expanded = items.reduce((acc, cur, index) => [...acc, ...(cur.collapsed ? [index] : [])] as any, []);
      setExpanded(_expanded);
      const _orders = items.map((_, index: number) => index);
      setOrders(_orders);
    }
  }, [items]);

  const handleToggle = (item: any) => () => {
    let temp = [...expanded];
    const indexItem = temp.indexOf(item);
    if (indexItem === -1) {
      temp.push(item);
    } else {
      temp.splice(indexItem, 1);
    }
    setExpanded([...temp]);
  };

  let draggingItem = useRef<any>(undefined);
  let draggingItemIndex = useRef<number | undefined>(undefined);

  const handleDragStart = (index: number) => (event: any) => {
    event.stopPropagation();
    draggingItem.current = event.target;
    draggingItemIndex.current = index;
  };

  const handleDrop = (index: number) => (event: any) => {
    event.preventDefault();
    if (typeof draggingItemIndex.current === 'number') {
      let newOrders = [...orders];
      let temp = newOrders[index];
      newOrders[index] = newOrders[draggingItemIndex.current];
      newOrders[draggingItemIndex.current] = temp;
      setOrders(newOrders);
      event.target.classList.remove(classes['list-nested-active']);
    }
  };

  const handleDragEnter = (index: number) => (event: any) => {
    let overElm = event.target;
    if (overElm !== draggingItem.current) {
      if (overElm !== null && overElm !== draggingItem.current) {
        while (!overElm.classList.contains('nav-link')) {
          overElm = overElm.parentNode;
        }
        overElm.classList.add(classes['list-nested-active']);
      }
    }
  };
  const handleDragLeave = (index: number) => (event: any) => {
    event.target.classList.remove(classes['list-nested-active']);
  };

  const handleDragEnd = (index: number) => (event: any) => {
    event.target.classList.remove(classes['list-nested-active']);
  };

  const dragProps = (index: number) =>
    draggable
      ? {
          onDragStart: handleDragStart(index),
          onDrop: handleDrop(index),
          onDragOverCapture: handleDragEnter(index),
          onDragLeave: handleDragLeave(index),
          onDragOver: (e: any) => e.preventDefault(),
          onDragEnd: handleDragEnd(index),
          draggable: true,
        }
      : {};
  return { orders, expanded, dragProps, handleToggle };
};

export default useListNested;
