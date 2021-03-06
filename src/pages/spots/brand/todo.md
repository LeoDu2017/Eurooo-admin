2018-09-03
一、在Mock文件下新建brand.js：
    1、引入Mock:
      const Mock = require('mockjs');
    2、在utils 文件夹中 新建dataProcessing.js文件
    3、将not found放入config中；
二、在.umirc.mock.js注册brand的Mock数据：
    ...require('./mock/brand')
三、在utils/config.js 注册brans数据接口
    getBrandsListApi:`${APIV1}/brand/list`
四、在service文件夹建立brand.js
    1、引入 reqire Ajax函数：
    import request from 'utils/request';
    2、引入 config 全局常量定义：
    import { api } from 'utils/config';
    3、定义请求接口：
    export default function getBrandsListService(){
      return request({
        url: getBrandsListApi,
        method: 'get'
      })
    }
五、在 models/brand.js中引入数据请求接口：
    1、引入Service: 
    import { getBrandsListService } from 'sevice/brand';
    2、定义Reducers:
    setBrands({state,payload:brands}){
      return {...state,brands}
    }
    3、定义effects：
    *fetchBrands({payload},{select,call, put}){
      const brads = yield call(getBrandsListService, payload);
      yield put({
        type:'setBrands',
        payload:brads.data
      })
    }
    4、定义subscriptions:
    setup({ dispatch,history}){
      return history.listen(({ pathname}) => {
        let arr = pathname.split('/');
        let childLink = arr[2];
        let subChildLink = arr[3];

        if(childLink === 'brand' && subChildLink === 'list'){
          dispatch({
            type:'fetchBrands'
          })
        }
      });
    }

2018-09-04
一、使用Lodash利用ID查找对应的国家名称进行渲染：
    1、引入Lodash
    import _ from "lodash"
    2、使用Lodash进行查找
    _.find(notAllowCountries, { 'id': id }) && notAllowCountries[_.findIndex(notAllowCountries, { 'id': id })].name
2018-09-06
一、定义一条公共的函数将国家ID转化成国家名称
    1、在public文件夹定义getCountry函数：
       (1)、在services文件夹新建country.js 定义接口；
            export function getBrandsListService(data){
              return request({
                url: getCountryApi,
                data,
                method: 'get'
              })
            }
       (2)、在config.js文件定义接口路径：
            getCountryApi:`${APIV1}/country/:id`,
       (3)、在Mock文件夹新建Country.js Mock文件；
           const Mock = require('mockjs');
           const config = require('../src/utils/config');
           const process = require('../src/utils/dataProcessing');
           const countriesData = require('./json/countries');
           
           const { apiPrefix,NOTFOUND } = config;
           const { queryArray } = process;
           
           const countriesListData = Mock.mock({
             data:countriesData
           });
           let database = countriesListData.data;
       (4)、定义获取国家名称接口：
            [`GET ${apiPrefix}/country/:id`] (req, res) {
                const { id } = req.params;
                const data = queryArray(database, id, 'id');
                if (data) {
                  res.status(200).json(data)
                } else {
                  res.status(404).json(NOTFOUND)
                }
            }
       (5)、在公共函数中引入接口；
       
    2、引用并绑定：
    import {getCountry} from "public/country/country";
    （1）错误绑定：
    <Input disabled={true} value={getCountry.bind(null,content.country_id)}/>
    （2）正确绑定：
    <Input disabled={true} value={getCountry(content.country_id)}/>
二、删除功能实现：
    1、在Mock/brand 定义删除接口：
    [`POST ${apiPrefix}/brand/del`] (req, res) {
        const { id } = req.body;
        const data = queryArray(database, id, 'id');
        if (data) {
          database = database.filter(item => item.id !== id);      
          res.status(200).json({status:1,msg: '删除成功' })      
        } else {
          res.status(404).json(NOTFOUND)
        }    
    }
    2、在config API中注册接口 delBrandApi：
    delBrandApi:`${APIV1}/brand/del`,
    3、在services\brand.js 中注册 delBrandService：
    export function delBrandService(data){
      return request({
        url: delBrandApi,
        data,
        method: 'psot'
      })
    }
    4、在model\brand.js 中定义删除数据处理程序 removeBrand:
    *removeBrand({payload},{select,call,put}){
      const data = yield call(delBrandService,payload);      
    }
    5、在actions\brands 中定义删除操作 removeBrand:
    export function removeBrand(dispatch,id){
      dispatch({
        type:'brand/removeBrand',
        payload:{id}
      })
    }
    6、在页面中绑定删除操作：
    <a href="javascript:;" onClick={removeBrand.bind(null,record.id)}> 删除 </a>
三、编辑禁销国家功能：
    1、编辑窗口设置
    <BrandDetailModal
      content={record}
      title="编辑禁销国家"
      banned={banned}
      id={record.id + '-country'}>
      <a href="javascript:;"> 编辑禁销国家 </a>
    </BrandDetailModal>
    
    2、在model\brand.js 数据请求程序 fetchBanned：
    *fetchBanned({payload},{select,call, put}){
      const banned = yield call(getBannedService, payload);
      yield put({
        type:'setBanned',
        payload:banned.data
      })
    },
    3、在services\brand.js 中注册 getBannedService：
    export function getBannedService(data){
      return request({
        url: getBannedApi,    
        method: 'get'
      })
    }
    4、在config API中注册接口 getBannedApi：
    getBannedApi:`${APIV1}/brand/banned`,
    5、在Mock/brand 定义数据获取接口：
    [`GET ${apiPrefix}/brand/banned`] (req, res) {
      let newData = database.banned;
      res.status(200).json({
        data: newData
      })
    },
    6、设置禁销编辑栏：
    <Checkbox.Group options={banneds} defaultValue={areas}/>
四、保存编辑结果：
    1、在 action/brand.js 中添加保存操作 saveBanned:
    export function saveBanned(dispatch,banned){
      dispatch({
        type:'brand/saveBanned',
        payload:banned
      })
    }
    2、在 model/brand.js 中添加数据处理 saveBanned:
    *saveBanned({payload:data},{select,call,put}){
      const result = yield call(saveBannedService,data);
      if(result.success){
        yield put({
          type:'fetchBrands'
        })
      }
    }
    3、在 services/brand.js 中添加数据请求程序 saveBannedService：
    export function saveBannedService(data){
      return request({
        url: udateBannedApi,
        data,
        method: 'post'
      })
    }
    4、在 config 中定义接口路径 udateBannedApi：
    udateBannedApi:`${APIV1}/brand/:id`
    5、在 mock/brand.js 定义接口API:
    [`POST ${apiPrefix}/brand/:id`] (req, res) {
      const { area } = req.body;
      const { id } = req.params;
  
      let mybrands = database.mybrands;
  
      mybrands = mybrands.map(item => {
        if(item.id === id){
          return item = {...item,area}
        }else{
          return item
        }
      });
      database = {...database,mybrands}
      res.status(200).json({status:1,msg: '修改成功' })
    }

2018-09-07
一、从品牌库选择已有品牌操作：
    1、设置弹窗编辑内容 在 components\modal 文件夹新建 SelecteBrands.js并设置基础内容:
    import { Modal } from 'antd';
    import { connect } from 'dva';
    import { show,ok,hide } from 'actions/common-modal';
    
    const selectBrandsModal = ({dispatch,children,id,title,visible,onOk}) => (
      <span>
        <span onClick={show.bind(null,dispatch,id)}>{children}</span>
        <Modal
          title={title}
          visible={visible[id]}
          width="700px"
          onOk={onOk ? ok.bind(null,dispatch,null,onOk,id) : ok.bind(null,dispatch,null,null,id,true)}
          onCancel={hide.bind(null,dispatch,null,id)}
        >
          品牌库
        </Modal>
      </span>
    );
    function mapStateToProps(state,props){
      const { visible } = state.commonModal;
      const { content } = props;
    
      return{
        visible
      }
    }
    export default connect(mapStateToProps)(selectBrandsModal);    
    
    
2018-09-14

一、分页：
  1、在视图层 Table 元素添加 Pagination 属性：
    <Table
      dataSource={brands}
      columns={columns}
      pagination={{
        // simple: true,
        current: current,
        total: total,
        pageSize:2,
        onChange: changePageHandel.bind(null,dispatch),
      }}/>
  2、在 Model 页面初始化接口中：
      setup({ dispatch,history}){
        return history.listen(({ pathname,query}) => {
          let arr = pathname.split('/');
          let childLink = arr[2];
          let subChildLink = arr[3];
          if(childLink === 'brand' && subChildLink === 'list'){
            dispatch({
              type:'fetchBrands',
              payload:query
            });
            dispatch({
              type:'setCurrent',
              payload:Number(query.page)
            });
            dispatch({
              type:'fetchBanned'
            })
          }
        });
      }
  3、在 Action 中添加翻页功能：
      export function changePageHandel(dispatch,page){
        dispatch(
          routerRedux.push({
            pathname: '/spots/brand/list',
            query: { page },
          })
        );
      }
