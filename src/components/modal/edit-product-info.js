import { connect } from 'dva';
import { Modal,form } from 'antd';
import { show,hide,ok } from 'Actions/common-modal';
const EditProductInfoFrom = ({ title,visible,dispatch,child }) => (
  <span>
    <span onClick={show.bind(null,dispatch,`edit-${id}`)}>{ child }</span>
    <Modal
      title={ title }
      width={ 1000 }
      visible={ visible[`edit-${id}`] }>

    </Modal>
  </span>
);
function mapStateToProps(state){
  const { visible } = state.commonModal;
  return { visible }
}
export default connect(mapStateToProps)(Form.create()(EditProductInfoFrom))
