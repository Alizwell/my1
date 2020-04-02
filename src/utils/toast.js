import { Toast } from 'antd-mobile';

export function successToast() {
  Toast.success('提交成功!!!', 1);
}

export function failToast() {
  Toast.fail('提交失败!!!', 1);
}

export function handleRequestResult (data) {
  console.log(data, '---data')
  if (data.data.StatusCode === 200) {
    successToast();
  } else {
    failToast();
    // console.error(data.data.HttpRequestMessage)
  }
}
