import {Col}          from 'antd';
import Svg            from 'Components/Svg';
import intl           from 'react-intl-universal';
import {
  addSubTree,
  editCurrentTree,
  deleteCurrentTree}  from 'Actions/albums-trees';
import styles         from 'Styles/components.less';


const Tree_actions = ({actions,currentTree,tree,treeLength,dispatch}) => (
  <Col className="actions">
    <ul>
      {
        actions.showAdd &&
        <li onClick={addSubTree.bind(null,currentTree,tree,treeLength,dispatch)}>
          <Svg className="icon" type="add"/>
          {intl.get("ADD")}
        </li>
      }
      {
        actions.showEdit &&
        <li onClick={editCurrentTree.bind(null,currentTree,dispatch)}>
          <Svg className="icon" type="pencil"/>
          {intl.get('RENAME')}
        </li>
      }
      {
        actions.showDelete &&
        <li onClick={deleteCurrentTree.bind(null,currentTree,dispatch)}>
          <Svg className="icon" type="delete"/>
          {intl.get('DELETE')}
        </li>
      }
    </ul>
  </Col>
);

export default Tree_actions;
