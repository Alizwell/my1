import React, { useState } from 'react';
import { List, InputItem, DatePicker, Picker, TextareaItem  } from 'antd-mobile';
import styles from './CustomInfo.module.scss'

const CustomInfo = ()=>{
    const [formData, setFormData] = useState({
      contractDate: '',
      currencyType: '人民币',
      contractSum: '',
      mortgageYears: '',
      pledgeProcessDate: '',
      pledgeFinishDate: '',
      mortgageLoan: '',
      remark: ''
    })

    const onInputChange = (name, val)=>{
      setFormData( prev =>({
        ...prev,
        [name]: val
      }))
    }

    const onDateChange = (name, date)=>{
      setFormData( prev =>({
        ...prev,
        [name]: date
      }))
    }

    const pickerData = [{
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    }]
    return (
        <List>
            <Picker data={pickerData} cols={1}>
              <List.Item arrow="horizontal">付款方式</List.Item>
            </Picker>
            <DatePicker
              mode="date"
              title="请选择日期"
              extra="请选择"
              value={formData.contractDate}
              onChange={date => onDateChange('contractDate', date) }
            >
              <List.Item arrow="horizontal">签署日期</List.Item>
            </DatePicker>
            <InputItem
              type="money"
              value={formData.contractSum}
              onChange={val=>onInputChange('contractSum', val)}
            >合同总价</InputItem>
            <InputItem
              type="money"
              editable="false"
              moneyKeyboardAlign="right"
              value={formData.currencyType}
            >币种</InputItem>
            <Picker data={pickerData} cols={1}>
              <List.Item arrow="horizontal">按揭银行</List.Item>
            </Picker>
            <InputItem
              type="number"
              value={formData.mortgageYears}
              onChange={val=>onInputChange('mortgageYears', val)}
            >按揭年限</InputItem>
            <InputItem
              type="money"
              value={formData.mortgageLoan}
              onChange={val=>onInputChange('mortgageLoan', val)}
            >按揭贷款</InputItem>
            <InputItem
              type="phone"
            >业务员</InputItem>
            <DatePicker
              mode="date"
              title="请选择日期"
              extra="请选择"
              value={formData.pledgeProcessDate}
              onChange={date => onDateChange('pledgeProcessDate', date) }
            >
              <List.Item arrow="horizontal">承若办理时间</List.Item>
            </DatePicker>
            <DatePicker
              mode="date"
              title="请选择日期"
              extra="请选择"
              value={formData.pledgeFinishDate}
              onChange={date => onDateChange('pledgeFinishDate', date) }
            >
              <List.Item arrow="horizontal">承若完成时间</List.Item>
            </DatePicker>
            <InputItem
              type="phone"
            >对接人员</InputItem>
            <InputItem
              type="phone"
            >未收到的资料</InputItem>
            <InputItem
              type="phone"
            >是否收齐</InputItem>
            <TextareaItem
              title="备注"
              autoHeight
              value={formData.remark}
              onChange={val=>onInputChange('remark', val)}
            />
        </List>
    )
}

export default CustomInfo;