import React, { useEffect, useState } from 'react';
import { Steps, Flex, Modal, ActivityIndicator } from 'antd-mobile';
import { getProcess } from '../../service/process.service';
import { processInfoFormat } from '../../adaptor/process.adaptor';
import moment from 'moment';
import styles from './Processing.module.scss';

const alert = Modal.alert;
const Step = Steps.Step;
const momentFormat = time => moment(time).format('YYYY-MM-DD HH:mm')

const testData = [
  {
    step: 'step0',
    title: '去电',
    content: '移交按揭材料',
    time: '2020-01-03',
    people: '黄先生'
  },
  {
    step: 'step1',
    title: '来访',
    content: '已签按揭合同',
    time: '2020-01-04',
    people: '黄先生'
  },
  {
    step: 'step1',
    title: '来访',
    content: '已签按揭合同',
    time: '2020-01-04',
    people: '黄先生'
  }
]

const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md" width="20" height="20">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="2">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
    </g>
  </svg>
);
const StepTitle = ({completeDate, title}, hasDel)=>{
  const handleDel = ()=>{
    alert('删除', '确认是否删除?', [
      { text: '否', onPress: () => console.log('cancel') },
      { text: '是', onPress: () => console.log('ok') },
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



const Processing = ({SaleServiceGUID})=>{
  const [showLoading, setShowLoading] = useState(true);
  const [processData, setProcessData ] = useState([])
  useEffect(()=>{
    setShowLoading(true);
    const fetchData = async (params) =>{
      await getProcess({}).then(data=>{
        if(data.data.HttpContent){
          setProcessData(data.data.HttpContent.slice(0, 3).map(processInfoFormat));
        }
        setShowLoading(false);
      })
    }
    fetchData({});
    //fetchData({SaleServiceGUID})
    // setShowLoading(false);
  }, [SaleServiceGUID])

  return (
    <>
      { showLoading 
        ? <ActivityIndicator className="loading" size="large" animating={showLoading} />
        : <div className={styles.processing}>
            <p className={styles.record}>记录({processData.length})</p>
            <Steps className={styles.steps}>
              {
                processData.map((item, index) =>{
                  const hasDel = index === (processData.length - 1) ? true : false;
                  return <Step status="process" key={index} icon={customIcon()} title={StepTitle(item, hasDel)} description={StepDesc(item)} />
                })
              }
            </Steps>
          </div>
      }
    </>
  )
}

export default Processing;