import {
  Row,
  Col,
  Button }    from 'antd';
import Link   from 'umi/link';
import Svg    from 'Components/Svg';
import styles from 'Styles/pages.less';
import intl   from 'react-intl-universal';

export default () =>
  <Row className={styles.wrap}>
    <Col span={12} className={styles.wrap}>
      <Col span={24} className={`${styles.wrap} ${styles.panel}`}>
        <Col span={16}>
          <Col className={`${styles.wrap} ${styles.panelBody}`}>
            <Svg className={styles.fs60} type="future"> </Svg>
            <span className={styles.discription}>
                {intl.get('UPTIPF')}
              </span>
            <Button type="primary" className={styles.annular} icon="upload" htmlType="button">
              <Link to={`/futures${location.search}`} className={styles.ml10}>
                {intl.get('UPTITLEF')}
              </Link>
            </Button>
          </Col>
        </Col>
      </Col>
    </Col>
    <Col span={12} className={styles.wrap}>
      <Col span={24} className={`${styles.wrap} ${styles.panel}`}>
        <Col span={16}>
          <Col className={`${styles.wrap} ${styles.panelBody}`}>
            <Svg className={styles.fs60} type="spot"> </Svg>
            <span className={styles.discription}>
                {intl.get('UPTIPS')}
              </span>
            <Button type="primary" className={styles.annular} icon="upload" htmlType="button">
              <Link to={`/spots${location.search}`} className={styles.ml10}>
                {intl.get('UPTITLES')}
              </Link>
            </Button>
          </Col>
        </Col>
      </Col>
    </Col>
  </Row>
