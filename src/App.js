import React, { Component, Suspense } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import routes from "./router/router";
import { GlobalStyle } from "./style";
import { updateAuth } from "./redux/action/user";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPath: "/home",
      isUserAuthorized: this.props.isUserAuthorized
    };
  }

  // async componentWillMount() {
  //   console.log("componentWillMount 1");
  //   await this.props.updateAuth();
  //   console.log("componentWillMount 2");
  // }

  componentDidMount() {
    console.log("didmount 1");
    // await this.props.updateAuth();
    console.log("didmount 2");
    document.body.addEventListener("focusout", () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  render() {
    const { isUserAuthorized } = this.props;
    console.log("isUserAuthorized:", isUserAuthorized);
    return (
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => {
                  if (route.requiresAuth) {
                    if (isUserAuthorized === true) {
                      return <route.component />;
                    } else if (isUserAuthorized === null) {
                      return <div>loading</div>;
                    } else if (isUserAuthorized === false) {
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

const mapStateToProps = state => {
  return {
    isUserAuthorized: state.userContext.isUserAuthorized
  };
};

export default connect(mapStateToProps, { updateAuth })(App);
