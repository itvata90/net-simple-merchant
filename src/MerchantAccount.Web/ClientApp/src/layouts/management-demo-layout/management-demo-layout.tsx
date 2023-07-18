import classes from './management-demo-layout.module.scss';
import Header from './management-demo-layout-header';
import ManagementDemoSidebar from 'src/layouts/management-demo-layout/management-demo-layout-sidebar';

const ManagementDemoLayout = ({ children }: any) => {
  return (
    <div className={classes['management-demo-container']}>
      <Header />
      <ManagementDemoSidebar />
      <div className={classes['management-demo-main']}>{children}</div>
    </div>
  );
};

export default ManagementDemoLayout;
