import { Form,Modal,Checkbox,Input } from 'antd';
import { connect } from 'dva';
import { show,hide,ok } from 'Actions/common-modal';
import { onChange } from 'Actions/brand';


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

const ShowBrandModal = ({
        dispatch,children,id,visible,
        content,country,title,banneds,
        countries,areas,Ok,callBack,
        form:{resetFields,getFieldDecorator,validateFields}}) => (
    <span>
      <span onClick={show.bind(null,dispatch,id)}>
        { children }
      </span>
      <Modal
        title={title}
        visible={visible[id]}
        onOk={Ok ? ok.bind(null,dispatch,validateFields,callBack,id) : ok.bind(null,dispatch,null,null,id,true)}
        onCancel={hide.bind(null,dispatch,resetFields,id)}>
        <Form>
          <FormItem {...formItemLayout} label='品牌名称' className="g-f-item">
            <Input disabled={true} value={content.name}/>
          </FormItem>
          <FormItem {...formItemLayout} label='品牌logo' className="g-f-item">
            <img src={content.logo}/>
          </FormItem>
          {
            country && (
              <FormItem {...formItemLayout} label='品牌状态' className="g-f-item">
                <Input disabled={true} value={content.title}/>
              </FormItem>
            )
          }
          {
            country && (
              <FormItem {...formItemLayout} label='品牌国家' className="g-f-item">
                <Input disabled={true} value={country}/>
              </FormItem>
            )
          }
          {
            banneds && (
              <FormItem {...formItemLayout} label='品牌禁销国家' className="g-f-item">
                {getFieldDecorator('areas',{
                  initialValue:areas,
                  }
                )( <Checkbox.Group options={ banneds } /> )}
              </FormItem>
            )
          }
        </Form>
      </Modal>
</span>);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return{ visible }
}
export default connect(mapStateToProps)(Form.create()(ShowBrandModal));

