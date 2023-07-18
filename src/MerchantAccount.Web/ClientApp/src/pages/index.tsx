import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ManagementDemoLayout from 'src/layouts/management-demo-layout/management-demo-layout';
import Loader from 'src/shared/loader';
const MerchantManagement = lazy(() => import('src/shared/demo-management/merchant-management'));
const MemberManagement = lazy(() => import('src/shared/demo-management/member-management'));

const ManagementDemo = () => {
  return (
    <ManagementDemoLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="member" element={<MemberManagement />} />
          <Route path="merchant" element={<MerchantManagement />} />
          <Route path="*" element={<Navigate to="member" replace />} />
        </Routes>
      </Suspense>
    </ManagementDemoLayout>
  );
};

export default ManagementDemo;
