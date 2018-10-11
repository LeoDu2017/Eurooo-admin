import intl from "react-intl-universal";
import { connect } from 'dva';
import { Form,Modal,Input } from 'antd';
import {
  okHandler,
  hideModelHandler }    from 'Actions/common-modal';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
// okHandler(dispatch,validateFields,callBack,id)
// dispatch,resetFields,id
const UploadBrandForm = ({
  id,dispatch,visible,title,callBack,form:{validateFields,resetFields,getFieldDecorator}}) => (
  <span>
    <Modal
      title={ title }
      onOk={ okHandler.bind(null,dispatch,validateFields,callBack,id) }
      onCancel={ hideModelHandler.bind(null,dispatch,resetFields,id)}
      visible={ visible[id] }>
      <Form>
        <FormItem
          {...formItemLayout}
          label={intl.get('USERNAME')}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username"/>)}
        </FormItem>
      </Form>
    </Modal>
  </span>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return { visible }
}

export default connect(mapStateToProps)(Form.create()(UploadBrandForm))
