import { Route, RouteProps, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { checkPermissions } from "../utils/permissions";

function PrivateRoute({ permission, ...props }: {props: RouteProps, permission: string}) {
  const user_permissions = checkPermissions();
  const navigate = useNavigate();

  return (
    <>
      {permission == user_permissions ? (
        <>
          <Route {...props} />
        </>
      ) : (
        <>
          
        </>
      )}
    </>
  );
}

export default PrivateRoute;
