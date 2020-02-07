import React, { Component, Suspense } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { Route, Redirect, Switch } from "react-router-dom";
import routes from "./router/router";
import { GlobalStyle } from "./style";
import { userManager } from "./utils/userManager";
import "./index.css";

class App extends Component {
  state = {
    isUserAuthorized: null,
    initialPath: "/home"
  };

  async componentDidMount () {
    const isValid = await this.checkUserAuthorized();
    if(isValid){
      //we need to update user info in redux
      
    }
  }
  checkUserAuthorized = async () => {
    const isUserAuthorized = await userManager.checkUserAuthorized();
    console.log("isUserAuthorized: ", isUserAuthorized);
    this.setState({ isUserAuthorized });
    return isUserAuthorized;
  };

  render() {
    return (
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (route.requiresAuth) {
                    if (this.state.isUserAuthorized === true) {
                      return <route.component />;
                    } else if (this.state.isUserAuthorized === null) {
                      return <div>loading</div>;
                    } else if (this.state.isUserAuthorized === false) {
                      return <Redirect to={{ pathname: "/login" }} />;
                    }
                  } else {
                    return <route.component />;
                  }
                }}
              />
            ))}
            <Redirect path="/" to={{ pathname: this.state.initialPath }} />
          </Switch>
        </Suspense>
        <GlobalStyle />
      </div>
    );
  }
}

export default App;
