import {connect}          from 'dva';
import {Col,Button,Input} from 'antd';
import _                  from "lodash";
import Svg                from 'Components/Svg';
import PicActions         from './Album-actions';
import Controls           from './Album-controls';
import {
  viewImg,
  selectImgs,
  removeSelected }        from 'Actions/albums-pictures';

const Pictures = ({dispatch,list,page,total,selected,length,single,callBack,id}) =>(
  <Col className="right">
    <PicActions/>
    <Col className="imgs">
      <ul>
        {
          list.map((item,index)=>(
            <li key={item.id}>
              <Col className="imgWrap">
                <span className="eye" onClick={viewImg.bind(null,item.file)}>
                  <Svg type="yanjing"/>
                </span>
                <span className="select" onClick={selectImgs.bind(null,dispatch,item.id,single)}>
                  <Svg type="correct"/>
                </span>
                <img alt="img" src={item.file}/>
              </Col>

              <Col className="edit">
                <span><Svg className="icon" type="pencil"/></span>
                <p>{item.name}</p>
                <Col className="nameEdit">
                  <Input
                    type="text"
                    defaultValue={item.name}
                    name="rename"
                    className="fileName"/>
                  <Button className="renameImg">确定</Button>
                </Col>
              </Col>
              {
                _.find(selected, {id:item.id}) &&
                <Col className="mask">
                  <span className="selected">
                    <Svg type="correct"/>
                  </span>
                  <span className="close" onClick={removeSelected.bind(null,dispatch,item.id)}>
                    <Svg type="close"/>
                  </span>
                </Col>
              }
            </li>
          ))
        }
      </ul>
    </Col>
    <Controls
      id={id}
      current={page}
      callBack={callBack}
      total={total}
      dispatch={dispatch}
      length={length}
      selected={selected}/>
  </Col>
);
function mapStateToProps(state){
  const {list,page,total,selected} = state.albumsPictures;
  const length = selected.length;
  return {
    list,
    page,
    total,
    selected,
    length
  }
}

export default connect(mapStateToProps)(Pictures)
