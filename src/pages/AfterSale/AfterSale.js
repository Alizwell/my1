import React from "react";
import {
  Tabs,
  List,
  Toast,
  ActivityIndicator,
  PullToRefresh,
  ListView
} from "antd-mobile";
import { connect } from 'react-redux';
import MortgageListItem from "../../components/MortgageListItem";
import { handledMortgageFormat } from "../../adaptor/mortgage.adaptor";
import { AccordionList } from "../../components/AccordionList";
import NoData from "../../components/NoData";
import FollowUp from "../../components/FollowUp";
import styles from "./AfterSale.module.scss";
import { delWithProps } from "../../utils/array";
import SelectSearch from "../../components/SelectSearch";
import { getLoanBank } from "../../service/afterSale.service";
import { getBuGUIDFromStore } from "../../redux/selectors/project.selector";
import { setBankData } from '../../redux/action/project';
import { loanBankFormat, loanBankFilter } from "../../adaptor/loanBank.adaptor";
import {
  getMortgageServiceProcess,
  getCommonFoundServiceProcess,
  getContractServiceProcess
} from "../../service/process.service";

import { serviceProcessFormat } from "../../adaptor/process.adaptor";
import { moneyDivider1000 } from '../../utils/utils';
class AfterSale extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
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
      isListLoading: false,
      followUp: {
        tabs0: [],
        tabs1: [],
        tabs2: []
      },
      dataSource: dataSource,
      params: {},
      loanBank: [],
      serviceProcess: [],
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

    const buGUID = getBuGUIDFromStore();
    getLoanBank({bUGUID: buGUID.join(',')}).then(data => {
      const bankData = data.data.HttpContent ? loanBankFilter(data.data.HttpContent).map(loanBankFormat) : []
      this.setState({
        loanBank: bankData
      });
      this.props.setBankData(bankData)
    });

    switch (this.props.serviceType) {
      case "mortgage": {
        return this.setProcessState(getMortgageServiceProcess);
      }
      case "commonFound": {
        return this.setProcessState(getCommonFoundServiceProcess);
      }
      case "contract": {
        return this.setProcessState(getContractServiceProcess);
      }
      default:
        return;
    }
  }

  setProcessState = fn => {
    fn({}).then(data => {
      this.setState({
        serviceProcess:
          data.data.HttpContent && data.data.HttpContent.length > 0
            ? data.data.HttpContent.map(serviceProcessFormat)
            : []
      });
    });
  };

  setDataSource = data => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    });
  };

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
    return this.props.loadTabs0({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          notHandled: data.data.HttpContent.DataResult.map(handledMortgageFormat),
          tabsTotal0: data.data.HttpContent.TotalMoney
        });
      }
    });
  };

  loadDataTabs1 = (params = {}) => {
    return this.props.loadTabs1({ ...params }).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handling: data.data.HttpContent.DataResult,
          tabsTotal1: data.data.HttpContent.TotalMoney
        });
      }
    });
  };

  loadDataTabs2 = (params = {}) => {
    return this.props
      .loadTabs2({
        ...params,
        pageSize: this.state.pageSize * this.state.pageIndex
      })
      .then(data => {
        if (data.data.StatusCode === 200) {
          this.setState(
            {
              handled: data.data.HttpContent.DataResult.data.map(handledMortgageFormat),
              tabsTotal2: data.data.HttpContent.TotalMoney,
              tabs2hasMore:
                data.data.HttpContent.DataResult.totalCount >
                data.data.HttpContent.DataResult.pageSize
            },
            () => {
              this.setDataSource(this.state.handled);
            }
          );
        }
      });
  };

  onEndReached = async event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (!this.state.tabs2hasMore) {
      return;
    }
    this.setState(
      prevState => ({
        isListLoading: true,
        pageIndex: prevState.pageIndex + 1
      }),
      () => {
        this.props
          .loadTabs2({
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize
          })
          .then(data => {
            if (data.data.StatusCode === 200) {
              this.setState(
                prev => ({
                  handled: prev.handled.concat(
                    data.data.HttpContent.DataResult.data.map(handledMortgageFormat)
                  ),
                  tabs2hasMore:
                    data.data.HttpContent.DataResult.totalCount >
                    data.data.HttpContent.DataResult.pageSize
                }),
                () => {
                  this.setDataSource(this.state.handled);
                }
              );
            }
          });
        this.setState({
          isListLoading: false
        });
      }
    );
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
    if(this.state.followUp.tabs1.length > 0){
      if( this.state.followUp.tabs1[0]['按揭进程'] !== val['按揭进程'] ){
        this.setState(prev => ({
          ...prev,
          followUp: {
            ...prev.followUp,
            tabs1: []
          }
        }))
      }
    }
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
    const { canGetProcess, hideOverdue, customTabs } = this.props;
    const row = (item, sectionID, rowID) => {
      const props = {
        ...item,
        overDueDays: item.mortgageOverdueDays,
        isDataComplete: item.isNoInformationReceived,
        followUpHandle: this.tabs2FollowUp,
        data: item,
        noCheck: true
      };
      return <MortgageListItem key={rowID} {...props} hideOverdue={hideOverdue} />;
    };

    const showFollowup = () => {
      const selectedFollowupState = this.state.followUp['tabs'+ this.state.tabIndex]
      return this.state.followUp["tabs" + this.state.tabIndex].length > 0 ? (
        <FollowUp
          loanBankData={this.state.loanBank}
          serviceProcess={this.state.serviceProcess}
          btns={this.props.followUpBtns}
          saleServiceGUIDs={selectedFollowupState.map(val=> val.SaleServiceGUID)}
          selectedSequence={Array.isArray(selectedFollowupState) ? selectedFollowupState[0].Sequence : 0}
          resetFollowUp={this.resetFollowUp}
          showParentLoading={this.showParentLoading}
          serviceType={this.props.serviceType}
          isAfterSale={true}
        />
      ) : null;
    };

    const tabs = [
      { title: "未办理", total: this.state.tabsTotal0 },
      { title: "受理中" , total: this.state.tabsTotal1 },
      { title: "已放款" , total: this.state.tabsTotal2 }
    ];

    if (customTabs && Array.isArray(customTabs)) {
      tabs.forEach((item, idx)=>{
        tabs[idx] = {
          ...item,
          ...customTabs[idx]
        }
      })
    }

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
        <SelectSearch
          list={this.props.searchList}
          setParams={this.setParams}
          loadFunc={this["loadTabs" + this.state.tabIndex + "WithLoading"]}
        />
        <Tabs
          tabs={tabs}
          initialPage={this.state.tabIndex}
          onChange={(tab, index) => this.setState({ tabIndex: index })}
          animated={false}
          swipeable={false}
          useOnPan={false}
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
                    {this.state.notHandled.map((item, index) => {
                      const props = {
                        ...item,
                        overDueDays: item.mortgageOverdueDays,
                        isDataComplete: item.isNoInformationReceived,
                        followUpHandle: this.tabs0FollowUp,
                        data: item
                      };
                      return (
                        <MortgageListItem
                          key={item.SaleServiceGUID}
                          {...props}
                          canGetProcess={canGetProcess}
                          hideOverdue={this.props.hideOverdue}
                          selectedItem={this.state.followUp.tabs0}
                        />
                      );
                    })}
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
                    <AccordionList
                      followUpHandle={this.tabs1FollowUp}
                      data={this.state.handling}
                      hideOverdue={this.props.hideOverdue}
                      selectedItem={this.state.followUp.tabs1}
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
            ) : this.state.handled.length > 0 ? (
              <ListView
                dataSource={this.state.dataSource}
                initialListSize={30}
                renderFooter={() => (
                  <div style={{ padding: 30, textAlign: "center" }}>
                    {this.state.isListLoading ? "Loading..." : "Loading..."}
                  </div>
                )}
                renderBodyComponent={() => <List className={styles.list} />}
                renderRow={row}
                className={styles.listView}
                pageSize={1}
                scrollRenderAheadDistance={1000}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={1500}
                pullToRefresh={
                  <PullToRefresh
                    distanceToRefresh={window.devicePixelRatio * 25}
                    direction={this.state.direction}
                    refreshing={this.state.tab2Refreshing}
                    onRefresh={this.loaTabs2WithRefresh}
                    className={'customPullToRefresh'}
                  />
                }
              />
            ) : (
              <NoData onRefresh={this.loaTabs2WithRefresh} />
            )}
          </div>
        </Tabs>
        {showFollowup()}
      </div>
    );
  }
}

AfterSale.defaultProps = {
  hideOverdue: true,
  canGetProcess: false,
  searchList: [0, 1, 2, 3],
  followUpBtns:
    [
      {
        attr: 'bank',
        value: '跟进银行',
        content: {
          title: '跟进银行',
          list: [{
            type: 'Picker',
            category: 'bank',
            props: {},
            label: '按揭银行'
          }]
        }
      },
      {
        attr: 'process',
        value: '跟进进程',
        content: {
          title: '跟进进程',
          list: [{
            type: 'Picker',
            category: 'process',
            props: {},
            label: '服务进程'
          }]
        }
      }
    ]
};

const mapStateToProps = (state)=>({
  projectID: state.project.projGUID
})

export default connect(mapStateToProps, { setBankData })(AfterSale);
