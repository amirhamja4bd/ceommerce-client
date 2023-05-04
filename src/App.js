import { Fragment } from "react";
import { Toaster } from 'react-hot-toast';
import { FloatButton } from 'antd';
import { RouterProvider } from "react-router-dom";
import router from "./routes/route";

function App() {
  return (
    <Fragment>

      <RouterProvider router={router}></RouterProvider>

      <Toaster position='top-right'/>
      <FloatButton.BackTop />
    </Fragment>
  );
}

export default App;
