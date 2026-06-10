import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  return (
    <Route
      {...props}
      render={() =>
        loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default ProtectedRoute;
