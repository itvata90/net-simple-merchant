import { Link, useLocation } from 'react-router-dom';
import classes from './management-demo-layout.module.scss';
import List from 'src/core/components/list/list';
import { BsHouse, BsTable, BsFillPersonFill, BsFillShieldFill } from 'react-icons/bs';
import { ItemsObject } from 'src/core/components/list-nested/list-nested';

const ManagementDemoSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const listNested: ItemsObject[] = [
    {
      header: 'Home',
      icon: <BsHouse />,
      props: {
        as: Link,
        to: '/',
        style: {
          display: 'flex',
        },
      },
    },
    {
      subheader: 'Management',
      icon: <BsTable />,
      collapsible: true,
      collapsed: true,
      props: {
        style: {
          display: 'flex',
        },
      },
      children: [
        {
          header: 'Member',
          icon: <BsFillPersonFill />,
          active: pathname.includes('/member'),
          props: {
            as: Link,
            to: '/member',
            style: {
              display: 'flex',
            },
          },
        },
        {
          header: 'Merchant',
          icon: <BsFillShieldFill />,
          active: pathname.includes('/merchant'),
          props: {
            as: Link,
            to: '/merchant',
            style: {
              display: 'flex',
            },
          },
        },
      ],
    },
  ];

  return (
    <div className={`${classes['management-demo-menu']}`} tabIndex={-1}>
      <div>
        <List>
          <List.Nested items={listNested} disableIndent draggable />
        </List>
      </div>
    </div>
  );
};

export default ManagementDemoSidebar;
