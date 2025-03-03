import Routes from '@common/defs/routes';
import { CRUD_ACTION, NavGroup } from '@common/defs/types';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import Namespaces from '@common/defs/namespaces';
import { Group } from '@mui/icons-material';

// export const menuItems: NavGroup[] = [
//   {
//     text: 'Gestion',
//     items: [
//       {
//         text: 'Dashboard',
//         icon: <DashboardCustomizeRoundedIcon />,
//         link: Routes.Common.Home,
//       },
//       {
//         text: 'Users',
//         icon: <Group />,
//         link: Routes.Users.ReadAll,
//         namespace: Namespaces.Users,
//         permission: CRUD_ACTION.READ,
//         routes: Routes.Users,
//       },
//       {
//         text: 'Events',
//         icon: <Group />,
//         link: Routes.Events.ReadAll,
//         namespace: Namespaces.Events,
//         permission: CRUD_ACTION.READ,
//         routes: Routes.Events,
//       },
//     ],
//   },
// ];
// common/defs/menu-items.js
export const menuItems: NavGroup[] = [
  {
    text: 'Gestion',
    items: [
      {
        text: 'Dashboard',
        icon: <DashboardCustomizeRoundedIcon />,
        link: Routes.Common.Home,
        contentKey: 'dashboard', // Add contentKey
      },
      {
        text: 'Users',
        icon: <Group />,
        link: Routes.Users.ReadAll,
        namespace: Namespaces.Users,
        permission: CRUD_ACTION.READ,
        routes: Routes.Users,
        contentKey: 'users', // Add contentKey
      },
      {
        text: 'Events',
        icon: <Group />,
        link: Routes.Events.ReadAll,
        namespace: Namespaces.Events,
        permission: CRUD_ACTION.READ,
        routes: Routes.Events,
        contentKey: 'events', // Add contentKey
      },
    ],
  },
];