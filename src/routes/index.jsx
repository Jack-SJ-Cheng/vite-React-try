import Layout from "../pages/Layout";
import Signin from "../pages/Signin";
import Upload from "../pages/upload";


const routes = [
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Signin />
  },
  {
    path: '/admin/upload',
    element: <Upload />
  }

]

export default routes;