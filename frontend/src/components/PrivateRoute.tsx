import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({
  isAllowed,
  redirectTo = "/",
  children,
}: {
  isAllowed: boolean;
  redirectTo: string;
  children: React.JSX.Element;
}) {
  if (!isAllowed) {
    return (
      <>
        <Navigate to={redirectTo} />
      </>
    );
  }

  return (
    <>
      {children ? children : <Outlet />}
    </>
  );
}

export default PrivateRoute;
