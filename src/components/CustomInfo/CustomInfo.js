import React, { useState } from "react";
import {
  List,
  InputItem,
  DatePicker,
  Picker,
  TextareaItem,
  Radio,
  Button,
  WhiteSpace,
  WingBlank
} from "antd-mobile";
import styles from "./CustomInfo.module.scss";

const RadioItem = Radio.RadioItem;

const CustomInfo = () => {
  const [formData, setFormData] = useState({
    contractDate: "",
    currencyType: "人民币",
    contractSum: "",
    mortgageYears: "",
    pledgeProcessDate: "",
    pledgeFinishDate: "",
    mortgageLoan: "",
    remark: ""
  });

  const onRadioChange = val => {
    setFormData(prev => ({
      ...prev,
      radioData: val
    }));
  };
  const onInputChange = (name, val) => {
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const onDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const pickerData = [
    {
      label: "春",
      value: "春"
    },
    {
      label: "夏",
      value: "夏"
    }
  ];
  return (
    <>
      <List>
        <Picker
          data={pickerData}
          cols={1}
          value={formData.payMethod}
          onChange={v => onInputChange("payMethod", v)}
          onOk={v => onInputChange("payMethod", v)}
        >
          <List.Item arrow="horizontal">付款方式</List.Item>
        </Picker>
        <DatePicker
          mode="date"
          title="请选择日期"
          extra="请选择"
          value={formData.contractDate}
          onChange={date => onDateChange("contractDate", date)}
        >
          <List.Item arrow="horizontal">签署日期</List.Item>
        </DatePicker>
        <InputItem
          type="money"
          value={formData.contractSum}
          onChange={val => onInputChange("contractSum", val)}
        >
          合同总价
        </InputItem>
        <InputItem
          type="money"
          editable={false}
          moneyKeyboardAlign="right"
          value={formData.currencyType}
        >
          币种
        </InputItem>
        <Picker
          data={pickerData}
          cols={1}
          value={formData.mortgageBank}
          onChange={v => onInputChange("mortgageBank", v)}
          onOk={v => onInputChange("mortgageBank", v)}
        >
          <List.Item arrow="horizontal">按揭银行</List.Item>
        </Picker>
        <InputItem
          type="number"
          value={formData.mortgageYears}
          onChange={val => onInputChange("mortgageYears", val)}
        >
          按揭年限
        </InputItem>
        <InputItem
          type="money"
          value={formData.mortgageLoan}
          onChange={val => onInputChange("mortgageLoan", val)}
        >
          按揭贷款
        </InputItem>
        <InputItem type="text">业务员</InputItem>
        <DatePicker
          mode="date"
          title="请选择日期"
          extra="请选择"
          value={formData.pledgeProcessDate}
          onChange={date => onDateChange("pledgeProcessDate", date)}
        >
          <List.Item arrow="horizontal">承若办理时间</List.Item>
        </DatePicker>
        <DatePicker
          mode="date"
          title="请选择日期"
          extra="请选择"
          value={formData.pledgeFinishDate}
          onChange={date => onDateChange("pledgeFinishDate", date)}
        >
          <List.Item arrow="horizontal">承若完成时间</List.Item>
        </DatePicker>
        <InputItem type="phone">对接人员</InputItem>
        <InputItem type="phone">未收到的资料</InputItem>
        <List.Item>
          <div className={styles.wrapRadio}>
            <span>是否收齐:</span>
            <RadioItem
              className={styles.radioItem}
              key={0}
              checked={0 === formData.radioData}
              onChange={() => onRadioChange(0)}
            >
              未收齐
            </RadioItem>
            <RadioItem
              className={styles.radioItem}
              key={1}
              checked={1 === formData.radioData}
              onChange={() => onRadioChange(1)}
            >
              收齐
            </RadioItem>
          </div>
        </List.Item>
        <TextareaItem
          title="备注"
          autoHeight
          value={formData.remark}
          onChange={val => onInputChange("remark", val)}
        />
      </List>
      <WingBlank>
        <Button type="primary">提交</Button>
        <WhiteSpace />
      </WingBlank>
    </>
  );
};

export default CustomInfo;
