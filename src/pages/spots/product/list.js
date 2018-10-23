import {
  Pagination,Popconfirm,
  Table,Tag,Col,
  Button,Divider }          from 'antd';
import {connect}            from 'dva';
import _                    from 'lodash';
import intl                 from 'react-intl-universal';
import { changePageHandel,deleteHandler } from 'Actions/product';
import { formatMoney }      from 'Utils/widget';
import ShowProductInfo      from 'Components/modal/show-product-info';
import EditProductInfo      from 'Components/modal/edit-product-info';

const ProductList = ({
  dispatch,current,
  products,banneds,myBrands,
  productStyles,productSpaces,
  ProductClassifications,total,}) => {
  const columns = [
    {
      title: intl.get('PRODUCTSERIAL'),
      dataIndex:'serial',
      key:'serial',
      align:'center',
      render: text => <p style={{'textAlign':'left'}}>{text}</p>
    },{
      title: intl.get('PRODUCTNAME'),
      dataIndex:'name',
      key:'name',
      align:'center',
      render: text => <p style={{'textAlign':'left'}}>
        <a href="javascript:">{text}</a>
      </p>
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
      render:(text) => {
        let price,num=formatMoney(Number(text.sum).toFixed(2),true);
        switch (Number(text.currency)) {
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
      dataIndex:'sku',
      key:'sku',
      align:'center',
      render: array => array.reduce((sum,i)=>{
        sum = sum + Number(i.stock);
        return sum;
      },0)
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
      render:(text,record) => <span>
        <ShowProductInfo
          productSpaces={productSpaces}
          productStyles={productStyles}
          myBrands={myBrands}
          title={intl.get('PRODUCTVIEW')}
          product={record}
          id={record.id}
          ProductClassifications={ProductClassifications}>
          <a href="javascript:"> {intl.get('VIEW')}</a>
        </ShowProductInfo>
        <Divider type="vertical"/>
        <EditProductInfo
          id={record.id}
          title={intl.get('PRODUCTEDIT')}
          myBrands={myBrands}
          product={record}
          productSpaces={productSpaces}
          productStyles={productStyles}
          classID={record.classification_id}
          ProductClassifications={ProductClassifications}>
          <a href="javascript:"> {intl.get('EDIT')}</a>
        </EditProductInfo>
        <Divider type="vertical"/>
        {
          Number(record.status) ?
          <a href="javascript:">{intl.get('OFFSHELF')}</a> :
          <a href="javascript:">{intl.get('ONSELL')}</a>
        }
        {
          !Number(record.status) && <span>
            <Divider type="vertical"/>
            <Popconfirm
              title="您确定要删除该商品吗?"
              onConfirm={deleteHandler.bind(null,dispatch,record.id)}>
              <a href="javascript:">{intl.get('DELETE')}</a>
            </Popconfirm>
          </span>
        }
      </span>
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

  const { countries,productStyles,productSpaces,ProductClassifications } = state.app;
  const {myBrands,banned} = state.brand;

  let banneds = banned.map(item => {
    const value = item;
    const country = countries.find(i => {
      return i.id === item
    });
    const label = country.name;
    return {value,label}
  });

  return{total,current,banneds,myBrands,products,productStyles,productSpaces,ProductClassifications}
}

export default connect(mapStateToProps)(ProductList)


