import { connect } from 'dva';
import { Modal,Col } from 'antd';
import { show,hide,ok } from 'Actions/common-modal'
import {
  Tree,
  Header,
  Pictures }        from '../units';

const Albums = ({
    dispatch,
    children,
    callBack,
    visible,
    single,
    id
  }) =>
  <span>
    <span onClick={show.bind(null, dispatch, id)}>{children}</span>
    <Modal
      visible={visible[id]}
      closable={false}
      footer={null}
      width="1024px"
      height="692px"
      className="albums">
      <Header dispatch={dispatch} id={id}/>
      <Col className="main">
        <Tree/>
        <Pictures id={id} single={single} callBack={callBack}/>
      </Col>
    </Modal>
  </span>;

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return{ visible }
}

export default connect(mapStateToProps)(Albums)
