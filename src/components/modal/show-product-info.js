import { Form,Modal,Checkbox,Input } from 'antd';
import { connect } from 'dva';
import { showModelHandler,hideModelHandler,okHandler } from 'Actions/common-modal';
import { onChange } from 'Actions/product';


const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const ShowProductModal = ({
  dispatch,children,id,visible,
  content,country,title,banneds,
  countries,areas,Ok,callBack,
  form:{resetFields,getFieldDecorator,validateFields}}) => (
  <span>
    <span onClick={showModelHandler.bind(null,dispatch,id)}>
      { children }
    </span>
    <Modal
      title={title}
      visible={visible[id]}
      onOk={Ok ? okHandler.bind(null,dispatch,validateFields,callBack,id) : okHandler.bind(null,dispatch,null,null,id,true)}
      onCancel={hideModelHandler.bind(null,dispatch,resetFields,id)}>
      <Form>
        你好
      </Form>
    </Modal>
  </span>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return{ visible }
}
export default connect(mapStateToProps)(Form.create()(ShowProductModal));
