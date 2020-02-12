import React from "react";
import {
  SearchBar,
  Tabs,
  List,
  ActivityIndicator,
  PullToRefresh
} from "antd-mobile";
import { PayTraceList } from "../../components/PayTraceList";
import { PayTraceListItem } from "../../components/PayTraceListItem";
import {
  unSignedPayTrace,
  notMortgagePayTrace,
  mortgagePayTrace
} from "../../service/payTrace.service";

import {
  notMortgagePayTraceFormat,
  mortgagePayTraceFormat
} from "../../adaptor/payTrace.adaptor";
import { Helmet } from "react-helmet";
import { delWithProps } from "../../utils/array";
import FollowUp from "../../components/FollowUp";
import styles from "./PayTrace.module.scss";
import SelectSearch from "../../components/SelectSearch";
import NoData from "../../components/NoData";

const tabs = [{ title: "未签约" }, { title: "非按揭" }, { title: "按揭" }];

class PayTrace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSize: 30,
      pageIndex: 1,
      tabs2hasMore: true,
      tabIndex: 0,
      notHandled: [],
      handling: [],
      handled: [],
      direction: "down",
      tab0Refreshing: false,
      tab1Refreshing: false,
      tab2Refreshing: false,
      tabs0Loading: true,
      tabs1Loading: true,
      tabs2Loading: true,
      followUp: {
        tabs0: [],
        tabs1: [],
        tabs2: []
      },
      params: {}
    };
  }

  componentDidMount() {
    this.loadTabs0WithLoading();
    this.loadTabs1WithLoading();
    this.loadTabs2WithLoading();
  }

  loadWithLoading = async (loadFun, loadingName, params = {}) => {
    this.setState({
      [loadingName]: true
    });
    await loadFun(params);
    this.setState({
      [loadingName]: false
    });
  };

  loadTabs0WithLoading = (params = {}) =>
    this.loadWithLoading(this.loadDataTabs0, "tabs0Loading", params);

  loadTabs1WithLoading = (params = {}) =>
    this.loadWithLoading(this.loadDataTabs1, "tabs1Loading", params);

  loadTabs2WithLoading = (params = {}) =>
    this.loadWithLoading(this.loadDataTabs2, "tabs2Loading", params);

  loaTabs0WithRefresh = () =>
    this.loadWithLoading(
      this.loadDataTabs0,
      "tab0Refreshing",
      this.state.params
    );
  loaTabs1WithRefresh = () =>
    this.loadWithLoading(
      this.loadDataTabs1,
      "tab1Refreshing",
      this.state.params
    );
  loaTabs2WithRefresh = () =>
    this.loadWithLoading(
      this.loadDataTabs2,
      "tab2Refreshing",
      this.state.params
    );

  loadDataTabs0 = (params = {}) => {
    return unSignedPayTrace({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          notHandled: data.data.HttpContent
        });
      }
    });
  };

  loadDataTabs1 = (params = {}) => {
    return notMortgagePayTrace({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handling: data.data.HttpContent[0]
            ? data.data.HttpContent[0].List.map(notMortgagePayTraceFormat)
            : []
        });
      }
    });
  };

  loadDataTabs2 = (params = {}) => {
    return mortgagePayTrace({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handled: data.data.HttpContent[0]
            ? data.data.HttpContent[0].List.map(mortgagePayTraceFormat)
            : []
        });
      }
    });
  };

  tabsFollowUp = index => {
    return (val, method) => {
      if (method === "push") {
        this.setState(prev => ({
          followUp: {
            ...prev.followUp,
            ["tabs" + index]: prev.followUp["tabs" + index].concat(val)
          }
        }));
      } else if (method === "del") {
        this.setState(prev => ({
          followUp: {
            ...prev.followUp,
            ["tabs" + index]: delWithProps(
              prev.followUp["tabs" + index],
              "key",
              val
            )
          }
        }));
      }
    };
  };

  tabs0FollowUp = (val, method) => {
    return this.tabsFollowUp(0)(val, method);
  };

  tabs1FollowUp = (val, method) => {
    return this.tabsFollowUp(1)(val, method);
  };

  tabs2FollowUp = (val, method) => {
    return this.tabsFollowUp(2)(val, method);
  };

  setParams = params => {
    this.setState({
      params
    });
  };

  render() {
    const showFollowup = () => {
      return this.state.followUp["tabs" + this.state.tabIndex].length > 0 ? (
        <FollowUp />
      ) : null;
    };
    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>回款跟进</title>
        </Helmet>
        <SelectSearch
          setParams={this.setParams}
          loadFunc={this["loadTabs" + this.state.tabIndex + "WithLoading"]}
          list={[2]}
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
          animated={false}
          swipeable={false}
          useOnPan={false}
          onChange={(tab, index) => this.setState({ tabIndex: index })}
        >
          <div className={styles.listWrapper}>
            {this.state.tabs0Loading ? (
              <ActivityIndicator
                className="loading"
                size="large"
                animating={this.state.tabs0Loading}
              />
            ) : (
              <List className={styles.list}>
                {this.state.notHandled.length > 0 ? (
                  <PullToRefresh
                    distanceToRefresh={window.devicePixelRatio * 25}
                    direction={this.state.direction}
                    refreshing={this.state.tab0Refreshing}
                    onRefresh={() => this.loaTabs0WithRefresh()}
                    style={{
                      overflow: "auto"
                    }}
                  >
                    <PayTraceList
                      followUpHandle={this.tabs0FollowUp}
                      data={this.state.notHandled}
                    />
                  </PullToRefresh>
                ) : (
                  <NoData onRefresh={this.loaTabs0WithRefresh} />
                )}
              </List>
            )}
          </div>
          <div className={styles.listWrapper}>
            {this.state.tabs1Loading ? (
              <ActivityIndicator
                className="loading"
                size="large"
                animating={this.state.tabs1Loading}
              />
            ) : (
              <List className={styles.list}>
                {this.state.handling.length > 0 ? (
                  <PullToRefresh
                    distanceToRefresh={window.devicePixelRatio * 25}
                    direction={this.state.direction}
                    refreshing={this.state.tab1Refreshing}
                    onRefresh={() => this.loaTabs1WithRefresh()}
                    style={{
                      overflow: "auto"
                    }}
                  >
                    {this.state.handling.map((item, index) => {
                      const props = {
                        ...item,
                        endDate: item.lastDate,
                        unpaidMoney: item.money,
                        followUpHandle: this.tabs1FollowUp,
                        data: item
                      };
                      return <PayTraceListItem key={index} {...props} />;
                    })}
                  </PullToRefresh>
                ) : (
                  <NoData onRefresh={this.loaTabs1WithRefresh} />
                )}
              </List>
            )}
          </div>
          <div className={styles.listWrapper}>
            {this.state.tabs2Loading ? (
              <ActivityIndicator
                className="loading"
                size="large"
                animating={this.state.tabs2Loading}
              />
            ) : (
              <List className={styles.list}>
                {this.state.handled.length > 0 ? (
                  <PullToRefresh
                    distanceToRefresh={window.devicePixelRatio * 25}
                    direction={this.state.direction}
                    refreshing={this.state.tab2Refreshing}
                    onRefresh={() => this.loaTabs2WithRefresh()}
                    style={{
                      overflow: "auto"
                    }}
                  >
                    {this.state.handled.map((item, index) => {
                      const props = {
                        ...item,
                        endDate: item.lastDate,
                        unpaidMoney: item.money,
                        followUpHandle: this.tabs2FollowUp,
                        data: item
                      };
                      return <PayTraceListItem key={index} {...props} />;
                    })}
                  </PullToRefresh>
                ) : (
                  <NoData onRefresh={this.loaTabs2WithRefresh} />
                )}
              </List>
            )}
          </div>
        </Tabs>
        {showFollowup()}
      </div>
    );
  }
}

export default PayTrace;
