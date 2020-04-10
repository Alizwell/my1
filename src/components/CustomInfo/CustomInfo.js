import React, { useState } from "react";
import { connect } from 'react-redux';
import {
  List,
  InputItem,
  DatePicker,
  Picker,
  TextareaItem,
  Radio,
  Button,
  WhiteSpace,
  WingBlank,
  Toast
} from "antd-mobile";
import cx from 'classnames';
import styles from "./CustomInfo.module.scss";
import { setProcessDetail } from '../../service/process.service';
import { successToast, failToast } from '../../utils/toast';
import { bankDataFormat } from '../../adaptor/bank.adaptor';
import { timeFormat } from '../../utils/utils';

const RadioItem = Radio.RadioItem;
const Item = List.Item;

const CustomInfo = ({detailInfo, bankData}) => {
  const { serviceType, SaleServiceGUID } = detailInfo;
  const [formData, setFormData] = useState({
    ...detailInfo,
  });

  const onInputChange = (name, val) => {
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };


  const onSubmit = ()=>{
    const serviceConfig = {
      "mortgage": "按揭",
      "commonFound": "公积金",
      "contract": "合同登记",
    }
    const sendData = {
      saleServiceGUIDlist: SaleServiceGUID,
      serviceitem: serviceConfig[serviceType],
      djr: formData.dockingPeople ? formData.dockingPeople : '',
      issq: formData.fullMaterial,
      wscl: formData.unreceivedMaterial ? formData.unreceivedMaterial : '', 
      reason: formData.remark,
      ajbank: formData.mortgageBank ? formData.mortgageBank[0]: '',
      ajyear: formData.mortgageYears,
      ajtotal: formData.mortgageMoney,
      ajyqts: formData.mortgageOverdueDate,
      gjjbank: formData.commonFoundBank 
                ? Array.isArray(formData.commonFoundBank)
                  ? formData.commonFoundBank[0] : ''
                : '',
      // gjjbank: 'null',
      gjjyear: formData.commonFoundYears,
      gjjtotal: formData.commonFoundMoney,
      gjjyqts: formData.commonFoundOverdueDate,
      badate: formData.recordDate ? formData.recordDate : '',
      bano: formData.recordNumber ? formData.recordNumber : '',
    }
    Object.keys(sendData).forEach(key=>{
      if(sendData[key] === undefined || sendData[key] === null ){
        sendData[key] = '';
      }
    })

    if (serviceConfig[serviceType] === "按揭") {
      if(sendData.ajtotal === ''){
        return Toast.info('请填写按揭金额');
      }
      if( sendData.ajyear === ''){
        return Toast.info('请填写按揭年限');
      }
    } else if (serviceConfig[serviceType] === "公积金") {
      if(sendData.gjjtotal === ''){
        return Toast.info('请填写公积金金额');
      }
      if( sendData.gjjyear === ''){
        return Toast.info('请填写公积金年限');
      }
    }

    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    try{
      setProcessDetail(sendData).then(data=>{
          Toast.hide();
          if (data.data.StatusCode === 200) {
            successToast();
          } else {
            failToast();
          }
      }).catch(err=>{
        Toast.hide();
        failToast();
      });
    } catch (e) {
      Toast.hide();
      failToast();
    }
  }

  return (
    <>
      <List>
        <Item className={styles.customFlex} extra={detailInfo['房号']}>房号</Item>
        <Item extra={detailInfo['客户姓名']}>客户姓名</Item>
        <Item extra={detailInfo['付款方式']}>付款方式</Item>
        <Item extra={timeFormat(detailInfo['认购日期'])}>认购日期</Item>
        <Item extra={timeFormat(detailInfo['足签日期'])}>足签日期</Item>
        <Item extra={timeFormat(detailInfo['网签日期'])}>网签日期</Item>
        {/* <Item extra={detailInfo['对接人员']}>对接人员</Item> */}
        <Item extra={detailInfo['合同总价']}>合同总价</Item>
        <Item extra={detailInfo['置业顾问']}>置业顾问</Item>
        <div className={cx(styles.customFlex, {[styles.hidden]: serviceType !== 'mortgage'})}>
          <Picker
            data={bankData}
            cols={1}
            value={Array.isArray(formData.mortgageBank) ? formData.mortgageBank : [formData.mortgageBank]}
            onChange={v => onInputChange("mortgageBank", v)}
            onOk={v => onInputChange("mortgageBank", v)}
          >
            <List.Item arrow="horizontal">按揭银行</List.Item>
          </Picker>
        </div>
        <InputItem
          className={cx(styles.textRight, {[styles.hidden]: serviceType !== 'mortgage'})}
          type="number"
          value={formData.mortgageMoney}
          onChange={val => onInputChange("mortgageMoney", val)}
        >
          按揭金额
        </InputItem>
        <div className={cx(styles.customFlex, {[styles.hidden]: serviceType !== 'commonFound'})}>
          <Picker
            data={bankData}
            cols={1}
            value={Array.isArray(formData.commonFoundBank) ? formData.commonFoundBank : [formData.commonFoundBank]}
            onChange={v => onInputChange("commonFoundBank", v)}
            onOk={v => onInputChange("commonFoundBank", v)}
          >
            <List.Item arrow="horizontal">公积金银行</List.Item>
          </Picker>
        </div>
        <InputItem
          className={cx(styles.textRight, {[styles.hidden]: serviceType !== 'commonFound'})}
          type="number"
          value={formData.commonFoundMoney}
          onChange={val => onInputChange("commonFoundMoney", val)}
        >
          公积金金额
        </InputItem>
        <InputItem
          className={cx(styles.textRight, {[styles.hidden]: serviceType !== 'mortgage'})}
          type="number"
          value={formData.mortgageYears}
          onChange={val => onInputChange("mortgageYears", val)}
        >
          按揭年限
        </InputItem>
        <InputItem
          className={cx(styles.textRight, {[styles.hidden]: serviceType !== 'commonFound'})}
          type="number"
          value={formData.commonFoundYears}
          onChange={val => onInputChange("commonFoundYears", val)}
        >
          公积金年限
        </InputItem>
        <List.Item>
          <div className={styles.wrapRadio}>
            <span>是否收齐材料:</span>
            <RadioItem
              className={styles.radioItem}
              key={1}
              checked={1 === formData.fullMaterial}
              onChange={() => onInputChange("fullMaterial", 1)}
            >
              是
            </RadioItem>
            <RadioItem
              className={styles.radioItem}
              key={0}
              checked={0 === formData.fullMaterial}
              onChange={() => onInputChange("fullMaterial", 0)}
            >
              否
            </RadioItem>
          </div>
        </List.Item>
        <InputItem
          className={cx(styles.textRight)}
          type="text"
          value={formData.unreceivedMaterial}
          onChange={val => onInputChange("unreceivedMaterial", val)}
        >
          未收到资料
        </InputItem>
        <InputItem
          className={cx(styles.textRight)}
          type="text"
          value={formData.dockingPeople}
          onChange={val => onInputChange("dockingPeople", val)}
        >
          对接人员
        </InputItem>
        {/* <InputItem
          className={cx(styles.customFlex, styles.textRight, {[styles.hidden]: serviceType !== 'mortgage'})}
          type="number"
          editable={true}
          value={formData.mortgageOverdueDate}
          onChange={val => onInputChange("mortgageOverdueDate", val)}
          >
          按揭逾期天数
        </InputItem> */}
        {/* <InputItem
          className={cx(styles.textRight, {[styles.hidden]: serviceType !== 'commonFound'})}
          type="number"
          editable={true}
          value={formData.commonFoundOverDueDate}
          onChange={val => onInputChange("commonFoundOverDueDate", val)}
          >
          公积金逾期天数
        </InputItem> */}
        <div className={cx({[styles.hidden]: serviceType !== 'contract'})}>
          <DatePicker
            mode="date"
            title="请选择日期"
            extra="请选择"
            value={formData.recordDate}
            onChange={date => onInputChange("recordDate", date)}
          >
            <List.Item  arrow="horizontal">备案日期</List.Item>
          </DatePicker>
        </div>
        <InputItem
          className={cx(styles.textRight, {[styles.hidden]: serviceType !== 'contract'})}
          type="text"
          value={formData.recordNumber}
          onChange={val => onInputChange("recordNumber", val)}
        >
          合同备案号
        </InputItem>
        <TextareaItem
          title="备注"
          autoHeight
          value={formData.remark}
          onChange={val => onInputChange("remark", val)}
        />
      </List>
      <WingBlank>
        <Button type="primary" onClick={onSubmit}>提交</Button>
        <WhiteSpace />
      </WingBlank>
    </>
  );
};

const mapStateToProps = (state)=>({
  detailInfo: state.detail,
  bankData: bankDataFormat(state.project.bankData)
})

export default connect(mapStateToProps)(CustomInfo);
