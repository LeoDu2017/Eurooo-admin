import intl from "react-intl-universal";
import { connect } from 'dva';
import { Form,Modal,Input,Col,Select,Checkbox } from 'antd';
import { ok }  from 'Actions/common-modal';

import { upLogo } from 'Styles/shop.less';
import Albums from 'Components/modal/albums';
import { selectImgs,hide } from 'Actions/brand';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UploadBrandForm = ({
  id,dispatch,visible,title,banneds,logo,callBack,
  countries,form:{validateFields,resetFields,getFieldDecorator}}) => (
  <span>
    <Modal
      title={ title }
      onOk={ ok.bind(null,dispatch,validateFields,callBack,id) }
      onCancel={ hide.bind(null,dispatch,resetFields,id)}
      visible={ visible[id] }>
      <Form>
        <FormItem
          {...formItemLayout}
          label="品牌名称">
            {getFieldDecorator('name',{
              rules: [{ required: true, message: '请输入品牌名称' }],
            })(<Input placeholder="请输入品牌名称"/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.get('SHOPLOGO')}
          extra={intl.get('OPTIMUM')}>
            {getFieldDecorator('logo',{
              initialValue:logo,
              rules: [{required: true, message:intl.get('UPLOADSHOPlOGO')}]
            })(
              <Col className={upLogo}>
                <img alt="LOGO" src={ logo ? logo : 'https://placehold.it/120x120/09f/fff&text=EUROOO'}/>
                <Albums id="logoAlbums" single={true} callBack={selectImgs}>
                  {intl.get('REUPLOAD')}
                </Albums>
                <Input type="hidden"/>
              </Col>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品牌发源地">
            {getFieldDecorator('origin', {
              rules: [{ required: true, message: '请输入品牌名称' }],
            })(<Select>
              {countries.map(country => <Select.Option key={country.id}>{country.name}</Select.Option>)}
            </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品牌禁销国家">
            {getFieldDecorator('area', {
              rules: [{ required: true, message: '请输入品牌名称' }],
            })(<Checkbox.Group options={ banneds } />)}
        </FormItem>
      </Form>
    </Modal>
  </span>
);

function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { logo } = state.uploadBrand;
  return { visible,logo }
}

export default connect(mapStateToProps)(Form.create()(UploadBrandForm))
