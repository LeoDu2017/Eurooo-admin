import { connect } from 'dva';
import { Modal,Form,Button } from 'antd';
import { showModelHandler } from 'Actions/commonModal'
import { handleSubmit } from 'Actions/loginpage';
import { login_form,header,login_form_forgot,login_form_button } from 'Styles/login.less';
const FormItem = Form.Item;
const LoginForm = ({
                     dispatch,
                     children,
                     id,
                     visible,
                     loginfail,
                     form: {getFieldDecorator,validateFieldsAndScroll}
                  }) => (
  <span>
    <span onClick={ showModelHandler.bind(dispatch,id) }>{ children }</span>
    <Modal
      visible={ visible[id] }
      align="center">
      <Form onSubmit={handleSubmit.bind(this,dispatch,validateFieldsAndScroll)}
            className={ login_form }>
        <h1 className={ header }>EUROOO ADMIN</h1>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={ login_form_forgot } href="">Forgot password</a>
          <Button  type="primary" htmlType="submit" className={ login_form_button }>
            Log in
          </Button>
        </FormItem>
        {
          loginfail && <p>用户名或密码错误</p>
        }
      </Form>
    </Modal>
  </span>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { loginfail} = state.login;
  return{ visible,loginfail }
}

export default connect(mapStateToProps)(Form.create()(LoginForm))
