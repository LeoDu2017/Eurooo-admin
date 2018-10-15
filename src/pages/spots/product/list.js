import {connect} from 'dva';
import {
  Pagination,
  Table,Tag,Col,
  Button,Divider }        from 'antd';
import intl               from 'react-intl-universal';
import { changePageHandel } from 'Actions/product';
import { formatMoney } from 'Utils/widget';
const ProductList = ({dispatch,total,current,products}) => {
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
      dataIndex:'master_img',
      key:'master_img',
      width:70,
      align:'center',
      render:(data,record) => <img alt={record.name} src={`${data}@100h_100w_1e_1c`}/>
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
      render:(text,record) => {
        let price,num=formatMoney(Number(text).toFixed(2),true);

        switch (Number(record.price_unit)) {
          case 0:
            price = `$ ${num}`;
            break;
          case 1:
            price = `￥ ${num}`;
            break;
          case 2:
            price = `€ ${num}`;
            break;
        }
        return <p style={{'textAlign':'right'}}>{price}</p>
      }
    },{
      title:`${intl.get('PRODUCTAMOUNT')}/pc(s)`,
      dataIndex:'stock',
      key:'stock',
      align:'center',
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
            columns={columns}
            dataSource={products}
            pagination={{ hideOnSinglePage:true }}/>
        </Col>
        <footer className="g-t-footer">
          <Pagination
          total={total}
          current={current}
          pageSize={3}
          onChange={changePageHandel.bind(null,dispatch)}/>
        </footer>
      </Col>
    </Col>
  )
};

function mapStateToProps(state){
  const {total,current,products} = state.product;

  return{total,current,products}
}

export default connect(mapStateToProps)(ProductList)


