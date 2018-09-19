import { connect } from 'dva';
import { Modal,Form,Button,Icon,Input,Checkbox } from 'antd';
import { showModelHandler,hideModelHandler } from 'Actions/common-modal'
import { handleSubmit } from 'Actions/loginpage';
import { login_form,header,login_form_forgot,login_form_button } from 'Styles/login.less';
import { transparency,center } from 'Styles/login-form.less';
const FormItem = Form.Item;
const LoginForm = ({
   dispatch,
   children,
   id,
   visible,
   loginfail,
   form: { getFieldDecorator, validateFieldsAndScroll, resetFields },
 }) => <span>
    <span onClick={showModelHandler.bind(null, dispatch, id)}>{children}</span>
    <Modal
      closable={false}
      footer={null}
      width="400px"
      visible={visible[id]}
      onCancel={hideModelHandler.bind(null, dispatch, resetFields, id)}>
      <Form onSubmit={handleSubmit.bind(this, dispatch, validateFieldsAndScroll)}
            className={login_form}>
        <h1 className={`${header} ${center}`}>EUROOO ADMIN</h1>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" className={transparency}/>} placeholder="Username"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" className={transparency}/>} type="password" placeholder="Password"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={login_form_forgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={login_form_button}>
            Log in
          </Button>
        </FormItem>
        {
          loginfail && <p>用户名或密码错误</p>
        }
      </Form>
    </Modal>
  </span>;


function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { loginfail} = state.login;
  return{ visible,loginfail }
}

export default connect(mapStateToProps)(Form.create()(LoginForm))
