const qs              = require('qs');
const Mock            = require('mockjs');
const config          = require('../src/utils/config');
const {
  apiPrefix,
  NOTFOUND }          = config;
const process         = require('../src/utils/dataProcessing');
const { queryArray }  = process;
const EnumRoleType    = {
  ADMIN: 1,
  DEFAULT: 0,
  DEVELOPER: 1,
};
const userPermission  = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
};
const AccountState    = {
    ON:1,
    OFF:0,
};
const adminUsers      = [
  {
    key:0,
    id: 0,
    username: 'admin',
    password: 'admin',
    name:'吴敬琏',
    title: '总经理',
    contactNumber: '18512456323',
    userMode:AccountState.ON,
    permissions: userPermission.ADMIN,
    notifyCount: 12,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','A')
  }, {
    key:1,
    id: 1,
    username: 'guest',
    password: 'guest',
    name:'吴承恩',
    title: '副总经理',
    contactNumber: '17712345285',
    userMode:AccountState.ON,
    permissions: EnumRoleType.DEFAULT,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','G')
  }, {
    key:2,
    id: 2,
    username: 'Yanzu-Wu',
    password: '123456',
    name:'吴彦祖',
    title: '宣传委员',
    contactNumber: '13396562523',
    userMode:AccountState.ON,
    permissions: EnumRoleType.DEVELOPER,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','Y')
  },{
    key:3,
    id: 3,
    username: 'LeoDu',
    password: '123456',
    name:'杜朝辉',
    title: 'VIP会员',
    contactNumber: '15845632356',
    userMode:AccountState.ON,
    permissions: EnumRoleType.ADMIN,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','L')
  },{
    key: 4,
    id: 4,
    username: 'John-Wu',
    password: '123456',
    name:'吴海涛',
    title: '懂事长,化学代表',
    contactNumber: '15874124563',
    userMode:AccountState.ON,
    permissions: EnumRoleType.ADMIN,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','J')
  }, {
    key: 5,
    id: 5,
    username: 'Jim-Wu',
    password: '123456',
    name:'吴奇隆',
    title: '总经理',
    contactNumber: '13958021234',
    userMode:AccountState.OFF,
    permissions: EnumRoleType.DEVELOPER,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','J')

  }, {
    key: 6,
    id: 6,
    username: 'Joe-Wu',
    password: '123456',
    name:'吴亦凡',
    title: '销售总监,总设计师',
    contactNumber: '13698526325',
    userMode:AccountState.OFF,
    permissions: EnumRoleType.DEVELOPER,
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png','J')
  }
];
let   database        = adminUsers;

module.exports = {
  // 登录
  [`POST ${apiPrefix}/user/login`] (req, res) {
    const { username, password } = req.body;
    const user = database.filter(item => item.username === username && item.password === password );
    const administrator = user[0];
    if (administrator) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ administrator, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: false,
      });
      res.json({ success: true, administrator, message: 'Ok' })
    } else {
      res.json({ success: false, message: '登录失败' })
    }
  },
  // 退出
  [`GET ${apiPrefix}/user/logout`] (req, res) {
    res.clearCookie('token');
    res.json({ success: true, message:'退出成功'});
    // res.status(200).end()
  },
  // 修改管理员密码
  [`POST ${apiPrefix}/user/changePassword`] (req, res) {
    const { id,originalPassword,newPassword } = req.body;
    const user = database.filter(item => item.id === id);
    const administrator = user[0];
    if (administrator) {
      if (administrator.password === originalPassword) {
        database = database.map((item) => {
          if (item.id === id) {
            let password = newPassword;
            return Object.assign({},item,{password})
          }
          return item
        });
        res.json({ success: true, status: 1})
      } else {
        res.json({ success: false, status: 0 })
      }
    } else {
      res.json({ success: false, status: -1 })
    }
  },
  // 修改管理员信息
  [`POST ${apiPrefix}/user/changeUserInfo`] (req,res) {
    const newData = req.body;

    database = database.map(item => {
      if (item.id === newData.id) {
        return Object.assign({}, item, newData)
      }
      return item
    });
    const user = database.filter(item => item.id === newData.id);
    const administrator = user[0];
    res.json({ success:true, administrator, msg:'修改成功' })

  },
  [`GET ${apiPrefix}/user`]         (req, res) {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response = {};
    const user = {};
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' });
      return
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = database.filter(_ => _.id === token.id);
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions;
        user.username = userItem[0].username;
        user.id = userItem[0].id
      }
    }
    response.user = user;
    res.json(response)
  },
  // 管理员列表
  [`GET ${apiPrefix}/shop/admin`]        (req, res) {


    const { query } = req;
    console.log(query);
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 1;
    page = page || 1;

    let newData = database;

    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {

        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime();
              const end = new Date(other[key][1]).getTime();
              const now = new Date(item[key]).getTime();

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    newData = newData.map(item => {
      const {password,...reset} = item;
      return reset
    });
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
      current: page
    })
  },
  // 删除管理员
  [`POST ${apiPrefix}/user/del`]    (req, res) {
    const { id } = req.body;
    const data = queryArray(database, id, 'id');
    if (data) {
      database = database.filter(item => item.id !== id);
      res.status(200).json({status:1,msg: '删除成功' })
      // res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  // 添加管理员
  [`POST ${apiPrefix}/user/add`]    (req, res) {
    const newData = req.body;
    const len = database.length;
    if(newData.hasOwnProperty('id')){
      database = database.map((item) => {
        if (item.id === newData.id) {
          return Object.assign({}, item, newData)
        }
        return item
      });
    }else{
      newData.id = len;
      newData.key = len;
      database.push(newData);
      newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'png', newData.username.substr(0, 1))

    }
    res.status(200).json({status:1,msg: '添加成功' })
  },
  // 重置管理员密码
  [`POST ${apiPrefix}/user/reset`]  (req, res) {
    const {id} = req.body;
    database = database.map((item) => {
      if (item.id === id) {
        let password = '123456';
        return Object.assign({},item,{password})
      }
      return item
    });
    res.status(200).json({status:1,msg: '重置成功' })
  },
  [`DELETE ${apiPrefix}/users`]     (req, res) {
    const { ids } = req.body;
    database = database.filter(item => !ids.some(_ => _ === item.id));
    res.status(204).end()
  },
  [`POST ${apiPrefix}/user`]        (req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1));

    newData.id = Mock.mock('@id');

    database.unshift(newData);

    res.status(200).end();
  },
  [`GET ${apiPrefix}/user/:id`]     (req, res) {
    const { id } = req.params;
    const data = queryArray(database, id, 'id');
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  [`DELETE ${apiPrefix}/user/:id`]  (req, res) {
    const { id } = req.params;
    const data = queryArray(database, id, 'id');
    if (data) {
      database = database.filter(item => item.id !== id);
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  [`PATCH ${apiPrefix}/user/:id`]   (req, res) {
    const { id } = req.params;
    const editItem = req.body;
    let isExist = false;

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign({}, item, editItem)
      }
      return item
    });

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  }
};
