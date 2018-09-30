const intl= require('react-intl-universal');
console.log(2,intl.get('BRANDSERIAL'));
module.exports = {
  menuData:[
    {
      name: 'Pages',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        },
        {
          name: '监控页',
          path: 'monitor',
        },
        {
          name: '工作台',
          path: 'workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },
  ],
  notAllowCountry: [
    {
      id: '21',
      name: intl.get('BRANDSERIAL'),
    },
    {
      id: '68',
      name: 'France',
    },
    {
      id: '69',
      name: 'Franch Metropolitan',
    },
    {
      id: '75',
      name: 'Germany',
    },
    {
      id: '99',
      name: 'Italy',
    },
    {
      id: '166',
      name: 'Portugal',
    },
    {
      id: '192',
      name: 'Spain',
    },
    {
      id: '197',
      name: 'Sweden',
    },
    {
      id: '198',
      name: 'Switzerland',
    },
    {
      id: '199',
      name: 'Syria',
    },
    {
      id: '200',
      name: 'Tajikistan',
    },
    {
      id: '201',
      name: 'Tanzania',
    },
    {
      id: '202',
      name: 'Taiwan',
    },
    {
      id: '203',
      name: 'Thailand',
    },
    {
      id: '215',
      name: 'United Arab Emirates',
    },
    {
      id: '216',
      name: 'United Kingdom',
    },
  ]
};
