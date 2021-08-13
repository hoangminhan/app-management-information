import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import routes from "./routes";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout>
        <Menu />
        <Header />
      </Layout> */}
      <Switch>
        {/* <Redirect exact from="/" to="/login" /> */}
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
}

export default App;
