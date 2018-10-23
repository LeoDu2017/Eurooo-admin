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

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 21, offset: 3 },
  },
};

const EditProductInfoFrom = ({
        productSpaces,productStyles,
        title,visible,dispatch,classID,product,
        ProductClassifications,id,myBrands,children,
        form:{getFieldValue,setFieldsValue,getFieldDecorator,validateFieldsAndScroll}}) => {

  const remove = (k,keyName) => {
    // can use data-binding to get
    const keys = getFieldValue(keyName);
    // We need at least one passenger
    if (keys.length === 1) { return }
    // can use data-binding to set
    setFieldsValue({
      [keyName]: keys.filter(key => key !== k)
    });
  };

  const add = (keyName) => {
    const keys = getFieldValue(keyName);
    const nextKeys = keys.concat(keys.length);
    setFieldsValue({
      [keyName]: nextKeys,
    });
  };

  getFieldDecorator('skuKeys', { initialValue: [0] });
  const skuKeys = getFieldValue('skuKeys');

  const formItems_sku = skuKeys.map((k, index) => {
    return (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '产品规格' : ''}
        required={false}
        key={k}>
        {getFieldDecorator(`skus[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          }],
        })(
          <SKUInput style={{ width: '94%', marginRight: 8 }} />
        )}
        {skuKeys.length > 1 ? (
          <Icon
            type="minus-circle-o"
            disabled={skuKeys.length === 1}
            onClick={() => remove(k,'skuKeys')}
            style={{cursor:'pointer',marginLeft:10}}/>
        ) : null}
      </FormItem>
    );
  });

  getFieldDecorator('partsKeys', { initialValue: [0] });
  const partsKeys = getFieldValue('partsKeys');
  const formItems_parts = partsKeys.map((k, index) => {
    return (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '产品配件' : ''}
        required={false}
        style={{position:'relative'}}
        key={k}>

        {getFieldDecorator(`parts[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          }],
        })(
          <PartsInput />
        )}
        {partsKeys.length > 1 ? (
          <Icon
            type="minus-circle-o"
            disabled={partsKeys.length === 1}
            style={{marginLeft:15,cursor:'pointer'}}
            onClick={() => remove(k,'partsKeys')}/>
        ) : null}
      </FormItem>
    );
  });
// ,width:200,float:'left'
  getFieldDecorator('imagesKeys', { initialValue: [0] });
  const imagesKeys = getFieldValue('imagesKeys');
  const formItems_images = imagesKeys.map((k, index) => {
    return (
      <FormItem
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
            {imagesKeys.length > 1 ? (
              <Icon
                type="minus-circle-o"
                disabled={imagesKeys.length === 1}
                style={{marginLeft:15,cursor:'pointer',position:'absolute',top:5,right:5}}
                onClick={() => remove(k,'imagesKeys')}/>
            ) : null}
          </Col>
        )}

      </FormItem>
    );
  });
  const { name,price,special_offer,brand_id,classification_id,space_id } = product;

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

              <FormItem {...formItemLayout} label="风格">
                {getFieldDecorator('style', {
                  rules: [{ required: true, message: '请输入品牌名称' }]
                })(<Select style={{ width:250}}>
                  {
                    productStyles.map(style => <Option value={style.id} key={style.id}>{style.name}</Option>)
                  }
                </Select>)}
              </FormItem>

              <FormItem {...formItemLayout} label="产品描述">
                {getFieldDecorator('description', { })(
                  <TextArea placeholder="Autosize height with minimum and maximum number of lines"
                            autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="产品状态">
                {getFieldDecorator('status', {
                  initialValue: 0,
                  // rules: [{ required: true, message: '请输入产品价格' }],
                  // rules: [{ validator: this.checkPrice }],
                })(<RadioGroup>
                  <Radio value={0}>下架</Radio>
                  <Radio value={1}>上架</Radio>
                </RadioGroup>)}
              </FormItem>

            </TabPane>
            <TabPane tab="产品属性" key="2" style={{height:520,overflow:'hidden',overflowY:'auto'}}>
              {formItems_sku}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add.bind(null,'skuKeys')} style={{ width: '94%' }}>
                  <Icon type="plus" /> Add field
                </Button>
              </FormItem>
            </TabPane>
            <TabPane tab="配件清单" key="3" style={{height:520,overflow:'hidden',overflowY:'auto'}}>
              {formItems_parts}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add.bind(null,'partsKeys')} style={{ width:487 }}>
                  <Icon type="plus" /> Add field
                </Button>
              </FormItem>
            </TabPane>
            <TabPane tab="产品相册" key="4" style={{
              height:520,
              overflow:'hidden',
              overflowY:'auto'}}>
              <div style={{ display:'flex', justifyContent:'space-around',width:imagesKeys.length*170}}>
                {formItems_images}
              </div>
              <FormItem {...formItemLayoutWithOutLabel} style={{display:imagesKeys.length >= 5 ? 'none' : 'block'}}>
                <Button type="dashed" onClick={add.bind(null,'imagesKeys')} style={{ width:487 }}>
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
