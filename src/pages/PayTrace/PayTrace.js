import React from "react";
import {
  Tabs,
  List,
  Toast,
  ActivityIndicator,
  PullToRefresh
} from "antd-mobile";
import { connect } from 'react-redux';
import { PayTraceList } from "../../components/PayTraceList";
import {
  unSignedPayTrace,
  notMortgagePayTrace,
  mortgagePayTrace
} from "../../service/payTrace.service";

import {
  unSignedReasonFormat
} from "../../adaptor/payTrace.adaptor";
import { Helmet } from "react-helmet";
import { delWithProps } from "../../utils/array";
import FollowUp from "../../components/FollowUp";
import styles from "./PayTrace.module.scss";
import SelectSearch from "../../components/SelectSearch";
import NoData from "../../components/NoData";
import { unsignReason, unpaidReason } from "../../service/payTrace.service";
import { moneyDivider1000 } from '../../utils/utils';

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
      tabs0Loading: false,
      tabs1Loading: false,
      tabs2Loading: false,
      followUp: {
        tabs0: [],
        tabs1: [],
        tabs2: []
      },
      params: {},
      unSignReasonData: [],
      unPaidReasonData: [],
      tabsTotal0: 0,
      tabsTotal1: 0,
      tabsTotal2: 0
    };
  }

  componentDidMount() {
    if (this.props.projectID.length === 0) {
      Toast.fail('请选择项目!!!', 2);
    }
    this.loadTabs0WithLoading();
    this.loadTabs1WithLoading();
    this.loadTabs2WithLoading();

    unsignReason({}).then(data => {
      this.setState({
        unSignReasonData: data.data.HttpContent.map(unSignedReasonFormat)
      });
    });

    unpaidReason({}).then(data => {
      this.setState({
        unPaidReasonData: data.data.HttpContent.map(unSignedReasonFormat)
      });
    });
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
          notHandled: data.data.HttpContent.DataResult,
          tabsTotal0: data.data.HttpContent.TotalMoney
        });
      }
    });
  };

  loadDataTabs1 = (params = {}) => {
    return notMortgagePayTrace({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handling: data.data.HttpContent.DataResult,
          tabsTotal1: data.data.HttpContent.TotalMoney
        });
      }
    });
  };

  loadDataTabs2 = (params = {}) => {
    return mortgagePayTrace({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handled: data.data.HttpContent.DataResult,
          tabsTotal2: data.data.HttpContent.TotalMoney
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

  resetHandleData = (index)=>{
    const config = {
      0: 'notHandled',
      1: 'handling',
      2: 'handled'
    }
    this.setState({
      ['tabs'+index+'Loading']: true,
      [config[index]]: []
    })
  }
  showParentLoading = ()=>{
    this.setState({
      ['tabs'+this.state.tabIndex+'Loading']: true
    })
  }

  resetFollowUp = ()=>{
    this.setState( prev => ({
      followUp: {
        ...prev.followUp,
        ['tabs' + prev.tabIndex]: []
      }
    }), async () =>{
      this.resetHandleData(this.state.tabIndex);
      await this['loaTabs'+ this.state.tabIndex +'WithRefresh']();
      if (this.state.tabIndex === 0) {
        this.loaTabs1WithRefresh()
        this.loaTabs2WithRefresh()
      } else if (this.state.tabIndex === 1) {
        this.loaTabs2WithRefresh()
      }
      this.setState({
        ['tabs'+this.state.tabIndex+'Loading']: false
      })
    })
  }

  render() {
    const showFollowup = () => {
      const payTraceData =
        this.state.tabIndex === 0
          ? this.state.unSignReasonData
          : this.state.unPaidReasonData;

      const saleServiceGUIDs = ()=>{
        const collection = this.state.followUp['tabs'+ this.state.tabIndex];
        const config = {
          0: 'orderGUID',
          1: 'FeeGUID',
          2: 'FeeGUID'
        }
        return collection.map(item => item[config[this.state.tabIndex]])
      };
      return this.state.followUp["tabs" + this.state.tabIndex].length > 0 ? (
        <FollowUp
          payTraceType={this.state.tabIndex === 0 ? 0 : 1}
          btns={this.props.followUpBtns}
          payTraceData={payTraceData}
          saleServiceGUIDs={saleServiceGUIDs()}
          resetFollowUp={this.resetFollowUp}
          showParentLoading={this.showParentLoading}
          serviceType={'payTrace'}
        />
      ) : null;
    };

    const tabs = [
      { title: "未签约", total: this.state.tabsTotal0 },
      { title: "非按揭" , total: this.state.tabsTotal1 },
      { title: "按揭" , total: this.state.tabsTotal2 }
    ];
    const renderTab = (tab)=>{
      return (
        <div className={styles.tabItem}>
          <p>{tab.title}</p>
          <p className='money'>({moneyDivider1000(tab.total)}) 万</p>
        </div>
      )
    }
    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>回款跟进</title>
        </Helmet>
        <SelectSearch
          setParams={this.setParams}
          loadFunc={this["loadTabs" + this.state.tabIndex + "WithLoading"]}
          list={[0, 1, 3]}
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
          animated={false}
          swipeable={false}
          useOnPan={false}
          onChange={(tab, index) => this.setState({ tabIndex: index })}
          renderTab={renderTab}
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
                    className={'customPullToRefresh'}
                  >
                    <PayTraceList
                      followUpHandle={this.tabs0FollowUp}
                      data={this.state.notHandled}
                      tabIndex={this.state.tabIndex}
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
                    className={'customPullToRefresh'}
                  >
                    <PayTraceList
                      followUpHandle={this.tabs1FollowUp}
                      data={this.state.handling}
                      tabIndex={this.state.tabIndex}
                    />
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
                    className={'customPullToRefresh'}
                  >
                    <PayTraceList
                      followUpHandle={this.tabs2FollowUp}
                      data={this.state.handled}
                      tabIndex={this.state.tabIndex}
                    />
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
PayTrace.defaultProps = {
  followUpBtns:
    [
      {
        attr: 'unSign',
        value: '跟进',
        content: {
          title: '跟进',
          list: [
            {
              type: 'Picker',
              category: 'mortgage',
              props: {},
              label: ['未签约原因', '欠款原因'],
            },
            {
              type: 'DatePicker',
              category: 'mortgage',
              attr: 'closeTime',
              props: {},
              label: ['闭合时间', '闭合时间']
            },
            {
              type: 'DatePicker',
              category: 'mortgage',
              attr: 'payTraceTime',
              props: {},
              label: ['约定签约日期', '预计回款日期'],
            },
            {
              type: 'TextareaItem',
              category: 'mortgage',
              attr: 'remark',
              props: {},
              label: '备注'
            }
          ]
        }
      }
    ]
}

const mapStateToProps = (state)=>({
  projectID: state.project.projGUID
})

export default connect(mapStateToProps)(PayTrace);

