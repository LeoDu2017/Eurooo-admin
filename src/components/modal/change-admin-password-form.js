import { connect } from 'dva';
import { hideModelHandler } from 'Actions/common-modal';
import { handleSubmit } from 'Actions/layout';
import { Modal,Form,Input } from 'antd';
import { transparency } from 'Styles/login-form.less';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const ChangePasswordForm = ({
        id,
        visible,
        dispatch,
        children,
        form:{getFieldDecorator,validateFieldsAndScroll,resetFields}}) => (
        <Modal
          onCancel={ hideModelHandler.bind(null,dispatch,resetFields,id) }
          title="修改密码"
          visible={ visible[id] }>
          <Form
            onSubmit={ handleSubmit.bind(null,dispatch,validateFieldsAndScroll) }>
            <Form.Item
              {...formItemLayout}
              label="旧密码">
              {getFieldDecorator('originalPassword', {
                rules: [{ required: true, message: 'Please input your original password!' }],
              })(
                <Input
                  placeholder="Please input your original password!"/>,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="新密码">
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: 'Please input your new password!' }],
              })(
                <Input
                  placeholder="Please input your new password!"/>,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="再次输入新密码">
              {getFieldDecorator('renewPassword', {
                rules: [{ required: true, message: 'Please input your new password!' }],
              })(
                <Input
                  placeholder="Please input your new password!"/>,
              )}
            </Form.Item>
          </Form>
        </Modal>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return { visible }
}

export default connect(mapStateToProps)(Form.create()(ChangePasswordForm))
