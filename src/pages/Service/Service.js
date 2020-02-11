import React from "react";
import { List } from "antd-mobile";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
          <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
            <Link to="/home/service/contract">合同登记服务</Link>
          </Item>
          <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">
            <Link to="/home/service/mortgage">按揭贷款服务</Link>
          </Item>
          <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">
            <Link to="/home/service/commonFound">公积金贷款服务</Link>
          </Item>
        </List>
      </div>
    );
  }
}

export default Service;
