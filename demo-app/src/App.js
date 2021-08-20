import "./App.css";
import routes from "./routes";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./page/LoginPage/LoginPage";
import { useEffect } from "react";
import { authAsync } from "./actions/loginAction";
import { getDataClientAsync } from "./actions/clientAction";
// import { getDataClientAsync } from "./actions/clientAction";

function App() {
  const loginStatus = useSelector((state) => state.login.loginStatus);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      dispatch(authAsync());
    }
  }, []);

  if (accessToken) {
    return (
      <BrowserRouter>
        {/* <Layout>
          <Menu />
          <Header />
        </Layout> */}
        <Switch>
          {routes &&
            routes.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  exact={item.exact}
                  component={item.main}
                />
              );
            })}
        </Switch>
      </BrowserRouter>
    );
  } else return <LoginPage />;
}

export default App;
