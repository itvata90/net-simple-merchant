import Home from 'src/pages';
interface publicRoutesType {
  path: string;
  component: any | (({ children }: any) => JSX.Element) | null;
  type?: 'default' | 'admin' | 'demo';
}

const publicRoutes: publicRoutesType[] = [{ path: '/*', component: Home, type: 'admin' }];

const privateRoutes: publicRoutesType[] = [];

export { publicRoutes, privateRoutes };
