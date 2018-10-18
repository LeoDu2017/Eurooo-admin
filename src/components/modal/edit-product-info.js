import { connect } from 'dva';
import { Modal,Tabs,Form,Input,Select,Button,Radio,Card,Checkbox } from 'antd';
import { show,hide,ok } from 'Actions/common-modal';
import PriceInput from 'Components/units/Price-input';
import ClassSelete from 'Components/units/Class-selecte';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const EditProductInfoFrom = ({
        productSpaces,productStyles,
        title,visible,dispatch,classID,
        ProductClassifications,id,myBrands,children,
        form:{getFieldDecorator,validateFieldsAndScroll}}) => (
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
            <FormItem {...formItemLayout} label="产品名称">
              {getFieldDecorator('name',{
                rules: [{ required: true, message: '请输入产品名称' }],
              })(<Input style={{'width':'200px'}} placeholder="请输入产品名称"/>)}
            </FormItem>

            <FormItem {...formItemLayout} label="产品价格">
              {getFieldDecorator('price', {
                initialValue: { sum: 0,currency: '0' },
                rules: [{ required: true, message: '请输入产品价格' }],
                // rules: [{ validator: this.checkPrice }],
              })(<PriceInput onChange={ value => console.log(value) }/>)}
            </FormItem>

            <FormItem {...formItemLayout} label="特价活动">
              {getFieldDecorator('special_offer', {
                initialValue: 0,
                // rules: [{ required: true, message: '请输入产品价格' }],
                // rules: [{ validator: this.checkPrice }],
              })(<RadioGroup>
                <Radio value={0}>不开启</Radio>
                <Radio value={1}>开启</Radio>
              </RadioGroup>)}
            </FormItem>

            <FormItem {...formItemLayout} label="品牌">
              {getFieldDecorator('brand', {
                initialValue: 0,
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

            <FormItem {...formItemLayout} label="分类">
              {getFieldDecorator('class', {
                initialValue: classID,
              })(<ClassSelete onChange={ value => console.log(value) }
                              ProductClassifications={ProductClassifications}/>)}
            </FormItem>

            <FormItem {...formItemLayout} label="空间">
              {getFieldDecorator('space', {
                rules: [{ required: true, message: '请输入品牌名称' }]
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
          <TabPane tab="产品属性" key="2">
            2
          </TabPane>
          <TabPane tab="配件清单" key="3">
            3
          </TabPane>
          <TabPane tab="产品相册" key="4">
            4
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  </span>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  return { visible }
}
export default connect(mapStateToProps)(Form.create()(EditProductInfoFrom))
