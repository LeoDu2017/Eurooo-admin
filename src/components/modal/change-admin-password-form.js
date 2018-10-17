import {
  equalPrev,
  ok,
  unequalNext,
  unequalPrev,
  unequalPrevAndEqualNext } from 'Actions/change-admin-password-form';
import { connect }          from 'dva';
import intl                 from 'react-intl-universal';
import { Modal,Form,Input } from 'antd';
import { transparency }     from 'Styles/login-form.less';
import { changePassword }   from 'Actions/layout';
import { hide } from 'Actions/common-modal';

const formItemLayout = {
  labelCol: { xs: { span: 24 },sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 },sm: { span: 18 } },
};

const ChangePasswordForm = ({
  id,
  userID,
  visible,
  dispatch,
  children,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldValue,
    validateFieldsAndScroll,
    resetFields}}) => (
  <Modal
    onCancel={ hide.bind(null,dispatch,resetFields,id) }
    title= { intl.get('PWD') }
    onOk={ ok.bind(null,dispatch,getFieldValue,userID,changePassword) }
    visible={ visible[id] }>
    <Form>
      <Form.Item
        {...formItemLayout}
        label={ intl.get('OLDPASSWORD') }>
        { getFieldDecorator('originalPassword', {
          rules: [{ required: true, message: intl.get('INPUTOLDPASSWORD') },
                  { validator: unequalNext.bind(null,validateFields) }],
        })(
          <Input
            type="password"
            placeholder={ intl.get('INPUTOLDPASSWORD') }/>,
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label={ intl.get('NEWPASSWORD') }>
        {getFieldDecorator('newPassword', {
          rules: [{ required: true, message: intl.get('INPUTNEWPASSWORD') },
                  { validator:unequalPrevAndEqualNext.bind(null,validateFields,getFieldValue,intl.get('INPUTSAME'))}],
        })(
          <Input
            type="password"
            placeholder={intl.get('INPUTNEWPASSWORD')}/>,
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label={ intl.get('RENEWPASSWORD')}>
        {getFieldDecorator('renewPassword', {
          rules: [{ required: true, message: intl.get('INPUTRENEWPASSWORD') },
                  { validator: equalPrev.bind(null,getFieldValue,intl.get('INPUTUNSAME'))}],
        })(
          <Input
            type="password"
            placeholder={ intl.get('INPUTRENEWPASSWORD') }/>
        )}
      </Form.Item>
    </Form>
  </Modal>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { administrator:{id} } = state.app;
  return { visible,userID:id }
}

export default connect(mapStateToProps)(Form.create()(ChangePasswordForm));
