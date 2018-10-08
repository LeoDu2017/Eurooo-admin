import {connect}        from 'dva';
import {Col}            from 'antd';
import Svg              from 'Components/Svg';
import TreeActions      from './Album-treeaction';
import AlbumRanderitems from './Album-randeritems';
import {
  stop,
  getSubTree,
  selectClassify }      from 'Actions/albums-trees';
import intl             from 'react-intl-universal';
import styles           from 'Styles/components.less';

const Tree = ({dispatch,currentTree,openAll,tree,treeLength,currentEditTree,total,actions,openFailsTree}) => (
    <Col className={styles.left}>
      <TreeActions
        actions={actions}
        currentTree={currentTree}
        tree={tree}
        treeLength={treeLength}
        dispatch={dispatch}/>


      <Col className={styles.tree}>
        <dl>
          <dt id="-1"
              className={currentTree === '-1' ? styles.selected : ''}
              onClick={selectClassify.bind(null,'-1','-1',dispatch)}>
                <span onClick={getSubTree.bind(null,'-1',dispatch)}>
                  <Svg className={styles.icon}
                       type={ openAll ? 'folder-open' : 'folder-close'}> </Svg>
                </span>
            <span className={styles.title}>
                  <em>{intl.get('ALL')}</em>(<em>{total}</em>)
                </span>
          </dt>
          <AlbumRanderitems
            tree={tree}
            treeLength={treeLength}
            dispatch={dispatch}
            currentEditTree={currentEditTree}
            styles={styles}
            stop={stop}
            openFailsTree={openFailsTree}
            currentTree={currentTree}
            style={openAll ? {'height':`${treeLength*28}px`}:{'height':"0"}}
          />
        </dl>
      </Col>
    </Col>
);
function mapStateToProps(state){
  const {display,tree,total,currentTree,openAll,actions,currentEditTree,treeLength,openFailsTree} = state.trees;
  return{
    loading:state.trees.loading,
    display,
    tree,
    total,
    currentTree,
    openAll,
    actions,
    currentEditTree,
    treeLength,
    openFailsTree
  }
}
export default connect(mapStateToProps)(Tree);
