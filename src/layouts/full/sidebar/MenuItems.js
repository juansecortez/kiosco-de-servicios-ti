
import {
  IconUser,
  IconUserPlus,
  IconLockAccess,
  IconDeviceDesktop,
  IconFolderPlus,
  IconDatabaseImport,
  IconWifi,

  IconTool,
  IconTicket, // Icono de hoja
  IconMap2, // Icono de ubicación
  IconServer, // Icono de recurso
  
  IconPrinter,
  IconUserExclamation,
 
} from '@tabler/icons';
import { IconUsersGroup,IconSubtask} from '@tabler/icons-react';
import {IconChartInfographic,IconChecklist} from '@tabler/icons-react';
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
    icon: IconChecklist,
    href: '/beapproved',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Por finalizar',
    icon: IconSubtask, // Icono de check
    href: '/pendientes',
    adminOnly: true,
  },
  {
    navlabel: true,
    subheader: 'Analitica',
    adminOnly: true,
  },
  
  {
    id: uniqueId(),
    title: 'Tiempo en linea',
    icon: IconChartInfographic, // Icono de recurso
    href: '/devices',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Dashboard Servicio Técnico ',
    icon: IconChartInfographic, // Icono de recurso
    href: '/dbdst',
    adminOnly: true,
  },
  {
    navlabel: true,
    subheader: 'Manejo de Catalogos',
    adminOnly: true,
  },
  
  {
    id: uniqueId(),
    title: 'Control de recursos',
    icon: IconServer, // Icono de recurso
    href: '/recursos',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Control de externos',
    icon: IconUsersGroup, // Icono de recurso
    href: '/externos',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Control de ubicaciones',
    icon: IconMap2,
    href: '/ubicacion',
    adminOnly: true,
  },
  {
    id: uniqueId(),
    title: 'Control de issues',
    icon: IconUserExclamation, // Usando el ícono de exclamación para representar problemas o incidencias
    href: '/issues',
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
    icon: IconTicket, // Un ticket o comprobante
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
    id: uniqueId(),
    title: 'Impresoras *',
    icon: IconPrinter, // Una impresora
    href: '/impresoras',
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
