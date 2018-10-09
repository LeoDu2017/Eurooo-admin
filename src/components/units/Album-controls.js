import {Col,Button,Pagination}  from 'antd';
import intl                     from 'react-intl-universal';
import {getPictures}            from 'Actions/albums-pictures';

const Controls = ({dispatch,current,total,length,selected,callBack,id})=>(
  <Col className="ctrls">
    <Button
      className="premaryBtn"
      onClick={ callBack.bind(null,dispatch,selected,id)}>
      {intl.get('USESELECTED')} ({length})
    </Button>
    <Pagination
      className="pages"
      total={total}
      current={current}
      onChange={ getPictures.bind(null,dispatch) }
    />
  </Col>
);
export default Controls;
