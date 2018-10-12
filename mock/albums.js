const Mock = require('mockjs');
const config = require('../src/utils/config');

const { apiPrefix } = config;

let albumsTreeData = Mock.mock({
  'data':{
    'total':'125',
    'tree':[
      {'name':'\u672a\u5206\u7c7b','parent_id':'-1','subFolder':[],'id': '0','picNum': '0','open':false,'actions_type':'0'},
      {'name':'\u9165\u68a8','parent_id':'-1','subFolder':[],'id':'2148384','picNum':'30','open':false,'actions_type':'1'},
      {'name':'\u6cb9\u6843','parent_id':'-1','subFolder':[],'id':'2148407','picNum':'0','open':false,'actions_type':'1'},
      {'name':'\u516c\u53f8\u4fe1\u606f','parent_id':'-1','subFolder':[],'id':'2148411','picNum':'95','open':false,'actions_type':'1'},

      {'name': "a", 'parent_id': "2148407", 'subFolder': [], 'id': "820000197710314456", 'picNum': 0, 'open': false,'actions_type':'2'},
      {'name': "b", 'parent_id': "2148407", 'subFolder': [], 'id': "820000197710314",  'picNum': 0, 'open': false,'actions_type':'2'},
      {'name': "c", 'parent_id': "2148407", 'subFolder': [], 'id': "82000019771036",  'picNum': 0, 'open': false,'actions_type':'2'},
      {'name': "d", 'parent_id': "2148407", 'subFolder': [], 'id': "820000114456",  'picNum': 0, 'open': false,'actions_type':'2'},
    ],
    'pictures':[
      {
        "id": "1468954",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000027247182/1508340339932.jpg",
        "name": "ph1807-p02432.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468947",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000050873997/1512574547524.jpg",
        "name": "ul2892-0508.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468946",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000080035681/1529930784621.jpeg",
        "name": "ul1602-5680.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468945",
        "file": "https://italyclassico.casacdn.com/pd_merchant/image/product/20180601002400.jpg",
        "name": "ul1546-0130.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468944",
        "file": "https://italyclassico.casacdn.com/image/prod/20180809/766108.jpg",
        "name": "ul0847-7477.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468943",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000027237486/1508341829901.jpg",
        "name": "ul0845-1179.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468942",
        "file": "https://italyclassico.casacdn.com/pd_merchant/image/product/20180705183443.jpg",
        "name": "ul0465-3500.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1468941",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000054633995/1513746876903.jpg",
        "name": "ul0277-2570.jpg",
        "category_img_id": "2148407"
      },
      {
        "id": "1458563",
        "file": "https://italyclassico.casacdn.com/pd_merchant/image/product/20180412144523.jpg",
        "name": "wu.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458559",
        "file": "https://italyclassico.casacdn.com/pd_merchant/image/product/20180412164932.jpg",
        "name": "tip.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458556",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000074996708/oujuhui20180419145213325.png",
        "name": "team2.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458555",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000027023663/1508341896866.jpg",
        "name": "team1.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458554",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000027023663/1508341899586.jpg",
        "name": "supply4.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458553",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000027023663/1508341901003.jpg",
        "name": "supply3.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458552",
        "file": "https://italyclassico.casacdn.com/image/prod/20180809/331629.jpg",
        "name": "supply2.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458551",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000026549785/1508252412250.jpg",
        "name": "supply1.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458550",
        "file": "https://italyclassico.casacdn.com/ojh/app/OJH000026521741/1508342681866.jpg",
        "name": "showAll.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458549",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d4260532.jpg@!w640",
        "name": "room_default.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458547",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d419a85b.png",
        "name": "QQ.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458546",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d4157e72.jpg@!w640",
        "name": "price.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458545",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d40f1f16.jpg",
        "name": "platform1.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458544",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d40b1b1e.png",
        "name": "phone.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458543",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d406bca0.jpg@!w640",
        "name": "maintenance.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458542",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d4025388.png",
        "name": "logo.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458541",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d3fdc2c2.jpg",
        "name": "logistics.jpg",
        "category_img_id": "2148411"
      },
      {
        "id": "1458540",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d3f96686.png",
        "name": "kefu.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458539",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d3f5f446.png",
        "name": "join-out.png",
        "category_img_id": "2148411"
      },
      {
        "id": "1458538",
        "file": "http:\/\/img.supvip.cn\/4d\/a2\/8046600\/2018-05\/5b0f4d3f1d282.png",
        "name": "join-in.png",
        "category_img_id": "2148411"
      }
    ]
  }
});

let database = albumsTreeData.data;

module.exports = {
  [`GET ${apiPrefix}/albums/tree`] (req, res) {

    const {tree} = database;
    const t = tree.filter( i => i.parent_id === '-1');
    res.status(200).json({
      data: {...database,tree:t},
      msg:'OK'
    })
  },
  [`GET ${apiPrefix}/albums/pictures`] (req, res) {
    const { query } = req;
    let { pageSize, page, id } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    id = id || -1;
    let newData;
    if(id === '-1'){
      newData = database.pictures;
    }else{
      newData = database.pictures.filter(i => i.category_img_id === id)
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },
  [`GET ${apiPrefix}/albums/tree/getSubTrees`] (req, res) {

    const { parent_id } = req.query;

    const {tree} = database;
    const subtree = tree.filter( i => i.parent_id === parent_id);

    res.status(200).json({
      data: subtree,
      msg:'OK'
    })
  },
  [`POST ${apiPrefix}/albums/tree/update`] (req, res) {
    const { id, name } = req.body;
    const {tree} = database;
    // 将tree对象转化为数组
    let _tree = Array.from(tree);
    // 检测当ID不等于当前ID，修改名称与当前名称是否相等
    let duplication = _tree.find(i => i.name === name && i.id !== id );

    if(duplication){
      // 当存在相同名称时 提示保存失败
      res.status(200).json({success:false,msg: '名称重合' })
    }else{
      tree.forEach(i => {
        if(i.id === id){
          i.name = name
        }
      });
      database = {...database,tree};
      res.status(200).json({msg: '提交成功' })
    }
  },
  [`POST ${apiPrefix}/albums/tree/storeSubTree`] (req, res) {
    const { parent_id, name } = req.body;
    const new_tree = {
      name,
      parent_id,
      id:Mock.mock('@id'),
      subFolder:[],
      picNum:0,
      open:false
    };
    database.tree.push(new_tree);

    res.status(200).json({success:true,msg:'添加成功'})
  },
};

