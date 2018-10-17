import { connect } from 'dva';
import { Modal,Form,Button,Icon,Input,Checkbox } from 'antd';
import { show,hide,ok } from 'Actions/common-modal'
import { loginHandler } from 'Actions/loginpage';
import { login_form,header,login_form_forgot,login_form_button } from 'Styles/login.less';
import { transparency,center } from 'Styles/login-form.less';
const FormItem = Form.Item;
const LoginForm = ({
   dispatch,
   children,
   id,
   visible,
   loginFail,
   form: { getFieldDecorator,validateFieldsAndScroll,resetFields },
 }) => <span>
    <span onClick={show.bind(null, dispatch, id)}>{children}</span>
    <Modal
      closable={ false }
      footer={ null }
      width="400px"
      visible={ visible[id] }
      onCancel={ hide.bind(null,dispatch,resetFields,id) }>
      <Form className={ login_form }>
        <h1 className={ `${header} ${center}`}>EUROOO ADMIN</h1>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" className={transparency}/>}
              placeholder="Username"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" className={transparency}/>}
              type="password"
              placeholder="Password"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={login_form_forgot} href="">Forgot password</a>
          <Button
            type="primary"
            htmlType="button"
            className={login_form_button}
            onClick={ok.bind(null,dispatch,validateFieldsAndScroll,loginHandler,id,false)}>
            Log in
          </Button>
        </FormItem>
        {
          loginFail && <p>用户名或密码错误</p>
        }
      </Form>
    </Modal>
  </span>;


function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { loginFail} = state.login;
  return{ visible,loginFail }
}

export default connect(mapStateToProps)(Form.create()(LoginForm))
