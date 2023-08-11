import classNames from 'classnames';
import ListItem, {
  ListItemProps,
} from 'src/core/components/list-item/list-item';
import {
  Color,
  HeadingBaseProps,
  ListBaseProps,
} from 'src/core/interfaces/components';
import { ReactNode, useState, useRef, useEffect } from 'react';
import Collapse from 'src/core/components/collapse/collapse';
import { BsChevronCompactDown, BsChevronDown } from 'react-icons/bs';
import classes from 'src/core/components/list/list.module.scss';
import Button from 'src/core/components/button/button';
import ListNested from 'src/core/components/list-nested/list-nested';
export interface ItemsObject {
  header?: ReactNode;
  subheader?: ReactNode;
  children?: ItemsObject[];
  avatar?: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  props?: ListItemProps;
  as?: React.ElementType<any>;
  collapsible?: boolean;
  draggable?: boolean;
  collapsed?: boolean;
}

export interface ListProps extends Partial<ListBaseProps> {
  color?: Color;
  items?: ItemsObject[];
  header?: ReactNode;
  subheader?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

const List = ({
  as: Component = 'div',
  color,
  orientation = 'vertical',
  className,
  ...otherProps
}: ListProps) => {
  let bsPrefix = 'nav nav-pills';

  return (
    <Component
      {...otherProps}
      className={classNames(
        bsPrefix,
        orientation === 'vertical' && 'flex-column',
        color && color === 'light' && `bg-dark`,
        className
      )}
    />
  );
};

export default Object.assign(List, { Item: ListItem, Nested: ListNested });
