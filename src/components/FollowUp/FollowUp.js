import React, { useState } from "react";
import ReactDOM from "react-dom";
import { setHandledProcess, setProjectReason } from '../../service/process.service';
import { getTokenInfoFromCookie } from '../../utils/cookie';
import {
  Button,
  Modal,
  List,
  DatePicker,
  Picker,
  TextareaItem
} from "antd-mobile";
import styles from "./Follow.module.scss";

const FollowUpModal = ({onClose, modalContent, payTraceType, pickerData, loanBankData, serviceProcess, payTraceData, saleServiceGUIDs, resetFollowUp})=>{
  const [modalState, setModalState] = useState({
    isVisible: false,
    loanBank: "",
    processDate: "",
    process: "",
    modalType: "bank",
    category: ''
  });

  const onSelectChange = (key, val) => {
    setPartialModalState({ [key]: val, category: key });
  };

  const onDateChange = (key, val) => {
    setPartialModalState({ [key]: val });
  };

  const setPartialModalState = props => {
    setModalState(prev => ({
      ...prev,
      ...props
    }));
  };

  const generateItem = (item, idx)=>{
    switch (item.type) {
      case 'Picker': {
        const config = {
          "bank": loanBankData,
          "process": serviceProcess,
          "mortgage": payTraceData,
          "default": pickerData
        }

        const data = config[item.category] ? config[item.category] : pickerData;
        const lable = item.category !== 'mortgage' 
                ? item.label 
                : item.label[payTraceType];

        return (
        <Picker
          key={idx}
          data={data}
          cols={1}
          value={modalState[item.category]}
          onChange={v => onSelectChange(item.category, v)}
          onOk={v => onSelectChange(item.category, v)}
        >
          <List.Item arrow="horizontal">
            {lable}
          </List.Item>
        </Picker>);
      }
      case 'DatePicker': {
        return (<DatePicker
          key={idx}
          mode="date"
          title="请选择日期"
          extra="请选择"
          value={modalState[item.attr]}
          onChange={v => onDateChange(item.attr, v)}
        >
          <List.Item arrow="horizontal">{item.label}</List.Item>
        </DatePicker>)
      }
      case 'TextareaItem': {
        return (<TextareaItem 
                  key={idx}
                  value={modalState[item.attr]}
                  onChange={v => onDateChange(item.attr, v)} 
                  title={item.label} 
                  rows={2} 
                />)
      }
      default: 
        return <></>;
    }
  }

  const commitAfterSale = ()=>{
    let targetItem = serviceProcess.find( v => Number(v.value) === Number(modalState.process) );
    if(targetItem){
      const tokenInfo = getTokenInfoFromCookie();
      setHandledProcess({
        saleServiceGUIDs: saleServiceGUIDs.join(';'),
        serviceproc: targetItem && targetItem.ServiceProc,
        jbr: tokenInfo.userName,
        procmemo: ''
      });
    }
  }

  const commitPayTrace = ()=>{
    let targetItem = payTraceData.find( v => String(v.value) === String(modalState[modalState.category]) );
    if(targetItem){
      setProjectReason({
        itemGuidList: saleServiceGUIDs.join(';'),
        reason: targetItem && targetItem.ArrearageReasonParamName,
        remark: modalState.remark,
        bhdate: modalState.closeTime,
        hkdate: modalState.payTraceTime
      })
    }
  }

  return (
    <Modal
      className={styles.followUpModal}
      transparent
      visible={true}
      maskClosable={true}
      title={modalContent.title}
      footer={[
        {
          text: "取消",
          onPress: () => onClose()
        },
        {
          text: "提交",
          onPress: () => {
            if (modalState.category === 'process') {
              commitAfterSale();
            } else {
              commitPayTrace();
            }
            onClose()
            resetFollowUp && resetFollowUp();
          }
        }
      ]}
    >
      <List>
        {
          modalContent.list.map((item, idx)=>{
            return (
              generateItem(item, idx)
            )
          })
        }
      </List>
    </Modal>
  )
}

FollowUpModal.defaultProps = {
  modalContent: {
    title: '跟进',
    list: [{
      type: 'DatePicker',
      props: {},
      attr: '',
      label: ''
    }]
  },
  onClose: ()=>{},
  pickerData: [],
  loanBankData: [],
  serviceProcess: []
}


const BottomBtn = ({
  btns,
  loanBankData,
  serviceProcess,
  payTraceType,
  payTraceData,
  saleServiceGUIDs,
  resetFollowUp
})=>{
  const [modalContent, setModalContent] = useState([])
  const [showModal, setShowModal] = useState(false);
  const appRoot = document.getElementById("root");
  const width = (100 / btns.length) + '%';

  const showToast = (item) => {
    setShowModal(true);
    setModalContent(item.content)
  };

  const onCloseModal = ()=>{
    setShowModal(false)
  }

  const content = (
    <div className={styles.fllowUp}>
      {
        btns.map((item, idx)=>{
          return (
              <Button
                key={idx}
                type="primary"
                inline
                style={{ width }}
                onClick={() => showToast(item)}
              >{item.value}</Button>
            )
          }
        )
      }
      {showModal && <FollowUpModal
          onClose={onCloseModal} 
          loanBankData={loanBankData}
          serviceProcess={serviceProcess}   
          modalContent={modalContent }
          payTraceType={payTraceType}
          payTraceData={payTraceData}
          saleServiceGUIDs={saleServiceGUIDs}
          resetFollowUp={resetFollowUp}
        />
      }
    </div>
  );
  return ReactDOM.createPortal(content, appRoot);
}

BottomBtn.defaultProps = {
  btns: [
    {
      attr: 'bank',
      value: '跟进银行',
      modal: {}
    }
  ]
}

export default BottomBtn;
