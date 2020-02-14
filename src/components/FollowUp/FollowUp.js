import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Modal,
  List,
  DatePicker,
  Picker,
  TextareaItem
} from "antd-mobile";
import styles from "./Follow.module.scss";

const FollowUp = ({
  loanBankData,
  serviceProcess,
  payTraceData,
  payTraceType,
  category
}) => {
  const appRoot = document.getElementById("root");

  const [modalState, setModalState] = useState({
    isVisible: false,
    loanBank: "",
    processDate: "",
    process: "",
    bankData: loanBankData,
    modalType: "bank"
  });

  const onSelectChange = (key, val) => {
    setPartialModalState({ [key]: val });
  };

  const setPartialModalState = props => {
    setModalState(prev => ({
      ...prev,
      ...props
    }));
  };

  const showToast = ({ type }) => {
    setPartialModalState({
      isVisible: true,
      modalType: type
    });
  };

  const modalContent = () => {
    return (
      <Modal
        className={styles.followUpModal}
        visible={modalState.isVisible}
        transparent
        maskClosable={true}
        title="跟进"
        footer={[
          {
            text: "取消",
            onPress: () => setPartialModalState({ isVisible: false })
          },
          {
            text: "提交",
            onPress: () => setPartialModalState({ isVisible: false })
          }
        ]}
        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        // afterClose={() => { alert('afterClose'); }}
      >
        <List>
          {category === "service" ? (
            <>
              {modalState.modalType === "bank" ? (
                <Picker
                  data={modalState.bankData}
                  cols={1}
                  value={modalState.loanBank}
                  onChange={v => onSelectChange("loanBank", v)}
                  onOk={v => onSelectChange("loanBank", v)}
                >
                  <List.Item arrow="horizontal">按揭银行</List.Item>
                </Picker>
              ) : (
                <Picker
                  data={serviceProcess}
                  cols={1}
                  value={modalState.process}
                  onChange={v => onSelectChange("process", v)}
                  onOk={v => onSelectChange("process", v)}
                >
                  <List.Item arrow="horizontal">服务进程</List.Item>
                </Picker>
              )}
              <DatePicker
                mode="date"
                title="请选择日期"
                extra="请选择"
                value={modalState.processDate}
                onChange={date => onSelectChange("processDate", date)}
              >
                <List.Item arrow="horizontal">办理日期</List.Item>
              </DatePicker>
            </>
          ) : (
            <>
              <Picker
                data={payTraceData}
                cols={1}
                value={modalState.payTraceItem}
                onChange={v => onSelectChange("payTraceItem", v)}
                onOk={v => onSelectChange("payTraceItem", v)}
              >
                <List.Item arrow="horizontal">
                  {payTraceType === 0 ? "未签约原因" : "欠款原因"}
                </List.Item>
              </Picker>
              <DatePicker
                mode="date"
                title="请选择日期"
                extra="请选择"
                value={modalState.payTraceDate}
                onChange={date => onSelectChange("payTraceDate", date)}
              >
                <List.Item arrow="horizontal">闭合时间</List.Item>
              </DatePicker>
              <TextareaItem title="备注:" rows={2} />
            </>
          )}
        </List>
      </Modal>
    );
  };
  const content = (
    <div className={styles.fllowUp}>
      {category === "payTrace" ? (
        <Button
          type="primary"
          inline
          style={{ width: "100%" }}
          onClick={() => showToast({ type: "payTrace" })}
        >
          跟进
        </Button>
      ) : (
        <>
          <Button
            type="primary"
            inline
            style={{ width: "50%" }}
            onClick={() => showToast({ type: "bank" })}
          >
            跟进银行
          </Button>
          <Button
            type="primary"
            inline
            style={{ width: "50%" }}
            onClick={() => showToast({ type: "process" })}
          >
            跟进进程
          </Button>
        </>
      )}
      {modalContent()}
    </div>
  );
  return ReactDOM.createPortal(content, appRoot);
};

FollowUp.defaultProps = {
  category: "service"
};

export default FollowUp;
