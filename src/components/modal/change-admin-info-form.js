import {
  ok,
  hide }              from 'Actions/common-modal';
import intl                       from 'react-intl-universal';
import { connect }                from 'dva';
import { Modal,Form,Input }       from 'antd';
import { changeAdminInfoHandler } from 'Actions/layout'

const formItemLayout = {
  labelCol:{ xs:{span:24},sm:{span:4} },
  wrapperCol:{ xs:{span:24},sm:{span:20} }
};

const AdminInfoForm = ({
  id,
  visible,
  dispatch,
  administrator,
  form:{ resetFields,getFieldDecorator,validateFields }}) => (
  <Modal
    visible={visible[id]}
    title={intl.get('ModifyAdminInfo')}
    onOk={ok.bind(null,dispatch,validateFields,changeAdminInfoHandler,id,false)}
    onCancel={ hide.bind(null,dispatch,resetFields,id) }>
    <Form>
      <Form.Item
        {...formItemLayout}
        label={intl.get('NAME')}>
        { getFieldDecorator('username',{
            initialValue:administrator.username,
            rules:[{required: true,message:intl.get('INPUTNAME')}]
          })(<Input placeholder={intl.get('INPUTNAME')}/>)
        }
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label={ intl.get('ADMINTITLE') }>
        { getFieldDecorator('adminTitle',{
          initialValue:administrator.title,
          rules:[{required: true,message:intl.get('INPUTADMINTITLE')}]
        })(<Input placeholder={intl.get('INPUTADMINTITLE')}/>)
        }
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label={ intl.get('CONTACTNUM') }>
        { getFieldDecorator('adminConnect',{
          initialValue:administrator.contactNumber,
          rules:[{required: true,message:intl.get('INPUTCONTACTNUM')}]
        })(<Input placeholder={intl.get('INPUTCONTACTNUM')}/>)
        }
      </Form.Item>
    </Form>
  </Modal>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { administrator } = state.app;
  return { visible,administrator }
}

export default connect(mapStateToProps)(Form.create()(AdminInfoForm))
