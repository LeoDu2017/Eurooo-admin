import { connect }        from 'dva';
import {
  Table,Tag,Col,
  Button,Divider,Pagination }        from 'antd';
import {
  getCountry,
  saveBanned,
  removeBrand,
  changePageHandel,
  uploadBrandsHandler}    from 'Actions/brand';
import intl               from 'react-intl-universal';
import BrandDetailModal   from 'Components/modal/show-brand-info';
import SelectBrandsModal  from 'Components/modal/select-brands-form';
import UploadBrandsModal  from 'Components/modal/upload-brands-form';

import { showModelHandler } from 'Actions/common-modal';
const brandList = ({dispatch,myBrands,countries,banneds,current,total}) => {
  const columns = [
    {
      title: intl.get('BRANDSERIAL'),
      dataIndex:'serial',
      key:'serial',
      render: text => text
    },{
      title:intl.get('BRANDLOGO'),
      dataIndex:'logo',
      key:'logo',
      width:70,
      align:'center',
      render:(data,record) => <img alt={record.title} src={`${data}@55h_155w_1e_1c`}/>
    },{
      title:intl.get('BRANDTITLE'),
      dataIndex:'name',
      key:'name',
      align:'center',
      render: text => <a href="javascript:">{text}</a>
    },{
      title:intl.get('GOOGSMOUNT'),
      dataIndex:'amount',
      key:'amount',
      align:'center',
      render:text => text
    },{
      title:intl.get('NOTALLOWAREA'),
      dataIndex:'area',
      key:'area',
      width:150,
      render: areas => (
        <span>
          {
            Array.isArray(areas) ? areas.map( id => <Tag color="red" key={id}>{getCountry(id,countries)}</Tag>)
            : areas.split(',').map( id => <Tag color="red" key={id}>{getCountry(id,countries)}</Tag>)}
        </span>
      )
    },{
      title:intl.get('BRANDTYPE'),
      dataIndex:'type',
      key:'type',
      align:'center',
      render: boolean => Number(boolean) ? intl.get('MERCHANTADD') : intl.get('SYSTEM')
    },{
      title:intl.get('ACTION'),
      key: 'action',
      align:'center',
      render:(text,record) => (
        <span>
          <BrandDetailModal
            content={record}
            country={getCountry(record.country_id,countries)}
            title= {intl.get('BRANDVIEW')}
            id={record.id}>
            <a href="javascript:"> {intl.get('VIEW')}</a>
          </BrandDetailModal>
          <Divider type="vertical"/>
          <a href="javascript:" onClick={removeBrand.bind(null,dispatch,record.id)}>{intl.get('DELETE')}</a>
          <Divider type="vertical"/>
          <BrandDetailModal
            content={record}
            title= {intl.get('EDITBANNED')}
            banneds={banneds}
            countries={countries}
            areas={ Array.isArray(record.area) ? record.area : record.area.split(',')}
            Ok={true}
            callBack={saveBanned.bind(null,dispatch,record.id)}
            id={record.id + '-country'}>
            <a href="javascript:"> {intl.get('EDITBANNED')} </a>
          </BrandDetailModal>
        </span>
      )
    }];
  return (
    <Col className='g-t-wrap'>
      <Col className='g-t-main'>
        <header className='g-t-header'>
          <span className='g-t-title'>{intl.get('MYBRANS')}</span>
          <span>
            <Button.Group size="small">
              <Button onClick={showModelHandler.bind(null,dispatch,"selectBrands")} type='primary' icon="check">{intl.get('SELECT')}</Button>
              <Button onClick={showModelHandler.bind(null,dispatch,"uploadBrands")} type='primary' icon="plus">{intl.get('CREATE')}</Button>
            </Button.Group>
          </span>
        </header>
        <Col className="g-t-form-wrap">
          <Table
            dataSource={myBrands}
            columns={columns}
            pagination={{hideOnSinglePage:true}}/>
        </Col>
        <footer className="g-t-footer">
          <Pagination
            current={current}
            total={total}
            pageSize={2}
            onChange={changePageHandel.bind(null,dispatch)}
          />
        </footer>
      </Col>
      <SelectBrandsModal
        id="selectBrands"
        title="选择我的品牌"/>
      <UploadBrandsModal
        id="uploadBrands"
        title="上传新品牌"
        banneds={ banneds }
        countries={ countries }
        callBack={ uploadBrandsHandler }/>
    </Col>
  )
};

function mapStateToProps(state){
  const { myBrands,total,current,banned } = state.brand;
  const { countries } = state.app;
  let banneds = banned.map(item => {
    const value = item;
    const country = countries.find(i => {
      return i.id === item
    });
    const label = country.name;
    return {value,label}
  });
  return {myBrands,countries,banneds,total,current}
}

export default connect(mapStateToProps)(brandList);
