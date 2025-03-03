// pages/admin/dashboard/index.js
import React, { useState } from 'react';
// import DashboardCore from './components/DashboardCore';
import UsersTable from '@modules/users/components/partials/UsersTable';
import EventsTable from '@modules/events/components/partials/EventsTable';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useAuth from '@modules/auth/hooks/api/useAuth';
import Leftbar from '@common/layout/Leftbar';
import Routes from '@common/defs/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import OrganizerRequestsTable from '@modules/admin/components/organizerRequests/OrganizerRequestesTable';

const AdminDashboard = () => {
  const [isLeftbarOpen, setLeftbarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState('dashboard');
  const { user } = useAuth();
  const userRole=user?.rolesNames[0]
  const router = useRouter();
  const { t } = useTranslation(['common', 'user', 'event']);

  // Function to handle content switching
  const handleContentSwitch = (contentKey:string) => {
    if (userRole =='admin') {
      setActiveContent(contentKey);
    } else {
      // Optionally handle other roles or redirect
      router.push(Routes.Common.Home);
    }
  };

  return (
    <div className="dashboard-container">
      <Leftbar
        open={isLeftbarOpen}
        onToggle={() => setLeftbarOpen(!isLeftbarOpen)}
        onContentChange={handleContentSwitch}
      />
      <div className="content-area">
        {/* {activeContent === 'dashboard' && <DashboardCore />} */}
        {activeContent === 'dashboard' && <OrganizerRequestsTable/>}
        {activeContent === 'users' && <UsersTable />}
        {activeContent === 'events' && <EventsTable />}
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'user', 'event'])),
  },
});

export default AdminDashboard;
