import { connect } from 'dva';
import { Modal,Tabs,Form,Input,Select,Button,Radio,Card,Checkbox,Icon,Col } from 'antd';
import { show,hide,ok } from 'Actions/common-modal';
import PriceInput from 'Components/units/Price-input';
import ClassSelete from 'Components/units/Class-selecte';
import SKUInput from 'Components/units/SKU-input';
import PartsInput from 'Components/units/Parts-input';
import intl from "react-intl-universal";
import Albums from 'Components/modal/albums';
import { selectImgs } from 'Actions/shop';
import { add,remove,edit } from 'Actions/product';
import { formItemLayout,formItemLayoutWithOutLabel } from 'Utils/constant';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

const EditProductInfoFrom = ({
  productSpaces,productStyles,
  title,visible,dispatch,classID,
  ProductClassifications,id,myBrands,children,
  form:{getFieldValue,setFieldsValue,getFieldDecorator,validateFieldsAndScroll},
  product:{name,price,special_offer,brand_id,classification_id,space_id,style_id,description,status,sku,parts_list,images}
  }) => {

  getFieldDecorator('skuKeys', { initialValue: sku });
  getFieldDecorator('partsKeys', { initialValue: parts_list });
  getFieldDecorator('imagesKeys', { initialValue: images });

  return (
    <span>
      <span onClick={show.bind(null,dispatch,`edit-${id}`)}>{ children }</span>
      <Modal
        title={ title }
        width={ 1000 }
        visible={ visible[`edit-${id}`] }
        onCancel={hide.bind(null,dispatch,null,`edit-${id}`)}>
        <Form>
          <Tabs tabPosition="right">
            <TabPane tab="基本信息" key="1" style={{height:520,overflow:'hidden',overflowY:'auto'}}>
              {/*产品名称*/}
              <FormItem {...formItemLayout} label="产品名称">
                {getFieldDecorator('name',{
                  initialValue:name,
                  rules: [{ required: true, message: '请输入产品名称' }],
                })(<Input style={{'width':'200px'}} placeholder="请输入产品名称"/>)}
              </FormItem>
              {/*产品价格*/}
              <FormItem {...formItemLayout} label="产品价格">
                {getFieldDecorator('price', {
                  initialValue: price,
                  rules: [{ required: true, message: '请输入产品价格' }],
                  // rules: [{ validator: this.checkPrice }],
                })(<PriceInput onChange={ value => console.log(value) }/>)}
              </FormItem>
              {/*特价活动*/}
              <FormItem {...formItemLayout} label="特价活动">
                {getFieldDecorator('special_offer', {
                  initialValue:special_offer,
                  // rules: [{ required: true, message: '请输入产品价格' }],
                  // rules: [{ validator: this.checkPrice }],
                })(<RadioGroup>
                  <Radio value={0}>不开启</Radio>
                  <Radio value={1}>开启</Radio>
                </RadioGroup>)}
              </FormItem>
              {/*品牌*/}
              <FormItem {...formItemLayout} label="品牌">
                {getFieldDecorator('brand', {
                  initialValue:brand_id,
                  rules: [{ required: true, message: '请选择品牌' }],
                })(<RadioGroup >
                  {
                    myBrands.map( brand => <Card
                      key={brand.id}
                      bodyStyle={{'display':'none'}}
                      extra={<Radio value={brand.id}/>}
                      style={{float:'left',width:'23%',marginRight:'2%',marginBottom:'15px'}}
                      cover={<img alt={brand.name} style={{'padding':'10px'}} src={`${brand.logo}@110h_216w_1e_1c`} />}
                      title={brand.name}/> )
                  }
                </RadioGroup>)}
              </FormItem>
              {/*分类*/}
              <FormItem {...formItemLayout} label="分类">
                {getFieldDecorator('class', {
                  initialValue: classification_id,
                })(<ClassSelete onChange={ value => console.log(value) }
                                ProductClassifications={ProductClassifications}/>)}
              </FormItem>
              {/*空间*/}
              <FormItem {...formItemLayout} label="空间">
                {getFieldDecorator('space', {
                  initialValue:space_id,
                  rules: [{ required: true, message: '请选择空间' }]
                })(<CheckboxGroup>
                  {
                    productSpaces.map(space => <Checkbox value={space.id} key={space.id}>{space.name}</Checkbox>)
                  }
                </CheckboxGroup>)}
              </FormItem>
              {/*风格*/}
              <FormItem {...formItemLayout} label="风格">
                {getFieldDecorator('style', {
                  initialValue: style_id,
                  rules: [{ required: true, message: '请输入品牌名称' }]
                })(<Select style={{ width:250}}>
                  {
                    productStyles.map(style => <Option value={style.id} key={style.id}>{style.name}</Option>)
                  }
                </Select>)}
              </FormItem>
              {/*产品描述*/}
              <FormItem {...formItemLayout} label="产品描述">
                {getFieldDecorator('description', {
                  initialValue:description
                })(
                  <TextArea placeholder="Autosize height with minimum and maximum number of lines"
                            autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>
              {/*产品状态*/}
              <FormItem {...formItemLayout} label="产品状态">
                {getFieldDecorator('status', {
                  initialValue: status
                })(<RadioGroup>
                  <Radio value={0}>下架</Radio>
                  <Radio value={1}>上架</Radio>
                </RadioGroup>)}
              </FormItem>
            </TabPane>
            <TabPane tab="产品属性" key="2" style={{height:520,overflow:'hidden',overflowY:'auto'}}>
              {getFieldValue('skuKeys').map((k, index, list) => <FormItem
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '产品规格' : ''}
                required={false}
                key={index}>
                {getFieldDecorator(`skus[${index}]`, {
                  initialValue:k,
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input passenger's name or delete this field.",
                  }],
                })(<SKUInput edit={edit.bind(null,'skuKeys',getFieldValue,setFieldsValue,k)} />)}
                {list.length > 1 ? (
                  <Icon
                    type="minus-circle-o"
                    disabled={list.length === 1}
                    onClick={() => remove(k,'skuKeys',getFieldValue,setFieldsValue)}
                    style={{cursor:'pointer',marginLeft:10}}/>
                ) : null}
              </FormItem>)}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add.bind(null,'skuKeys',getFieldValue,setFieldsValue)} style={{ width: '94%' }}>
                  <Icon type="plus" /> Add field
                </Button>
              </FormItem>
            </TabPane>
            <TabPane tab="配件清单" key="3" style={{height:520,overflow:'hidden',overflowY:'auto'}}>
              {getFieldValue('partsKeys').map((k, index, list) => <FormItem
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? '产品配件' : ''}
                  required={false}
                  style={{position:'relative'}}
                  key={index}>
                  {getFieldDecorator(`parts[${index}]`, {
                    initialValue:k,
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <PartsInput edit={edit.bind(null,'partsKeys',getFieldValue,setFieldsValue,k)} />
                  )}
                  {list.length > 1 ? (
                    <Icon
                      type="minus-circle-o"
                      disabled={list.length === 1}
                      style={{marginLeft:15,cursor:'pointer'}}
                      onClick={() => remove(k,'partsKeys',getFieldValue,setFieldsValue)}/>
                  ) : null}
                </FormItem>)}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add.bind(null,'partsKeys',getFieldValue,setFieldsValue)} style={{ width:693 }}>
                  <Icon type="plus" /> Add field
                </Button>
              </FormItem>
            </TabPane>
            <TabPane tab="产品相册" key="4" style={{height:520,overflow:'hidden',overflowY:'auto'}}>
              <div style={{ display:'flex', justifyContent:'space-around',width:getFieldValue('imagesKeys').length*170}}>
                {getFieldValue('imagesKeys').map((k, index, list) => <FormItem
                    required={false}
                    key={k}
                    style={{display:'inline-block',width: 120}}>
                    {getFieldDecorator(`images[${k}]`, {
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      }],
                    })(
                      <Col
                        style={{position:'relative'}}
                        className="upLogo">
                        <img alt="LOGO" src='https://italyclassico.casacdn.com/pd_merchant/image/product/20180411164379.jpg@100h_100w_1e_1c'/>
                        <Albums callBack={selectImgs} id="logoAlbums" single={false}>
                          {intl.get('REUPLOAD')}
                        </Albums>
                        <Input type="hidden"/>
                        {list.length > 1 ? (
                          <Icon
                            type="minus-circle-o"
                            disabled={list.length === 1}
                            style={{marginLeft:15,cursor:'pointer',position:'absolute',top:5,right:5}}
                            onClick={() => remove(k,'imagesKeys',getFieldValue,setFieldsValue)}/>
                        ) : null}
                      </Col>
                    )}
                  </FormItem>)}
              </div>
              <FormItem {...formItemLayoutWithOutLabel} style={{display:getFieldValue('imagesKeys').length >= 5 ? 'none' : 'block'}}>
                <Button type="dashed" onClick={add.bind(null,'imagesKeys',getFieldValue,setFieldsValue)}
                        style={{ width:120,height:120 }}>
                  <Icon type="plus" /> Add field
                </Button>
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </span>
  )
};

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return { visible }
}
export default connect(mapStateToProps)(Form.create()(EditProductInfoFrom))
