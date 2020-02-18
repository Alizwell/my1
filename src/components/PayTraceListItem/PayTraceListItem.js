import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Checkbox, List, WhiteSpace } from "antd-mobile";
import moment from "moment";
import styles from "./PayTraceListItem.module.scss";

const AgreeItem = Checkbox.AgreeItem;
const CheckboxItem = Checkbox.CheckboxItem;

const Item = List.Item;
const timeFormat = time => moment(time).format("YYYY-MM-DD");
const PayTraceListItem = props => {
  let {
    buildingNo,
    customName,
    paymentMethod,
    overdueDays,
    endDate,
    dataCreated,
    unSignedReason,
    estimatedSigningTime,
    unpaidMoney,
    data,
    followUpHandle,
    canGetProcess
  } = props;

  const onChange = e => {
    e.stopPropagation();
    const { checked } = e.target;
    if (checked) {
      followUpHandle &&
        followUpHandle({ ...data, key: data.tradeGUID }, "push");
    } else {
      followUpHandle && followUpHandle(data.tradeGUID, "del");
    }
  };
  let history = useHistory();

  const handleItemClk = e => {
    history.push({ pathname: "/detail", state: { saleServiceGUID: null } });
  };

  return (
    <div>
      <Item className={styles.item}>
        <CheckboxItem className={styles.agreeItem} multipleLine onChange={onChange}>
          <div className={"listItemContent"}>
            <Flex justify="between">
              <Flex.Item>
                <span>{buildingNo}</span>
              </Flex.Item>
              <Flex.Item className={"rightText"}>
                <span>未回款: {(Number(unpaidMoney) / 10000).toFixed(0) + " 万"}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item>
                <span>{`${customName} 付款方式: ${paymentMethod}`}</span>
              </Flex.Item>
              <Flex.Item className={"rightText"}>
                <span style={{ color: "red" }}>逾期天数: {overdueDays}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item style={{ overflow: "hidden" }}>
                <span>认购日期: {timeFormat(dataCreated)}</span>
              </Flex.Item>
              <Flex.Item className={"rightText"}>
                <span>预计签约日期: {timeFormat(estimatedSigningTime)}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item>
                <span>未签约原因: {unSignedReason}</span>
              </Flex.Item>
              <Flex.Item className={styles.endDate}>
                <span>闭合时间: {timeFormat(endDate)}</span>
              </Flex.Item>
            </Flex>
          </div>
        </CheckboxItem>
      </Item>
    </div>
  );
};

PayTraceListItem.defaultProps = {
  buildingNo: "test",
  customName: "test",
  paymentMethod: "测试",
  overdueDays: 0,
  estimatedSigningTime: "",
  endDate: ''
};

export default PayTraceListItem;
