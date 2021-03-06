const APIV1 = '/api/v1';
const APIV2 = '/api/v2';

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    getTrees:`${APIV1}/albums/tree`,
    updateTreeNames:`${APIV1}/albums/tree/update`,
    storeSubTrees:`${APIV1}/albums/tree/storeSubTree`,
    getSubTrees:`${APIV1}/albums/tree/getSubTrees`,
    getPictures:`${APIV1}/albums/pictures`,

    getShopInfoApi:`${APIV1}/shop/info`,
    updateShopInfoApi:`${APIV1}/shop/info/update`,
    getShopAdminsApi:`${APIV1}/shop/admins`,
    delShopAdminApi:`${APIV1}/user/del`,
    createShopAdminApi:`${APIV1}/user/add`,
    resetPasswordApi:`${APIV1}/user/reset`,

    getBrandsListApi:`${APIV1}/brand/list`,
    updateBrandsListApi:`${APIV1}/brand/list`,
    delBrandApi:`${APIV1}/brand/del`,
    getBannedApi:`${APIV1}/brand/banned`,
    getAllBrandsApi:`${APIV1}/brand/all`,
    updateBannedApi:`${APIV1}/brand/:id`,

    fetchProductApi:`${APIV1}/product/list`,

    getCountryApi:`${APIV1}/country`,

    changeUserInfoApi: `${APIV1}/user/changeUserInfo`,
    changePasswordApi: `${APIV1}/user/changePassword`,
    userLoginApi: `${APIV1}/user/login`,
    userLogoutApi: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    usersApi: `${APIV1}/shop/admin`,
    posts: `${APIV1}/posts`,
    // user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
  NOTFOUND:{
    message: 'Not Found',
    documentation_url: 'http://localhost:8000/request',
  }
};
