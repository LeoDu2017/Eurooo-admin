const Mock = require('mockjs');
const config = require('../src/utils/config');
const process = require('../src/utils/dataProcessing');
const productData = require('./json/myProduct');
const { apiPrefix,NOTFOUND } = config;
const { queryArray } = process;

const procductListData = Mock.mock({
  data:{
    myProduct:productData
  }
});
let database = procductListData.data;

module.exports = {
  [`GET ${apiPrefix}/product/list`] (req, res) {
    const { query } = req;
    let { pageSize,page } = query;
    pageSize = pageSize || 3;
    page = page || 1;
    let newData = database.myProduct;
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  }
};
