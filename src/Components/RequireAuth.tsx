/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-unused-vars
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/*
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("inne i auth", auth);

  if (!auth) {
    return <Navigate to="/pages/login" state={{ from: location }} replace />;
  }

  const userRoles = auth.roles || [];

  const hasPermission = allowedRoles.some(role => userRoles.includes(role));

  return hasPermission ? (
    <Outlet />
  ) : (
    <Navigate to="/pages/unauthorized" state={{ from: location }} replace />
  );
};
*/

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth &&
    auth.role &&
    auth.role.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : !auth || !auth.user ? (
    <Navigate to="/pages/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/pages/unauthorized" state={{ from: location }} replace />
  );
};

/*
const RequireAuth = ( {allowedRoles} ) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("inne i auth", auth.role)
  console.log("inne i allowedRoles", allowedRoles)

  return (
    auth.roles?.find(role => allowedRoles.includes(role)) 
      ? < Outlet />
      : auth?.user
        ?<Navigate to="/pages/unauthorized" state={{from : location}} replace />
        :<Navigate to="/pages/login" state={{from : location}} replace />
  );
}
*/

/*
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.user
      ? < Outlet />
        :<Navigate to="/pages/login" state={{from : location}} replace />
  );
}
*/

export default RequireAuth;
