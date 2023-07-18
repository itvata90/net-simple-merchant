import { useLocation } from 'react-router';
import Container from 'src/core/components/container/container';
import Navbar from 'src/core/components/navbar/navbar';
import classes from './management-demo-layout.module.scss';

const routeName: { [key: string]: string } = {
  '': 'Management Demo',
  merchant: 'Merchant Management',
  member: 'Member Management',
};

const ManagementDemoHeader = () => {
  const routes = useLocation().pathname.split('/');
  return (
    <Navbar background="light" className={`${classes['management-demo-header']}`} expand="lg">
      <Container>
        <Navbar.Brand as="a">
          <div style={{ display: 'flex', placeItems: 'center' }}>
            <img src="/logo.png" alt="logo" width="32" height="32" style={{ marginInlineEnd: 10 }} />
            {/* {routes.map((r: string) => routeName[r]).join(' > ')} */}
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default ManagementDemoHeader;
