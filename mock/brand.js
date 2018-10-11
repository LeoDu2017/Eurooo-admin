const Mock = require('mockjs');
const config = require('../src/utils/config');
const process = require('../src/utils/dataProcessing');
const brandsData = require('./json/myBrands');
const allBrandsData = require('./json/brands');

const { apiPrefix,NOTFOUND } = config;
const { queryArray } = process;

const brandsListData = Mock.mock({
  data:{
    myBrands:brandsData,
    allBrands: allBrandsData.map(item => item = {...item,key:item.id,area:[] }),
    banned:['21','68','69','75','99','166','192','197','198','199','200','201','203','215','216']
  }
});
let database = brandsListData.data;

module.exports = {
  [`GET ${apiPrefix}/brand/all`] (req, res) {
    const { query } = req;
    let { pageSize,page} = query;
    pageSize = pageSize || 12;
    page = page || 1;

    let newData = database.allBrands;

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
  [`GET ${apiPrefix}/brand/banned`] (req, res) {
    let newData = database.banned;
    res.status(200).json({
      data: newData
    })
  },
  [`POST ${apiPrefix}/brand/list`] (req, res){
    console.log(req.body);
    database.myBrands = database.myBrands.concat(req.body);
    res.status(200).json({status:1,success:true,msg: '添加成功' })
  },

  [`GET ${apiPrefix}/brand/list`] (req, res) {
    const { query } = req;
    let { pageSize,page } = query;
    pageSize = pageSize || 2;
    page = page || 1;

    let newData = database.myBrands;

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
  [`POST ${apiPrefix}/brand/del`] (req, res) {
    const { id } = req.body;
    let myBrands = database.myBrands;
    const data = queryArray(myBrands, id, 'id');
    if (data) {
      myBrands = myBrands.filter(item => item.id !== id);
      res.status(200).json({status:1,msg: '删除成功' })
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  [`POST ${apiPrefix}/brand/:id`] (req, res) {
    const { area } = req.body;
    const { id } = req.params;

    let myBrands = database.myBrands;

    myBrands = myBrands.map(item => {
      if(item.id === id){
        item = {...item,area};
        return item        
      }else{
        return item
      }
    });
    database = {...database,myBrands};
    res.status(200).json({status:1,msg: '修改成功' })
  }
};
