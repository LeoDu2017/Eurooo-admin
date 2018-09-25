import { connect }          from 'dva';
import intl                 from 'react-intl-universal';
import { Modal,Form,Input } from 'antd';
import { hideModelHandler } from 'Actions/common-modal';

const formItemLayout = {
  labelCol:{ xs:{span:24},sm:{span:4} },
  wrapperCol:{ xs:{span:24},sm:{span:20} }
};

const AdminInfoForm = ({
  dispatch,
  id,
  visible,
  administrator,
  form:{ resetFields,getFieldDecorator }}) => (
  <Modal
    visible={visible[id]}
    title={intl.get('ModifyAdminInfo')}
    onCancel={ hideModelHandler.bind(null,dispatch,resetFields,id)} >
    <Form>
      <Form.Item
        {...formItemLayout}
        label={intl.get('NAME')}>
        { getFieldDecorator('name',{
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
