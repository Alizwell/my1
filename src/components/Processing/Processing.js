import React, { useEffect, useState } from 'react';
import { Steps, Flex, Modal, ActivityIndicator } from 'antd-mobile';
import { getProcess, delProcessDetail } from '../../service/process.service';
import { processInfoFormat } from '../../adaptor/process.adaptor';
import moment from 'moment';
import styles from './Processing.module.scss';

const alert = Modal.alert;
const Step = Steps.Step;
const momentFormat = time => moment(time).format('YYYY-MM-DD HH:mm')

const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md" width="20" height="20">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="2">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
    </g>
  </svg>
);

let alertModal = null;

const StepTitle = ({SaleServiceProcGUID, completeDate, title, SaleServiceGUID, setShowLoading, fetchData, stateSaleServiceGUID}, hasDel)=>{
  const handleDel = () =>{
    alertModal = alert('删除', '确认是否删除?', [
      { text: '否', onPress: () => console.log('cancel') },
      { text: '是', onPress: () => {
        setShowLoading(true);
        delProcessDetail({saleServiceProcGUIDs: SaleServiceProcGUID, saleServiceGUID: SaleServiceGUID}).then(data=>{
          fetchData({saleServiceGUID: stateSaleServiceGUID});
        });
      } },
    ])
  }
  return (
    <div>
      <Flex>
        <Flex.Item>{momentFormat(completeDate)} {title}</Flex.Item>
        {hasDel &&
          <Flex.Item className={styles.delWrapper}>
            <span onClick={handleDel} className={styles.delItem}>删除</span>
          </Flex.Item>
        }
      </Flex>
    </div>
  )
}

const StepDesc = ({followPeople, process})=>{
  return (<div>
    <p>{process}</p>
    <p>跟进人: {followPeople}</p>
  </div>)
}



const Processing = ({saleServiceGUID})=>{
  const [showLoading, setShowLoading] = useState(true);
  const [processData, setProcessData ] = useState([])

  const fetchData = async (params) =>{
    setShowLoading(true);
    await getProcess({...params}).then(data=>{
      if(data.data.HttpContent){
        setProcessData(data.data.HttpContent.map(processInfoFormat));
      }
      setShowLoading(false);
    })
  }

  useEffect(()=>{
    fetchData({saleServiceGUID})
    return () => {
      alertModal && alertModal.close();
    }
  }, [saleServiceGUID])

  return (
    <>
      { showLoading
        ? <ActivityIndicator className="loading" size="large" animating={showLoading} />
        : <div className={styles.processing}>
            <p className={styles.record}>记录({processData.length})</p>
            <Steps className={styles.steps}>
              {
                processData.reverse().map((item, index) =>{
                  const hasDel = (index === (processData.length - 1) && index !== 0 ) ? true : false;
                  return <Step status="process" key={index} icon={customIcon()} title={StepTitle({...item, setShowLoading, fetchData, stateSaleServiceGUID: saleServiceGUID}, hasDel)} description={StepDesc(item)} />
                })
              }
            </Steps>
          </div>
      }
    </>
  )
}

export default Processing;
