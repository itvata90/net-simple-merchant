import classNames from 'classnames';
import ListItem, {
  ListItemProps,
} from 'src/core/components/list-item/list-item';
import { Color, ListBaseProps } from 'src/core/interfaces/components';
import { ReactNode, useState, useRef, useEffect } from 'react';
import Collapse from 'src/core/components/collapse/collapse';
import { BsChevronDown } from 'react-icons/bs';
import classes from 'src/core/components/list-nested/list-nested.module.scss';
import useListNested from 'src/core/components/list-nested/use-list-nested';
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

export interface ListNestedProps extends Partial<ListBaseProps> {
  color?: Color;
  items?: ItemsObject[];
  header?: ReactNode;
  subheader?: ReactNode;
  disableIndent?: boolean;
  draggable?: boolean;
  renderItem?: (item: ItemsObject) => ReactNode;
}

const ListNested = ({
  items = [],
  color,
  disableIndent = false,
  draggable = true,
  className,
  renderItem,
}: ListNestedProps) => {
  // Including indices of expanded
  const { orders, expanded, handleToggle, dragProps } = useListNested(
    items,
    draggable
  );
  return (
    <>
      {orders?.map((order, index) => (
        <div key={index}>
          {renderItem ? (
            renderItem(items[order])
          ) : (
            <ListItem
              {...items[order]?.props}
              {...dragProps(index)}
              style={{ display: 'flex', ...items[order].props?.style }}
              color={color}
              active={items[order].active}
              onClick={(e) => {
                let item = items[order];
                item.props?.onClick && item.props.onClick(e);
                item.children && handleToggle(index)();
              }}
              className={classNames(className)}
            >
              {items[order].icon && (
                <ListItem.Icon>{items[order].icon}</ListItem.Icon>
              )}
              <ListItem.Text
                primary={items[order].header}
                secondary={items[order].subheader}
                disableMargin
              />
              {items[order].children && items[order]?.collapsible && (
                <div
                  className={classNames(
                    classes['list-nested-arrow'],
                    expanded.includes(index) &&
                      classes['list-nested-arrow-active'],
                    'ms-auto'
                  )}
                >
                  <BsChevronDown />
                </div>
              )}
            </ListItem>
          )}
          {items[order]?.children && (
            <Collapse
              in={expanded.includes(index) || !items[order]?.collapsible}
            >
              <ListNested
                items={items[order]?.children}
                className={classNames(!disableIndent && 'ps-4', className)}
                color={color}
                disableIndent={disableIndent}
                draggable={draggable}
                renderItem={renderItem}
              />
            </Collapse>
          )}
        </div>
      ))}
    </>
  );
};

export default ListNested;
