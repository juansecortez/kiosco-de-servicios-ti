import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const ProfilePage = Loadable(lazy(() => import('../views/dashboard/ProfilePage')));
const UserRegistration = Loadable(
  lazy(() => import('../views/requests/user-registration/UserRegistration')),
);
const ITResource = Loadable(lazy(() => import('../views/requests/it-resource/ITResource')));
const Internet = Loadable(lazy(() => import('../views/requests/internet/Internet')));
const InformationSystems = Loadable(
  lazy(() => import('../views/requests/information-systems/InformationSystems')),
);
const Folders = Loadable(lazy(() => import('../views/requests/folders/Folders')));
const DatabaseA = Loadable(lazy(() => import('../views/requests/data-base/DatabaseA')));
const Earrings = Loadable(lazy(() => import('../views/earrings/Earrings')));
const Approved = Loadable(lazy(() => import('../views/beapproved/BeApproved')));
const Recursos = Loadable(lazy(() => import('../views/recursos/Recursos')));
const Solicitud = Loadable(lazy(() => import('../views/solicitudes/Solicitudes')));
const Servicio = Loadable(lazy(() => import('../views/requests/servicios/servicios')));
const Ubicacion = Loadable(lazy(() => import('../views/ubicaciones/Ubicacion')));
const Impresoras = Loadable(lazy(() => import('../views/solicitudes/Impresoras')));
const Externos = Loadable(lazy(() => import('../views/externos/Externos')));
const Devices = Loadable(lazy(() => import('../views/devices/Devices')));
const DbdST = Loadable(lazy(() => import('../views/dbdServicioTecnico/DbdST')));
const Issue = Loadable(lazy(() => import('../views/issues/Issues')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" replace={true} /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'pendientes', element: <Earrings /> },
      { path: 'beapproved', element: <Approved /> },
      { path: 'impresoras', element: <Impresoras /> },
      { path: 'externos', element: <Externos /> },
      { path: 'recursos', element: <Recursos /> },
      { path: 'issues', element: <Issue /> },
      { path: 'ubicacion', element: <Ubicacion /> },
      { path: 'devices', element: <Devices /> },
      { path: 'dbdst', element: <DbdST /> },
      { path: 'solicitud', element: <Solicitud/> },
      { path: 'requests/user-registration', element: <UserRegistration /> },
      { path: 'requests/it-resource', element: <ITResource /> },
      { path: 'requests/internet', element: <Internet /> },
      { path: 'requests/information-systems', element: <InformationSystems /> },
      { path: 'requests/folders', element: <Folders /> },

      { path: 'requests/database', element: <DatabaseA /> },
      { path: 'requests/servicio', element: <Servicio /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: 'auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
