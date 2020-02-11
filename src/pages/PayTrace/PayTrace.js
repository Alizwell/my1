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
import { setTitle } from "../../utils/title";
import { delWithProps } from "../../utils/array";
import FollowUp from "../../components/FollowUp";
import styles from "./PayTrace.module.scss";

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
      }
    };
  }

  componentDidMount() {
    setTitle("回款跟进");
    this.loadTabs0WithLoading();
    this.loadTabs1WithLoading();
    this.loadTabs2WithLoading();
  }

  loadWithLoading = async (loadFun, loadingName) => {
    this.setState({
      [loadingName]: true
    });
    await loadFun();
    this.setState({
      [loadingName]: false
    });
  };

  loadTabs0WithLoading = () =>
    this.loadWithLoading(this.loadDataTabs0, "tabs0Loading");

  loadTabs1WithLoading = () =>
    this.loadWithLoading(this.loadDataTabs1, "tabs1Loading");

  loadTabs2WithLoading = () =>
    this.loadWithLoading(this.loadDataTabs2, "tabs2Loading");

  loaTabs0WithRefresh = () =>
    this.loadWithLoading(this.loadDataTabs0, "tab0Refreshing");
  loaTabs1WithRefresh = () =>
    this.loadWithLoading(this.loadDataTabs1, "tab1Refreshing");
  loaTabs2WithRefresh = () =>
    this.loadWithLoading(this.loadDataTabs2, "tab2Refreshing");

  loadDataTabs0 = () => {
    return unSignedPayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          notHandled: data.data.HttpContent
        });
      }
    });
  };

  loadDataTabs1 = () => {
    return notMortgagePayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handling: data.data.HttpContent[0].List.map(notMortgagePayTraceFormat)
        });
      }
    });
  };

  loadDataTabs2 = () => {
    return mortgagePayTrace().then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handled: data.data.HttpContent[0].List.map(mortgagePayTraceFormat)
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
        <SearchBar
          placeholder="请输入客户姓名、电话(后四位或全号)或置业顾问姓名"
          ref={ref => (this.autoFocusInst = ref)}
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
                <PayTraceList
                  followUpHandle={this.tabs0FollowUp}
                  data={this.state.notHandled}
                />
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
