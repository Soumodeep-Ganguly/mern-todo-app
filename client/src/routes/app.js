import Dashboard from "../pages/dashboard";

const Routes = [
  {
    path: '/',
    view: <Dashboard />,
    layout: 'auth',
    permission: "user",
    title: 'Dashboard | TODO List'
  }
]

export default Routes;