import {Col,Button,Input} from 'antd';
import Svg                from 'Components/Svg';
import intl               from 'react-intl-universal';
import {
  getSubTree,
  saveSubTree,
  saveEditTree,
  selectClassify }        from 'Actions/albums-trees';

const AlbumRanderitems = ({
  style,
  tree,
  subClass,
  treeLength,
  currentTree,
  dispatch,
  currentEditTree,
  styles,
  stop,
  openFailsTree}) =>
  {
    let i = 0;
    return <dd style={style}>
      {
        tree.map((item,index) => {
            let dl =  <dl key={item.id} style={{'top':`${i/treeLength * 100}%`,
                                                'zIndex':`${-i+100}`,
                                                'left': '10px',
                                                'right':'10px',
                                                'height':item.id === currentTree && item.open ? `${(item.subFolder.length + 1)*28}px` : '28px'}}>
              <dt onClick={selectClassify.bind(null,item.id,item.actions_type,dispatch) }
                  className={currentTree === item.id ? 'selected subClass' : 'subClass' }
                  id={item.id}>
                  <span onClick={getSubTree.bind(null,item.id,dispatch)}>
                    <Svg className={item.id === openFailsTree ? 'icon info' : 'icon'}

                         type={ item.open ? 'folder-open' : 'folder-close'}>
                    </Svg>
                  </span>
                  <span className={item.id === currentEditTree ?'title hide' : 'title'}
                        style={item.id === openFailsTree ? {'color':'#F8AC59'} : {}}>
                    <em>{item.name}</em>
                    (<em>{item.picNum}</em>)
                  </span>
                  {
                    item.id !=='0' &&
                    <Col className="editBox">
                      {
                        item.add ? <Input
                          type="text"
                          className={item.id === currentEditTree ? 'ipt show' : 'ipt'}
                          name="rename"
                          onClick={stop}
                          placeholder={item.placeholder}/> : <Input
                          type="text"
                          className={item.id === currentEditTree ? 'ipt show' : 'ipt'}
                          name="rename"
                          onClick={stop}
                          defaultValue={item.name}/>
                      }

                      {
                        item.add ? (<Button
                          onClick={saveSubTree.bind(this,dispatch,item.parent_id)}
                          className={item.id === currentEditTree ? 'btn show' : 'btn'}>
                          {intl.get("ADD")}
                        </Button>) : <Button
                          onClick={saveEditTree.bind(this,dispatch,item.id)}
                          className={item.id === currentEditTree ? 'btn show' : 'btn'}>
                          {intl.get("SAVE")}
                        </Button>
                      }
                    </Col>
                  }
              </dt>
              {
                item.subFolder.length > 0
                && <AlbumRanderitems
                  tree={item.subFolder}
                  dispatch={dispatch}
                  currentEditTree={currentEditTree}
                  styles={styles}
                  stop={stop}
                  currentTree={currentTree}
                  style={{'height':`${item.subFolder.length*28}px`}}
                  subClass = 'subitem'
                  treeLength = {item.subFolder.length}
                  openFailsTree = {openFailsTree}
                />
              }
            </dl>;
          let length = item.subFolder.length + 1;
          i += length;
          return dl
          }
        )
      }
    </dd>
};

export default AlbumRanderitems
