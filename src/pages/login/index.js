import intl from 'react-intl-universal';
import { connect } from 'dva';
import { Row,Col,Button } from 'antd';
import { handleClick,handleMouseLeave} from 'Actions/loginpage';
import styles from 'Styles/login.less';


const LoginPage = ({dispatch,currentIndex}) => (
  <div className={styles.main}>
    <Row className={styles.header}>
      <Col className={styles.left}>
        <img alt="Eurooo Stock" src={require('Assets/euroooLogo.png')}/>
      </Col>
      <Col className={styles.right}>
        <Button
          htmlType="button"
          onClick={handleClick.bind(null,1,dispatch)}
          className={currentIndex === 1 ? `${styles.btn} ${styles.active}` : styles.btn}>
          {intl.get('LOGIN')}
        </Button>
      </Col>
    </Row>
  </div>
);

function mapStateToProps(state){
  const { currentIndex } = state.login;
  return { currentIndex }
}

export default connect(mapStateToProps)(LoginPage)
