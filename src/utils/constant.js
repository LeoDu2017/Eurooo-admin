const intl= require('react-intl-universal');
module.exports = {
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
  ],
  formItemLayout:{
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 21 },
    },
  },
  formItemLayoutWithOutLabel:{
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 21, offset: 3 },
    },
  }
};
