import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({
  isAllowed,
  redirectTo = "/",
  children,
}: {
  isAllowed: boolean;
  redirectTo: string;
  children: React.JSX.Element | null;
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

export default ProtectedRoute;
