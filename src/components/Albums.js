import {
  Tree,
  Header,
  Pictures }        from './units';
import {connect}    from 'dva';
import {Col,Modal}  from 'antd';
import styles       from 'Styles/components.less';

const albums = ({display,treeLength,dispatch,currentTree,tree,total,openAll,actions,currentEditTree,single,callBack}) =>(
  <Modal
    visible={ display }
    closable={false}
    footer={null}
    width="1024px"
    height="692px"
    className={styles.albums}>
    <Header dispatch={dispatch} />
    <Col className={styles.main}>
      <Tree/>
      <Pictures single={single} callBack={callBack}/>
    </Col>
  </Modal>
);

function mapStateToProps(state){
  const {display} = state.albums;
  return{
    loading:state.albums.loading,
    display
  }
}

export default connect(mapStateToProps)(albums);
