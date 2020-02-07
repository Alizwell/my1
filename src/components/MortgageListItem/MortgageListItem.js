import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Checkbox, List, WhiteSpace } from "antd-mobile";
import styles from "./MortgageListItem.module.scss";

const AgreeItem = Checkbox.AgreeItem;
const Item = List.Item;
const MortgageListItem = props => {
  let {
    buildingNo,
    customName,
    customPhone,
    remark,
    lastProcessingDate,
    overDueDays,
    isDataComplete,
    saleServiceGUID,
    canGetProcess
  } = props;

  let history = useHistory();
  const handleItemClk = (e)=>{
    history.push({ pathname:'/detail',state:{saleServiceGUID}});
    console.log('handleItemClk:', e);
  }

  return (
    <div>
      <Item className={styles.item} onClick={handleItemClk}>
        <AgreeItem className={styles.agreeItem}>
          <Flex justify="between">
            <Flex.Item>
              <b>{buildingNo}</b>
            </Flex.Item>
            <Flex.Item className={"rightText"}>
              <span>资料是否齐全：{isDataComplete}</span>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex justify="between">
            <Flex.Item>
              <b>{`${customName} ${customPhone}`}</b>
            </Flex.Item>
            <Flex.Item className={"rightText"}>
              <span style={{ color: "red" }}>逾期天数: {overDueDays}</span>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex justify="start">
            <Flex.Item>
              <span>最后一次跟进：{lastProcessingDate}</span>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex justify="start">
            <Flex.Item>
              <span>备注：{remark}</span>
            </Flex.Item>
          </Flex>
        </AgreeItem>
      </Item>
    </div>
  );
};

MortgageListItem.defaultProps = {
  buildingNo: "6栋301test",
  customName: "黄先生test",
  customPhone: "1368***1254",
  remark: "test",
  lastProcessingDate: "test",
  overDueDays: 0,
  isDataComplete: true,
  saleServiceGUID: ''
};

export default MortgageListItem;
