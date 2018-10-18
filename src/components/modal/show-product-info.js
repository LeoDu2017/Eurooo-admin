import _ from 'lodash';
import { Modal,Tabs,Carousel } from 'antd';
import { connect } from 'dva';
import { show,hide,ok } from 'Actions/common-modal';
import { onChange } from 'Actions/product';
import { formatMoney } from 'Utils/widget';
import intl from "react-intl-universal";

const TabPane = Tabs.TabPane;

const ShowProductModal = ({
  dispatch,children,ProductClassifications,
  content,title,banneds,product,productSpaces,id,
  countries,Ok,callBack,myBrands,productStyles,visible }) => {

  let price,num=formatMoney(Number(product.price.sum).toFixed(2),true);
  const brand = _.find(myBrands,{id:product.brand_id});
  switch (Number(product.price.currency)) {
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
  let i = 0;
  const SKU = product.sku.map(item =>
    <tr key={i++}>
      <td align="center">{item.color}</td>
      <td align="center">{item.size}</td>
      <td align="center">{item.fabric}</td>
      <td align="center">{item.stock}</td>
    </tr>);

  const productStyle = _.find(productStyles,{id:product.style_id});
  const productSpace = _.find(productSpaces,{id:product.space_id});
  const images = product.images.map(img => <img key={i++} src={`${img}@430h_730w_1e_1c`}/>);
  let classification = [];

  ProductClassifications.filter(item =>{
    if (Number(item.id) === product.classification_id){
      const { children,...reset } = item;
      classification = [reset]
    }else{
      item.children.filter(i => {
        if (Number(i.id) === product.classification_id){
          const { children,...reset } = item;
          const { subChildren,...r } = i;
          classification = [reset,r]
        }else{
          i.subChildren.filter(ii => {
            if(Number(ii.id) === product.classification_id){
              const { children,...reset } = item;
              const { subChildren,...r } = i;
              classification = [reset,r,ii]
            }
          })
        }
      })
    }
  });
  const classifications = classification.map(item => <span key={item.id}>{item.name} / </span> );
  const PARTS = product.parts_list.map(item => <tr key={i++}>
    <td align="center">{item.name}</td>
    <td align="center">{item.amount}</td>
    <td>{item.description}</td>
  </tr>);
  return (<span>
    <span onClick={show.bind(null,dispatch,`show-${id}`)}>
      { children }
    </span>
    <Modal
      title={title}
      width={1000}
      visible={visible[`show-${id}`]}
      onOk={Ok ? ok.bind(null,dispatch,null,callBack,`show-${id}`) : ok.bind(null,dispatch,null,null,`show-${id}`,true)}
      onCancel={hide.bind(null,dispatch,null,`show-${id}`)}>
        <Tabs tabPosition="right">
          <TabPane tab="基本信息" key="1">
            <table>
              <tbody>
              <tr><th width="10%">产品名称&nbsp;:&nbsp;</th><td width="90%">{product.name}</td></tr>
              <tr><th width="10%">产品编号&nbsp;:&nbsp;</th><td width="90%">{product.serial}</td></tr>
              <tr><th width="10%">产品价格&nbsp;:&nbsp;</th><td width="90%">{price}</td></tr>
              <tr><th width="10%">所属品牌&nbsp;:&nbsp;</th><td width="90%"><a style={{'textAlign':'center','display':'block','width':'200px'}} href="javascript:"><img src={`${brand.logo}@50h_100w_1e_1c`} alt={brand.name}/>
                <br/>{brand.name}</a></td></tr>
              <tr><th width="10%">所属分类&nbsp;:&nbsp;</th><td width="90%">{classifications}</td></tr>
              <tr><th width="10%">产品状态&nbsp;:&nbsp;</th><td width="90%">{Number(product.status) ? intl.get('ONSELL') : intl.get('OFFSHELF')}</td></tr>
              <tr><th width="10%">产品描述&nbsp;:&nbsp;</th><td width="90%">{product.description}</td></tr>
              <tr><th width="10%">产品风格&nbsp;:&nbsp;</th><td width="90%">{productStyle.name}</td></tr>
              <tr><th width="10%">产品空间&nbsp;:&nbsp;</th><td width="90%">{productSpace.name}</td></tr>
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="产品属性" key="2">
            <table style={{'width':'100%'}}>
              <thead>
                <tr>
                  <th style={{'textAlign':'center'}} width="20%">颜色</th>
                  <th style={{'textAlign':'center'}} width="45%">尺寸</th>
                  <th style={{'textAlign':'center'}} width="25%">材质</th>
                  <th style={{'textAlign':'center'}} width="10%">库存</th>
                </tr>
              </thead>
              <tbody>
                {SKU}
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="配件清单" key="3">
            <table style={{'width':'100%'}}>
              <thead>
                <tr>
                  <th style={{'textAlign':'center'}} width="20%">名称</th>
                  <th style={{'textAlign':'center'}} width="20%">数量</th>
                  <th style={{'textAlign':'center'}} width="60%">描述</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.parts_list.length ?
                  PARTS :
                  <tr><td height="150" align="center" colSpan={3}> 该产品没有配件 </td></tr>
                }
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="产品相册" key="4">
            <Carousel autoplay>
              { images }
            </Carousel>
          </TabPane>
        </Tabs>
    </Modal>
  </span>)
};

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return{ visible }
}
export default connect(mapStateToProps)(ShowProductModal);
