import { connect }            from 'dva';
import {
  List,
  Card,
  Form,
  Checkbox,
  Pagination }                from 'antd';
import { Component }          from 'react';
import {
  pageChangeHandler,
  selectBrandHandler }        from 'Actions/brand-select';

class brandsList extends Component{
  componentDidMount(){
    this.props.onRef(this)
  };
  onReset = () => {
    const {dispatch,form:{resetFields}} = this.props;
    resetFields();
    pageChangeHandler(dispatch,1);
    selectBrandHandler(dispatch,[]);
  };
  render(){
    const { dispatch,form:{getFieldDecorator},list,total,current,onSelect,selected } = this.props;
    return(
      <div>
        <Form>
          <Form.Item style={{'marginBottom':'0'}}>
            {
              getFieldDecorator('userMode',{
                initialValue:selected,
              })(<Checkbox.Group onChange={ onSelect }>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={ list }
                  renderItem={ item => (
                    <List.Item>
                      <Card
                        bodyStyle={{'display':'none'}}
                        extra={<Checkbox value={item}/>}
                        cover={<img alt="example" style={{'padding':'10px'}} src={`${item.logo}@110h_216w_1e_1c`} />}
                        title={item.name}/>
                    </List.Item>
                  )}>
                  <Pagination
                    style={{'margin':'0','float':'right'}}
                    total={total}
                    current={current}
                    pageSize={12}
                    defaultCurrent={1}
                    onChange={pageChangeHandler.bind(null,dispatch)}/>
                </List>
              </Checkbox.Group>)
            }
          </Form.Item>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state){
  let {list,total,current} = state.brands;
  const { selected } = state.brandSelect;
  return {list,total,current,selected}
}

export default connect(mapStateToProps)(Form.create()(brandsList));
