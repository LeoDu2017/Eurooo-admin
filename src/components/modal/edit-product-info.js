import { connect } from 'dva';
import { Modal,Form } from 'antd';
import { show,hide,ok } from 'Actions/common-modal';
const EditProductInfoFrom = ({ title,visible,dispatch,children,id }) => (
  <span>
    <span onClick={show.bind(null,dispatch,`edit-${id}`)}>{ children }</span>

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
