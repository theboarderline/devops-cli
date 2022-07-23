import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Faq,
  Contact,
  User,
  Profile,
  HowWeHelp,
  WhyWeHelp,
  Testimonial,
} from '../pages';

interface PrivateRouteProps {
  component: any;
  path: string;
  data: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  data
}) => {

  // @raza - Please remove this from props... 
  // I would like to use a context provider of some sort
  // instead of relying on props everywhere
  const isAuth = data?.auth?.authToken?.isLogin;
  return (
    <Route
      render={(props) =>
        isAuth ? (
          <Component path={path} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { previous: props.location }
            }}
          />
        )
      }
    />
  );
};

interface BaseRouterProps {
  data: any
}

const BaseRouter: React.FC<BaseRouterProps> = ({ data }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/faq" component={Faq} />
    <Route path="/contact" component={Contact} />
    <PrivateRoute data={data} path="/user/:username" component={User} />
    <PrivateRoute data={data} path="/account" component={User} />
    <PrivateRoute data={data} path="/profile" component={Profile} />
    <Route path="/howwehelp" component={HowWeHelp} />
    <Route path="/whywehelp" component={WhyWeHelp} />
    <Route path="/testimonials" component={Testimonial} />
    {/* <PrivateRoute path="/buyer" component={BuyerSignup} /> */}
  </Switch>
);

export default BaseRouter;
