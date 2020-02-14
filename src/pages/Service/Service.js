import React from "react";
import { List } from "antd-mobile";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ReactComponent as Contract } from "../../assets/imgs/icon-contract.svg";
import { ReactComponent as Mortgage } from "../../assets/imgs/icon-mortgage.svg";
import { ReactComponent as CommonFound } from "../../assets/imgs/icon-commonFound.svg";
import styles from "./Service.module.scss";

const Item = List.Item;

class Service extends React.Component {
  state = {
    disabled: false
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>售后服务</title>
        </Helmet>
        <List>
          <Item className={styles.thumb} thumb={<Contract />}>
            <Link to="/home/service/contract">合同登记服务</Link>
          </Item>
          <Item className={styles.thumb} thumb={<Mortgage />}>
            <Link to="/home/service/mortgage">按揭贷款服务</Link>
          </Item>
          <Item className={styles.thumb} thumb={<CommonFound />}>
            <Link to="/home/service/commonFound">公积金贷款服务</Link>
          </Item>
        </List>
      </div>
    );
  }
}

export default Service;
