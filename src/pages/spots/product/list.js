import {connect} from 'dva';
import _ from 'lodash';
import {
  Pagination,
  Table,Tag,Col,
  Button,Divider }        from 'antd';
import intl               from 'react-intl-universal';
import { changePageHandel } from 'Actions/product';
import { formatMoney } from 'Utils/widget';

const ProductList = ({dispatch,total,current,products,banneds,myBrands,}) => {
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
      dataIndex:'brand_id',
      key:'brand',
      align:'center',
      render: id => {
        const brand = _.find(myBrands,{id});
        return <a href="javascript:">
          <img src={`${brand.logo}@50h_100w_1e_1c`} alt={brand.name}/>
          <br/>
          {brand.name}
        </a>
      }

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
      render: boolean => Number(boolean) ? intl.get('ONSELL') : intl.get('OFFSHELF')
    },{
      title:intl.get('PRODUCTBANNED'),
      dataIndex:'brand_id',
      key:'area',
      align:'center',
      render: id => {
        const area  = Array.isArray(_.find(myBrands,{id}).area) ?
                      _.find(myBrands,{id:id}).area:
                      _.find(myBrands,{id:id}).area.split(',');
        const notAllow =  banneds.filter(banned => area.includes(banned.value));
        let i = 0;
        return notAllow.map(a => <Tag color="red" key={i++}>{a.label}</Tag>)
      }
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
  const { countries } = state.app;
  const {myBrands,banned} = state.brand;

  let banneds = banned.map(item => {
    const value = item;
    const country = countries.find(i => {
      return i.id === item
    });
    const label = country.name;
    return {value,label}
  });

  return{total,current,banneds,myBrands,products}
}

export default connect(mapStateToProps)(ProductList)


