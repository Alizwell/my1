import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Checkbox, List, WhiteSpace } from "antd-mobile";
import styles from "./MortgageListItem.module.scss";
import moment from 'moment';

const momentFormat = time => moment(time).format('YYYY-MM-DD HH:mm')
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
    data,
    followUpHandle,
    canGetProcess
  } = props;

  const onChange = (e)=>{
    e.stopPropagation();
    const { checked } = e.target;
    if (checked) {
      followUpHandle && followUpHandle({...data, key: data.tradeGUID}, 'push')
    }else{
      followUpHandle && followUpHandle(data.tradeGUID, 'del')
    }
  }

  let history = useHistory();
  const handleItemClk = (e)=>{
    history.push({ pathname:'/detail',state:{saleServiceGUID}});
    console.log('handleItemClk:', e);
  }

  return (
      <Item className={styles.item}>
        <AgreeItem className={styles.agreeItem} onChange={onChange}>
          <div className={'listItemContent'} onClick={handleItemClk}>
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
                <span>最后一次跟进：{momentFormat(lastProcessingDate)}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="start">
              <Flex.Item>
                <p className={styles.remarkText}>备注：{remark}</p>
              </Flex.Item>
            </Flex>
          </div>
        </AgreeItem>
      </Item>
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
