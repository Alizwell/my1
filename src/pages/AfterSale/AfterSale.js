import React from "react";
import { SearchBar, Tabs, List, ActivityIndicator } from "antd-mobile";
import MortgageListItem from "../../components/MortgageListItem";
import {
  handledMortgageFormat
} from "../../adaptor/mortgage.adaptor";
import { AccordionList } from "../../components/AccordionList";
import styles from "./AfterSale.module.scss";

const tabs = [{ title: "未办理" }, { title: "受理中" }, { title: "已放款" }];

class AfterSale extends React.Component {
  state = {
    notHandled: [],
    handling: [],
    handled: [],
    showLoading: true,
  };

  componentDidMount() {
    this.loadDataTabs0()
  }

  tabChange = (tab, index) => {
    switch (index) {
      case 0: {
        return this.loadDataTabs0();
      }
      case 1: {
        return this.loadDataTabs1();
      }
      case 2: {
        return this.loadDataTabs2();
      }
      default:
        return "";
    }
  };

  loadDataTabs0 = async () => {
    this.setState({
      showLoading: true
    })
    await this.props.loadTabs0({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          notHandled: data.data.HttpContent.map(handledMortgageFormat)
        });
      }
    });
    this.setState({
      showLoading: false
    })
  };

  loadDataTabs1 = async () => {
    this.setState({
      showLoading: true
    })
    await this.props.loadTabs1({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handling: data.data.HttpContent
        });
      }
    });
    this.setState({
      showLoading: false
    })
  };

  loadDataTabs2 = async () => {
    this.setState({
      showLoading: true
    })
    // await this.props.loadTabs2({}).then(data => {
    //   if (data.data.StatusCode === 200) {
    //     this.setState({
    //       handled: data.data.HttpContent.data.map(handledMortgageFormat)
    //     });
    //   }
    // });
    this.setState({
      showLoading: false
    })
  };

  render() {
    const { canGetProcess } = this.props;
    return (
      <div className={styles.wrapper}>
        <SearchBar
          placeholder="请输入客户姓名、电话(后四位或全号)或置业顾问姓名"
          ref={ref => (this.autoFocusInst = ref)}
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
          animated={false}
          useOnPan={false}
          onChange={this.tabChange}
        >
          <div className={styles.listWrapper}>
            { this.state.showLoading 
            ? <ActivityIndicator className="loading" size="large" animating={this.state.showLoading} />
            : <List className={styles.list}>
                {this.state.notHandled.map((item, index)=> {
                  const props = {
                    ...item,
                    overDueDays: item.mortgageOverdueDays,
                    isDataComplete: item.isNoInformationReceived
                  };
                  return <MortgageListItem key={index} {...props} canGetProcess={canGetProcess} />;
                })}
              </List>
            }
          </div>
          <div className={styles.listWrapper}>
            { this.state.showLoading 
              ? <ActivityIndicator className="loading" size="large" animating={this.state.showLoading} />
              : <List className={styles.list}>
                  <AccordionList data={this.state.handling} />
                </List>
            }
          </div>
          <div className={styles.listWrapper}>
            { this.state.showLoading 
              ? <ActivityIndicator className="loading" size="large" animating={this.state.showLoading} />
              : <List className={styles.list}>
                  {this.state.handled.map((item, index) => {
                    const props = {
                      ...item,
                      overDueDays: item.mortgageOverdueDays,
                      isDataComplete: item.isNoInformationReceived
                    };
                    return <MortgageListItem key={index} {...props} canGetProcess={canGetProcess} />;
                  })}
                </List>
            }
          </div>
        </Tabs>
      </div>
    );
  }
}

AfterSale.defaultProps = {
    canGetProcess: false
}

export default AfterSale;
