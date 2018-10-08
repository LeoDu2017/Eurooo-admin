import intl from 'react-intl-universal';
import {Col,Button,Input} from 'antd';
import styles from 'Styles/components.less';

const Pic_actions = () =>(
  <Col className="actions">
    <Col className="_left">
      <Button className="upBtn"> {intl.get('UPLOAD')} </Button>
      <Button className="premaryBtn"> {intl.get('MOVEIMG')} </Button>
      <Button className="premaryBtn"> {intl.get('MOVECLASS')} </Button>
      <Button type="danger" className="deleteBtn"> {intl.get('DELETESELECTED')} </Button>
    </Col>
    <Col className="_right">
      <Input
        className="input"
        type="text"
        placeholder={intl.get('SERCHHOLDER')}/>
      <Button
        className="premaryBtn border"> {intl.get('SEARCH')} </Button>
    </Col>
  </Col>
);

export default Pic_actions;
