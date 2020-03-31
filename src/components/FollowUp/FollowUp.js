import React, { useState } from "react";
import ReactDOM from "react-dom";
import { setHandledProcess, setProjectReason, setServiceBank } from '../../service/process.service';
import { getTokenInfoFromCookie } from '../../utils/cookie';
import {
  Button,
  Modal,
  List,
  DatePicker,
  Picker,
  TextareaItem,
  Toast
} from "antd-mobile";
import styles from "./Follow.module.scss";


const checkVal = ({val, name}) => {
  if (!val) {
    Toast.info(`请选择${name}!!!`, 1);
    return false;
  }
  return true;
}

const FollowUpModal = ({onClose, modalContent, payTraceType, pickerData, loanBankData, serviceProcess, payTraceData, saleServiceGUIDs, resetFollowUp, showParentLoading, serviceType, isAfterSale, selectedSequence})=>{
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

        let data = config[item.category] ? config[item.category] : pickerData;
        const label = item.category !== 'mortgage' 
                ? item.label 
                : item.label[payTraceType];

        //需要进行售后服务中的process的进程筛选，需要拿到当前的process sequenece进行对比
        if (isAfterSale) {
          data = data.filter( item => {
            return Number(item.Sequence) > Number(selectedSequence);
          })
        }
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
            {label}
          </List.Item>
        </Picker>);
      }
      case 'DatePicker': {
        const label = item.category !== 'mortgage' 
                ? item.label 
                : item.label[payTraceType];

        return (<DatePicker
          key={idx}
          mode="date"
          title="请选择日期"
          extra="请选择"
          value={modalState[item.attr]}
          onChange={v => onDateChange(item.attr, v)}
        >
          <List.Item arrow="horizontal">{label}</List.Item>
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

  const commitAfterSaleProcess = async ()=>{
    let selectVal = modalState.process;
    let checkResult = checkVal({val: selectVal, name: '进程'});
    let targetItem = serviceProcess.find( v => Number(v.value) === Number(selectVal) );
    if(checkResult && targetItem){
      const tokenInfo = getTokenInfoFromCookie();
      await setHandledProcess({
        saleServiceGUIDs: saleServiceGUIDs.join(';'),
        serviceproc: targetItem && targetItem.ServiceProc,
        jbr: tokenInfo.userName,
        procmemo: ''
      });
    }
  }

  const commitPayTrace = async ()=>{
    let targetItem = payTraceData.find( v => String(v.value) === String(modalState[modalState.category]) );
    if(targetItem){
      await setProjectReason({
        itemGuidList: saleServiceGUIDs.join(';'),
        reason: targetItem && targetItem.ArrearageReasonParamName,
        remark: modalState.remark ? modalState.remark : '',
        bhdate: modalState.closeTime,
        hkdate: modalState.payTraceTime
      })
    }
  }

  const commitBank = async ()=>{
    const config = {
      'commonFound': '公积金',
      'mortgage': '按揭'
    }
  
    let targetItem = loanBankData.find( v => String(v.BankGUID) === String(modalState[modalState.category]) );
    if (targetItem) {
      await setServiceBank({
        saleServiceGUIDlist: saleServiceGUIDs.join(';'),
        serviceitem: config[serviceType],
        bank: targetItem && targetItem.BankName,
        bankyear: 'null'
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
          onPress: async () => {
            if (!modalState.category) {
              return serviceType === 'payTrace' 
                ? Toast.info('请选择原因!!!', 1)
                : Toast.info('请选择数据!!!', 1);
            }
            if (modalState.category === 'process') {
              showParentLoading && showParentLoading();
              await commitAfterSaleProcess();
            } else if (modalState.category === 'bank') {
              showParentLoading && showParentLoading();
              await commitBank();
            } else {
              let selectVal = modalState[modalState.category];
              let checkResult1 = checkVal({val: selectVal, name: '原因'});
              let checkResult2 = checkResult1 && checkVal({val: modalState.closeTime, name: '闭合时间'});
              let checkResult3 = checkResult2 && checkVal({val: modalState.payTraceTime, name: payTraceType === 0 ? '预计签约日期' : '预计回款日期'});
              if (checkResult3) {
                showParentLoading && showParentLoading();
                await commitPayTrace();
              } else { return false;}
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
  payTraceType, //区分tabs0 和tabs1与tabs2  tans0的值为0, tasb1和tabs2的值为1
  payTraceData,
  saleServiceGUIDs,
  resetFollowUp,
  showParentLoading,
  serviceType,
  selectedSequence,
  isAfterSale
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
          showParentLoading={showParentLoading}
          serviceType={serviceType}
          isAfterSale={isAfterSale}
          selectedSequence={selectedSequence}
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
