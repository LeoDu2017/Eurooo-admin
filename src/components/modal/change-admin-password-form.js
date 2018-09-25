import { connect } from 'dva';
import intl from 'react-intl-universal';
import { Modal,Form,Input } from 'antd';

import { handleSubmit } from 'Actions/layout';
import { hideModelHandler } from 'Actions/common-modal';
import { unequalNext,unequalPrev,unequalPrevAndEqualNext,equalPrev } from 'Actions/change-admin-password-form';

import { transparency } from 'Styles/login-form.less';
const formItemLayout = {
  labelCol: { xs: { span: 24 },sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 },sm: { span: 18 } },
};
const ChangePasswordForm = ({
  id,
  visible,
  dispatch,
  children,
  form:{getFieldDecorator,validateFields,getFieldValue,validateFieldsAndScroll,resetFields}}) => (
  <Modal
    onCancel={ hideModelHandler.bind(null,dispatch,resetFields,id) }
    title= { intl.get('PWD') }
    visible={ visible[id] }>
    <Form
      onSubmit={ handleSubmit.bind(null,dispatch,validateFieldsAndScroll) }>
      <Form.Item
        {...formItemLayout}
        label={ intl.get('OLDPASSWORD') }>
        {getFieldDecorator('originalPassword', {
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
            placeholder={ intl.get('INPUTRENEWPASSWORD') }/>,
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
