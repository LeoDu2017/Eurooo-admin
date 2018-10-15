import _ from 'lodash';
import { Form,Modal,Checkbox,Input,Tabs } from 'antd';
import { connect } from 'dva';
import { showModelHandler,hideModelHandler,okHandler } from 'Actions/common-modal';
import { onChange } from 'Actions/product';
import { formatMoney } from 'Utils/widget';
import intl from "react-intl-universal";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const TabPane = Tabs.TabPane;

const ShowProductModal = ({
  dispatch,children,id,visible,
  content,title,banneds,product,
  countries,Ok,callBack,myBrands,
  form:{resetFields,getFieldDecorator,validateFields}}) => {
  let price,num=formatMoney(Number(product.price).toFixed(2),true);
  const brand = _.find(myBrands,{id:product.brand_id});
  switch (Number(product.price_unit)) {
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
  return (<span>
    <span onClick={showModelHandler.bind(null,dispatch,id)}>
      { children }
    </span>
    <Modal
      title={title}
      width={1000}
      visible={visible[id]}
      onOk={Ok ? okHandler.bind(null,dispatch,validateFields,callBack,id) : okHandler.bind(null,dispatch,null,null,id,true)}
      onCancel={hideModelHandler.bind(null,dispatch,resetFields,id)}>
      <Form>
        <Tabs tabPosition="right">
          <TabPane tab="基本信息" key="1">
            <table>
              <tbody>
              <tr><th>产品名称&nbsp;:&nbsp;</th><td>{product.name}</td></tr>
              <tr><th>产品编号&nbsp;:&nbsp;</th><td>{product.serial}</td></tr>
              <tr><th>产品价格&nbsp;:&nbsp;</th><td>{price}</td></tr>
              <tr><th>所属品牌&nbsp;:&nbsp;</th><td style={{'textAlign':'center'}}><a href="javascript:"><img src={`${brand.logo}@50h_100w_1e_1c`} alt={brand.name}/>
                <br/>{brand.name}</a></td></tr>
              <tr><th>所属分类&nbsp;:&nbsp;</th><td>{product.name}</td></tr>
              <tr><th>产品状态&nbsp;:&nbsp;</th><td>{Number(product.status) ? intl.get('ONSELL') : intl.get('OFFSHELF')}</td></tr>
              <tr><th>产品描述&nbsp;:&nbsp;</th><td>{product.description}</td></tr>
              <tr><th>产品风格&nbsp;:&nbsp;</th><td>{product.style}</td></tr>
              <tr><th>产品空间&nbsp;:&nbsp;</th><td>{product.space}</td></tr>
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
          <TabPane tab="配件清单" key="4">Content of Tab 3</TabPane>
          <TabPane tab="产品相册" key="5">Content of Tab 3</TabPane>
        </Tabs>
      </Form>
    </Modal>
  </span>)
};

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return{ visible }
}
export default connect(mapStateToProps)(Form.create()(ShowProductModal));
