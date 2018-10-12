import {connect} from 'dva';
import {
  Table,Tag,Col,
  Button,Divider }        from 'antd';
import intl               from 'react-intl-universal';

const ProductList = ({dispatch}) => {
  const columns = [
    {
      title: intl.get('PRODUCTSERIAL'),
      dataIndex:'serial',
      key:'serial',
      render: text => text
    },{
      title: intl.get('PRODUCTNAME'),
      dataIndex:'name',
      key:'name',
      render: text => <a href="javascript:">{text}</a>
    },{
      title:intl.get('PRODUCTMAINIMAGE'),
      dataIndex:'image',
      key:'image',
      width:70,
      align:'center',
      render:(data,record) => <img alt={record.name} src={`${data}@55h_155w_1e_1c`}/>
    },{
      title:intl.get('PRODUCTBRAND'),
      dataIndex:'brand',
      key:'brand',
      align:'center',
      render: text => <a href="javascript:">{text}</a>
    },{
      title:intl.get('PRODUCTPRICE'),
      dataIndex:'price',
      key:'price',
      align:'center',
      render:(text,record) => `${record.price_unit} ${text}`
    },{
      title:`${intl.get('PRODUCTAMOUNT')}/pc(s)`,
      dataIndex:'stock',
      key:'stock',
      render: text => text
    },{
      title:intl.get('PRODUCTSTATE'),
      dataIndex:'status',
      key:'status',
      align:'center',
      render: boolean => Number(boolean) ? intl.get('MERCHANTADD') : intl.get('SYSTEM')
    },{
      title:intl.get('ACTION'),
      key: 'action',
      align:'center',
      render:(text,record) => (
        <span>
          你好
        </span>
      )
    }];
  return(
    <Col className='g-t-wrap'>
      <Col className='g-t-main'>
        <header className='g-t-header'>
          <span className='g-t-title'>{intl.get('MYPRODUCTS')}</span>
          <span>

          </span>
        </header>
        <Col className="g-t-form-wrap">
          <Table
            columns={columns} />
        </Col>
        <footer className="g-t-footer">
        </footer>
      </Col>
    </Col>
  )
};

function mapStateToProps(state){
  return{}
}

export default connect(mapStateToProps)(ProductList)
