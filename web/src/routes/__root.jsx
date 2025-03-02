import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { logout } from "../api/auth";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link>{" "}
        <Link to="/login">Login</Link>{" "}
        <button onClick={logout}>Logout</button>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
