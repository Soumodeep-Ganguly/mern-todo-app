import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";

const Routes = [
  {
    path: '/signup',
    view: <SignUp />,
    layout: 'auth',
    title: 'SignUp | TODO List'
  },
  {
    path: '/signin',
    view: <SignIn />,
    layout: 'auth',
    title: 'SignIn | TODO List'
  }
]

export default Routes;