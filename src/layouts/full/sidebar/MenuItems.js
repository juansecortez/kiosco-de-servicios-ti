import {
  IconUser,
  IconUserPlus,
  IconLockAccess,
  IconDeviceDesktop,
  IconFolderPlus,
  IconDatabaseImport,
  IconWifi,
  IconListCheck,
  IconTool
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Perfil',
  },
  {
    id: uniqueId(),
    title: 'Perfil',
    icon: IconUser,
    href: '/profile',
  },
  {
    navlabel: true,
    subheader: 'Pendientes',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Por aprobar',
    icon: IconListCheck, // Aquí puedes cambiar el ícono si deseas.
    href: '/beapproved',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Por finalizar',
    icon: IconTool,
    href: '/pendientes',
    adminOnly: true,
  },
  {
    navlabel: true,
    subheader: 'Manejo de Catalogos',
    adminOnly: true,
  },
  
  {
    id: uniqueId(),
    title: ' Catalogo de recursos',
    icon: IconTool,
    href: '/recursos',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: ' Catalogo de ubicaciones',
    icon: IconTool,
    href: '/ubicacion',
    adminOnly: true,
  },
  {
    navlabel: true,
    subheader: 'Manejo de Servicio Técnico',
    adminOnly: true,
  },
  
  {
    id: uniqueId(),
    title: 'Tickets',
    icon: IconTool,
    href: '/solicitud',
    adminOnly: true,
  },
  {
    navlabel: true,
    subheader: 'Servicio Técnico',
  },
  {
    id: uniqueId(),
    title: 'Servicio técnico',
    icon: IconTool,
    href: '/requests/servicio',
  },
  {
    navlabel: true,
    subheader: 'Solicitudes',
  },
  {
    id: uniqueId(),
    title: 'Alta de usuarios',
    icon: IconUserPlus,
    href: '/requests/user-registration',
  },
  {
    id: uniqueId(),
    title: 'Acceso a sistemas de información',
    icon: IconLockAccess,
    href: '/requests/information-systems',
  },
  {
    id: uniqueId(),
    title: 'Recurso informático',
    icon: IconDeviceDesktop,
    href: '/requests/it-resource',
  },
  {
    id: uniqueId(),
    title: 'Acceso a carpetas',
    icon: IconFolderPlus,
    href: '/requests/folders',
  },
  {
    id: uniqueId(),
    title: 'Acceso a base de datos',
    icon: IconDatabaseImport,
    href: '/requests/database',
  },
  {
    id: uniqueId(),
    title: 'Acceso a Internet',
    icon: IconWifi,
    href: '/requests/internet',
  },
  
];

export default Menuitems;
