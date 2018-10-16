import appCookie from 'react-cookies';
import { routerRedux } from 'dva/router';
import { changePasswordService } from 'Services/app';
import {
  getMenuData,
  triggerResizeEvent,
} from 'Actions/layout/menu';

import intl from 'react-intl-universal';

export default {
  namespace: 'app',
  state: {
    collapsed: false,
    isMobile: false,
    currentIndex: 0,
    administrator: {
      id: '',
      username: '',
      avatar: '',
      title: '',
      contactNumber: '',
      notifyCount: 0,
      countries: [],
    },
    productStyles: [],
    productSpaces: [],
    ProductClassifications: [],
  },
  reducers: {
    setAdmin(state, { payload: administrator }) {
      return { ...state, administrator };
    },
    setCollapsed(state, { payload: collapsed }) {
      return { ...state, collapsed };
    },
    setCurrentIndex(state, { payload: currentIndex }) {
      return { ...state, currentIndex };
    },
    setUserAgent(state, { payload: isMobile }) {
      return { ...state, isMobile };
    },
    setUserCountries(state, { payload: countries }) {
      return { ...state, countries };
    },
    setProductStyles(state, { payload: productStyles }) {
      return { ...state, productStyles };
    },
    setProductSpaces(state, { payload: productSpaces }) {
      return { ...state, productSpaces };
    },
    setProductClassifications(state, { payload: ProductClassifications }) {
      return { ...state, ProductClassifications };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      triggerResizeEvent();
      return history.listen(({ pathname, query }) => {
        const token = appCookie.load('token');
        // 设置系统语言
        dispatch({ type: 'lang/setLocale', payload: { query } });
        if (pathname !== '/login') {
          const countries = [
            { 'id': '1', 'name': 'Afghanistan' },
            { 'id': '2', 'name': 'Aland Islands' },
            { 'id': '3', 'name': 'Albania' },
            { 'id': '4', 'name': 'Algeria' },
            { 'id': '5', 'name': 'American Samoa' },
            { 'id': '6', 'name': 'Andorra' },
            { 'id': '7', 'name': 'Angola' },
            { 'id': '8', 'name': 'Anguilla' },
            { 'id': '9', 'name': 'Antigua and Barbuda' },
            { 'id': '10', 'name': 'Argentina' },
            { 'id': '11', 'name': 'Armenia' },
            { 'id': '12', 'name': 'Aruba' },
            { 'id': '13', 'name': 'Australia' },
            { 'id': '14', 'name': 'Austria' },
            { 'id': '15', 'name': 'Azerbaijan' },
            { 'id': '16', 'name': 'Bangladesh' },
            { 'id': '17', 'name': 'Bahrain' },
            { 'id': '18', 'name': 'Bahamas' },
            { 'id': '19', 'name': 'Barbados' },
            { 'id': '20', 'name': 'Belarus' },
            { 'id': '21', 'name': intl.get('BELGIUM') },
            { 'id': '22', 'name': 'Belize' },
            { 'id': '23', 'name': 'Benin' },
            { 'id': '24', 'name': 'Bermuda' },
            { 'id': '25', 'name': 'Bhutan' },
            { 'id': '26', 'name': 'Bolivia' },
            { 'id': '27', 'name': 'Bosnia and Herzegovina' },
            { 'id': '28', 'name': 'Botswana' },
            { 'id': '29', 'name': 'Bouvet Island' },
            { 'id': '30', 'name': 'Brazil' },
            { 'id': '31', 'name': 'Brunei' },
            { 'id': '32', 'name': 'Bulgaria' },
            { 'id': '33', 'name': 'Burkina Faso' },
            { 'id': '34', 'name': 'Burundi' },
            { 'id': '35', 'name': 'Cambodia' },
            { 'id': '36', 'name': 'Cameroon' },
            { 'id': '37', 'name': 'Canada' },
            { 'id': '38', 'name': 'Cape Verde' },
            { 'id': '39', 'name': 'Central African Republic' },
            { 'id': '40', 'name': 'Chad' },
            { 'id': '41', 'name': 'Chile' },
            { 'id': '42', 'name': 'Christmas Islands' },
            { 'id': '43', 'name': 'Cocos (keeling) Islands' },
            { 'id': '44', 'name': 'Colombia' },
            { 'id': '45', 'name': 'Comoros' },
            { 'id': '46', 'name': 'Congo (Congo-Kinshasa)' },
            { 'id': '47', 'name': 'Congo' },
            { 'id': '48', 'name': 'Cook Islands' },
            { 'id': '49', 'name': 'Costa Rica' },
            { 'id': '50', 'name': 'Cote D\'Ivoire' },
            { 'id': '51', 'name': 'China' },
            { 'id': '52', 'name': 'Croatia' },
            { 'id': '53', 'name': 'Cuba' },
            { 'id': '54', 'name': 'Czech' },
            { 'id': '55', 'name': 'Cyprus' },
            { 'id': '56', 'name': 'Denmark' },
            { 'id': '57', 'name': 'Djibouti' },
            { 'id': '58', 'name': 'Dominica' },
            { 'id': '59', 'name': 'Ecuador' },
            { 'id': '60', 'name': 'Egypt' },
            { 'id': '61', 'name': 'Equatorial Guinea' },
            { 'id': '62', 'name': 'Eritrea' },
            { 'id': '63', 'name': 'Estonia' },
            { 'id': '64', 'name': 'Ethiopia' },
            { 'id': '65', 'name': 'Faroe Islands' },
            { 'id': '66', 'name': 'Fiji' },
            { 'id': '67', 'name': 'Finland' },
            { 'id': '68', 'name': intl.get('FRANCE') },
            { 'id': '69', 'name': 'Franch Metropolitan' },
            { 'id': '70', 'name': 'Franch Guiana' },
            { 'id': '71', 'name': 'French Polynesia' },
            { 'id': '72', 'name': 'Gabon' },
            { 'id': '73', 'name': 'Gambia' },
            { 'id': '74', 'name': 'Georgia' },
            { 'id': '75', 'name': intl.get('GERMANY') },
            { 'id': '76', 'name': 'Ghana' },
            { 'id': '77', 'name': 'Gibraltar' },
            { 'id': '78', 'name': 'Greece' },
            { 'id': '79', 'name': 'Grenada' },
            { 'id': '80', 'name': 'Guadeloupe' },
            { 'id': '81', 'name': 'Guam' },
            { 'id': '82', 'name': 'Guatemala' },
            { 'id': '83', 'name': 'Guernsey' },
            { 'id': '84', 'name': 'Guinea-Bissau' },
            { 'id': '85', 'name': 'Guinea' },
            { 'id': '86', 'name': 'Guyana' },
            { 'id': '87', 'name': 'Hong Kong' },
            { 'id': '88', 'name': 'Haiti' },
            { 'id': '89', 'name': 'Honduras' },
            { 'id': '90', 'name': 'Hungary' },
            { 'id': '91', 'name': 'Iceland' },
            { 'id': '92', 'name': 'India' },
            { 'id': '93', 'name': 'Indonesia' },
            { 'id': '94', 'name': 'Iran' },
            { 'id': '95', 'name': 'Iraq' },
            { 'id': '96', 'name': 'Ireland' },
            { 'id': '97', 'name': 'Isle of Man' },
            { 'id': '98', 'name': 'Israel' },
            { 'id': '99', 'name': intl.get('ITALY') },
            { 'id': '100', 'name': 'Jamaica' },
            { 'id': '101', 'name': 'Japan' },
            { 'id': '102', 'name': 'Jersey' },
            { 'id': '103', 'name': 'Jordan' },
            { 'id': '104', 'name': 'Kazakhstan' },
            { 'id': '105', 'name': 'Kenya' },
            { 'id': '106', 'name': 'Kiribati' },
            { 'id': '107', 'name': 'Korea (South)' },
            { 'id': '108', 'name': 'Korea (North)' },
            { 'id': '109', 'name': 'Kuwait' },
            { 'id': '110', 'name': 'Kyrgyzstan' },
            { 'id': '111', 'name': 'Laos' },
            { 'id': '112', 'name': 'Latvia' },
            { 'id': '113', 'name': 'Lebanon' },
            { 'id': '114', 'name': 'Lesotho' },
            { 'id': '115', 'name': 'Liberia' },
            { 'id': '116', 'name': 'Libya' },
            { 'id': '117', 'name': 'Liechtenstein' },
            { 'id': '118', 'name': 'Lithuania' },
            { 'id': '119', 'name': 'Luxembourg' },
            { 'id': '120', 'name': 'Macau' },
            { 'id': '121', 'name': 'Macedonia' },
            { 'id': '122', 'name': 'Malawi' },
            { 'id': '123', 'name': 'Malaysia' },
            { 'id': '124', 'name': 'Madagascar' },
            { 'id': '125', 'name': 'Maldives' },
            { 'id': '126', 'name': 'Mali' },
            { 'id': '127', 'name': 'Malta' },
            { 'id': '128', 'name': 'Marshall Islands' },
            { 'id': '129', 'name': 'Martinique' },
            { 'id': '130', 'name': 'Mauritania' },
            { 'id': '131', 'name': 'Mauritius' },
            { 'id': '132', 'name': 'Mayotte' },
            { 'id': '133', 'name': 'Mexico' },
            { 'id': '134', 'name': 'Micronesia' },
            { 'id': '135', 'name': 'Moldova' },
            { 'id': '136', 'name': 'Monaco' },
            { 'id': '137', 'name': 'Mongolia' },
            { 'id': '138', 'name': 'Montenegro' },
            { 'id': '139', 'name': 'Montserrat' },
            { 'id': '140', 'name': 'Morocco' },
            { 'id': '141', 'name': 'Mozambique' },
            { 'id': '142', 'name': 'Myanmar' },
            { 'id': '143', 'name': 'Namibia' },
            { 'id': '144', 'name': 'Nauru' },
            { 'id': '145', 'name': 'Nepal' },
            { 'id': '146', 'name': 'Netherlands' },
            { 'id': '147', 'name': 'New Caledonia' },
            { 'id': '148', 'name': 'New Zealand' },
            { 'id': '149', 'name': 'Nicaragua' },
            { 'id': '150', 'name': 'Niger' },
            { 'id': '151', 'name': 'Nigeria' },
            { 'id': '152', 'name': 'Niue' },
            { 'id': '153', 'name': 'Norfolk Island' },
            { 'id': '154', 'name': 'Norway' },
            { 'id': '155', 'name': 'Oman' },
            { 'id': '156', 'name': 'Pakistan' },
            { 'id': '157', 'name': 'Palau' },
            { 'id': '158', 'name': 'Palestine' },
            { 'id': '159', 'name': 'Panama' },
            { 'id': '160', 'name': 'Papua New Guinea' },
            { 'id': '161', 'name': 'Paraguay' },
            { 'id': '162', 'name': 'Peru' },
            { 'id': '163', 'name': 'Philippines' },
            { 'id': '164', 'name': 'Pitcairn Islands' },
            { 'id': '165', 'name': 'Poland' },
            { 'id': '166', 'name': intl.get('PORTUGAL') },
            { 'id': '167', 'name': 'Puerto Rico' },
            { 'id': '168', 'name': 'Qatar' },
            { 'id': '169', 'name': 'Reunion' },
            { 'id': '170', 'name': 'Romania' },
            { 'id': '171', 'name': 'Rwanda' },
            { 'id': '172', 'name': 'Russian Federation' },
            { 'id': '173', 'name': 'Saint Helena' },
            { 'id': '174', 'name': 'Saint Kitts-Nevis' },
            { 'id': '175', 'name': 'Saint Lucia' },
            { 'id': '176', 'name': 'Saint Vincent and the Grenadines' },
            { 'id': '177', 'name': 'El Salvador' },
            { 'id': '178', 'name': 'Samoa' },
            { 'id': '179', 'name': 'San Marino' },
            { 'id': '180', 'name': 'Sao Tome and Principe' },
            { 'id': '181', 'name': 'Saudi Arabia' },
            { 'id': '182', 'name': 'Senegal' },
            { 'id': '183', 'name': 'Seychelles' },
            { 'id': '184', 'name': 'Sierra Leone' },
            { 'id': '185', 'name': 'Singapore' },
            { 'id': '186', 'name': 'Serbia' },
            { 'id': '187', 'name': 'Slovakia' },
            { 'id': '188', 'name': 'Slovenia' },
            { 'id': '189', 'name': 'Solomon Islands' },
            { 'id': '190', 'name': 'Somalia' },
            { 'id': '191', 'name': 'South Africa' },
            { 'id': '192', 'name': intl.get('SPAIN') },
            { 'id': '193', 'name': 'Sri Lanka' },
            { 'id': '194', 'name': 'Sudan' },
            { 'id': '195', 'name': 'Suriname' },
            { 'id': '196', 'name': 'Swaziland' },
            { 'id': '197', 'name': intl.get('SWEDEN') },
            { 'id': '198', 'name': intl.get('SWITZERLAND') },
            { 'id': '199', 'name': intl.get('SYRIA') },
            { 'id': '200', 'name': intl.get('TAJIKISTAN') },
            { 'id': '201', 'name': intl.get('TANZANIA') },
            { 'id': '202', 'name': 'Taiwan' },
            { 'id': '203', 'name': intl.get('THAILAND') },
            { 'id': '204', 'name': 'Trinidad and Tobago' },
            { 'id': '205', 'name': 'Timor-Leste' },
            { 'id': '206', 'name': 'Togo' },
            { 'id': '207', 'name': 'Tokelau' },
            { 'id': '208', 'name': 'Tonga' },
            { 'id': '209', 'name': 'Tunisia' },
            { 'id': '210', 'name': 'Turkey' },
            { 'id': '211', 'name': 'Turkmenistan' },
            { 'id': '212', 'name': 'Tuvalu' },
            { 'id': '213', 'name': 'Uganda' },
            { 'id': '214', 'name': 'Ukraine' },
            { 'id': '215', 'name': intl.get('UAE') },
            { 'id': '216', 'name': intl.get('UK') },
            { 'id': '217', 'name': 'United States' },
            { 'id': '218', 'name': 'Uruguay' },
            { 'id': '219', 'name': 'Uzbekistan' },
            { 'id': '220', 'name': 'Vanuatu' },
            { 'id': '221', 'name': 'Vatican City' },
            { 'id': '222', 'name': 'Venezuela' },
            { 'id': '223', 'name': 'Vietnam' },
            { 'id': '224', 'name': 'Wallis and Futuna' },
            { 'id': '225', 'name': 'Western Sahara' },
            { 'id': '226', 'name': 'Yemen' },
            { 'id': '227', 'name': 'Yugoslavia' },
            { 'id': '228', 'name': 'Zambia' },
            { 'id': '229', 'name': 'Zimbabwe' },
            { 'id': '230', 'name': 'Europe' },
            { 'id': '231', 'name': 'Other' },
          ];
          const styles = [
            {
              id: 10,
              name: intl.get('MFSTYLE'),
            },
            {
              id: 9,
              name: intl.get('NSTYLE'),
            },
            {
              id: 8,
              name: intl.get('CHSTYLE'),
            },
            {
              id: 7,
              name: intl.get('RSTYLE'),
            },
            {
              id: 6,
              name: intl.get('ASTYLE'),
            },
            {
              id: 5,
              name: intl.get('NSSTYLE'),
            },
            {
              id: 4,
              name: intl.get('OTHER'),
            },
            {
              id: 3,
              name: intl.get('CSTYLE'),
            },
            {
              id: 2,
              name: intl.get('MSTYLE'),
            },
            {
              id: 1,
              name: intl.get('PSTYLE'),
            }];
          const spaces = [
            {
              id: 9,
              name: intl.get('OTHER'),
            },
            {
              id: 8,
              name: intl.get('OUTDOOR'),
            },
            {
              id: 7,
              name: intl.get('KIDS'),
            },
            {
              id: 6,
              name: intl.get('KITCHEN'),
            },
            {
              id: 5,
              name: intl.get('DINNING'),
            },
            {
              id: 4,
              name: intl.get('HOMEOFFICE'),
            },
            {
              id: 3,
              name: intl.get('BATHROOM'),
            },
            {
              id: 2,
              name: intl.get('BEDROOM'),
            },
            {
              id: 1,
              name: intl.get('LIVINGROOM'),
            },
          ];
          const classifications = [
            {
              id: '1',
              name: 'Furniture',
              children: [
                {
                  id: '17',
                  name: 'Sofa',
                  subChildren: [
                    {
                      id: '30',
                      name: 'Single sofa',
                    },
                    {
                      id: '36',
                      name: 'Double sofa',
                    },
                    {
                      id: '40',
                      name: '3-seats sofa',
                    },
                    {
                      id: '43',
                      name: '4-seats sofa',
                    },
                    {
                      id: '47',
                      name: 'Combination sofa',
                    },
                    {
                      id: '53',
                      name: 'Corner sofa',
                    },
                    {
                      id: '59',
                      name: 'U shaped sofa',
                    },
                    {
                      id: '62',
                      name: 'Chaise lounge',
                    },
                    {
                      id: '139',
                      name: 'Recliner sofa',
                    },
                  ],
                },
                {
                  id: '18',
                  name: 'Cabinet',
                  subChildren: [
                    {
                      id: '28',
                      name: 'Wardrobe',
                    },
                    {
                      id: '31',
                      name: 'TV cabinet',
                    },
                    {
                      id: '35',
                      name: 'Wine cabinet',
                    },
                    {
                      id: '39',
                      name: 'Side cabinet',
                    },
                    {
                      id: '42',
                      name: 'Console',
                    },
                    {
                      id: '44',
                      name: 'Bookcase',
                    },
                    {
                      id: '46',
                      name: 'Bedside cabinet',
                    },
                    {
                      id: '49',
                      name: 'Bed end bench',
                    },
                    {
                      id: '51',
                      name: 'Cupboard',
                    },
                    {
                      id: '54',
                      name: 'Dressing cabinet',
                    },
                    {
                      id: '57',
                      name: 'Corner cabinet',
                    },
                    {
                      id: '64',
                      name: 'Display cabinet',
                    },
                    {
                      id: '67',
                      name: 'Drawers unit',
                    },
                    {
                      id: '69',
                      name: 'Combination cabinet',
                    },
                    {
                      id: '72',
                      name: 'Lockers',
                    },
                    {
                      id: '75',
                      name: 'Tableware cabinet',
                    },
                    {
                      id: '80',
                      name: 'Wall cabinet',
                    },
                    {
                      id: '82',
                      name: 'Round cabinet',
                    },
                    {
                      id: '87',
                      name: 'Shoe cabinet',
                    },
                    {
                      id: '90',
                      name: 'Decorative cabinet',
                    },
                    {
                      id: '92',
                      name: 'Walk-in closet',
                    },
                    {
                      id: '395',
                      name: 'Letter box',
                    },
                    {
                      id: '396',
                      name: 'Safe',
                    },
                  ],
                },
                {
                  id: '21',
                  name: 'Table',
                  subChildren: [
                    {
                      id: '185',
                      name: 'Dining table',
                    },
                    {
                      id: '190',
                      name: 'Office table',
                    },
                    {
                      id: '195',
                      name: 'Side table',
                    },
                    {
                      id: '199',
                      name: 'Round table',
                    },
                    {
                      id: '204',
                      name: 'Writing table',
                    },
                    {
                      id: '210',
                      name: 'Chess table',
                    },
                    {
                      id: '214',
                      name: 'Phone desk',
                    },
                    {
                      id: '218',
                      name: 'Children desk',
                    },
                    {
                      id: '221',
                      name: 'Writing desk',
                    },
                    {
                      id: '226',
                      name: 'Console table',
                    },
                    {
                      id: '230',
                      name: 'Coffee table',
                    },
                    {
                      id: '234',
                      name: 'Square table',
                    },
                    {
                      id: '239',
                      name: 'Meeting table',
                    },
                    {
                      id: '242',
                      name: 'Dressing table',
                    },
                    {
                      id: '249',
                      name: 'Bedside table',
                    },
                    {
                      id: '252',
                      name: 'Computer desk',
                    },
                    {
                      id: '256',
                      name: 'Folding tables',
                    },
                  ],
                },
                {
                  id: '70',
                  name: 'Bed',
                  subChildren: [
                    {
                      id: '143',
                      name: 'Single bed',
                    },
                    {
                      id: '170',
                      name: 'Headboard',
                    },
                    {
                      id: '175',
                      name: 'Bedstead/Bed frame',
                    },
                    {
                      id: '180',
                      name: 'Crib',
                    },
                    {
                      id: '403',
                      name: 'Mattress',
                    },
                    {
                      id: '405',
                      name: 'Adjustable bed',
                    },
                  ],
                },
                {
                  id: '74',
                  name: 'Chair',
                  subChildren: [
                    {
                      id: '107',
                      name: 'Dining chair',
                    },
                    {
                      id: '110',
                      name: 'Barstool',
                    },
                    {
                      id: '113',
                      name: 'Royal chair',
                    },
                    {
                      id: '117',
                      name: 'Lounge chair',
                    },
                    {
                      id: '120',
                      name: 'Swivel chair',
                    },
                    {
                      id: '122',
                      name: 'Office chair',
                    },
                    {
                      id: '125',
                      name: 'Armchair',
                    },
                    {
                      id: '126',
                      name: 'Single chair',
                    },
                    {
                      id: '129',
                      name: 'Sling chair',
                    },
                    {
                      id: '131',
                      name: 'Dressing table chair',
                    },
                    {
                      id: '133',
                      name: 'Rocking chair',
                    },
                    {
                      id: '388',
                      name: 'Folding seat',
                    },
                  ],
                },
                {
                  id: '140',
                  name: 'Coffee table',
                  subChildren: [
                    {
                      id: '145',
                      name: 'Corner table',
                    },
                    {
                      id: '148',
                      name: 'Side table',
                    },
                    {
                      id: '151',
                      name: 'Round table',
                    },
                    {
                      id: '155',
                      name: 'Long table',
                    },
                    {
                      id: '159',
                      name: 'Square table',
                    },
                  ],
                },
                {
                  id: '165',
                  name: 'Benches',
                  subChildren: [
                    {
                      id: '167',
                      name: 'Bedside bench',
                    },
                    {
                      id: '171',
                      name: 'Dressing stool',
                    },
                    {
                      id: '173',
                      name: 'Footstool',
                    },
                    {
                      id: '179',
                      name: 'Bench',
                    },
                    {
                      id: '181',
                      name: 'Wooden stool',
                    },
                    {
                      id: '182',
                      name: 'Stool',
                    },
                    {
                      id: '406',
                      name: 'Bar stool',
                    },
                  ],
                },
                {
                  id: '184',
                  name: 'Shelves',
                  subChildren: [
                    {
                      id: '188',
                      name: 'Coat rack',
                    },
                    {
                      id: '193',
                      name: 'Shelving unit',
                    },
                    {
                      id: '352',
                      name: 'Bookshelf',
                    },
                    {
                      id: '353',
                      name: 'Flower racks',
                    },
                    {
                      id: '354',
                      name: 'Wine rack',
                    },
                    {
                      id: '355',
                      name: 'Corner shelves',
                    },
                    {
                      id: '356',
                      name: 'TV rack',
                    },
                  ],
                },
                {
                  id: '357',
                  name: 'Storage table',
                  subChildren: [
                    {
                      id: '358',
                      name: 'Bar counter',
                    },
                    {
                      id: '359',
                      name: 'Candlestick',
                    },
                    {
                      id: '360',
                      name: 'Console',
                    },
                  ],
                },
                {
                  id: '381',
                  name: 'Other',
                  subChildren: [
                    {
                      id: '382',
                      name: 'Kennel',
                    }],
                },
              ],
            },
            {
              id: '2',
              name: 'Material',
              children: [
                {
                  id: '33',
                  name: 'Paint',
                  subChildren: [
                    {
                      id: '65',
                      name: 'Outdoor wall paint',
                    },
                    {
                      id: '68',
                      name: 'Interior wall paint',
                    },
                    {
                      id: '78',
                      name: 'Wood paint',
                    },
                    {
                      id: '85',
                      name: 'Polyester paint',
                    },
                    {
                      id: '94',
                      name: 'Special paint',
                    },
                  ],
                },
                {
                  id: '88',
                  name: 'Stone',
                  subChildren: [
                    {
                      id: '114',
                      name: 'Marble',
                    },
                    {
                      id: '119',
                      name: 'Granite',
                    },
                    {
                      id: '128',
                      name: 'Sandstone',
                    },
                    {
                      id: '136',
                      name: 'Slate',
                    },
                  ],
                },
                {
                  id: '95',
                  name: 'Ceramic tile',
                  subChildren: [
                    {
                      id: '152',
                      name: 'Facade tiles',
                    },
                    {
                      id: '157',
                      name: 'Indoor tiles',
                    },
                    {
                      id: '162',
                      name: 'Floor tiles',
                    },
                    {
                      id: '169',
                      name: 'Outdoor tiles',
                    },
                    {
                      id: '187',
                      name: 'Glazed tiles',
                    },
                    {
                      id: '194',
                      name: 'Tiles',
                    },
                    {
                      id: '402',
                      name: 'Mosaic',
                    },
                  ],
                },
                {
                  id: '101',
                  name: 'Floors',
                  subChildren: [
                    {
                      id: '207',
                      name: 'PVC floor',
                    },
                    {
                      id: '212',
                      name: 'Solid wood floor',
                    },
                    {
                      id: '233',
                      name: 'Composite floor',
                    },
                    {
                      id: '245',
                      name: 'Wood floor',
                    },
                  ],
                },
                {
                  id: '134',
                  name: 'Doors and windows',
                  subChildren: [
                    {
                      id: '137',
                      name: 'Sliding doors',
                    },
                    {
                      id: '149',
                      name: 'Glass windows',
                    },
                    {
                      id: '164',
                      name: 'Glass door',
                    },
                    {
                      id: '168',
                      name: 'Wooden doors and windows',
                    },
                    {
                      id: '172',
                      name: 'Metal doors and windows',
                    },
                    {
                      id: '178',
                      name: 'Frame',
                    },
                  ],
                },
                {
                  id: '183',
                  name: 'Hydraulic equipment',
                  subChildren: [
                    {
                      id: '186',
                      name: 'Radiator',
                    }],
                },
                {
                  id: '196',
                  name: 'Lighting',
                  subChildren: [
                    {
                      id: '200',
                      name: 'Chandelier',
                    },
                    {
                      id: '202',
                      name: 'Ceiling light',
                    },
                    {
                      id: '206',
                      name: 'Neon lamp',
                    },
                    {
                      id: '209',
                      name: 'Wall lamp',
                    },
                    {
                      id: '211',
                      name: 'Table lamp',
                    },
                    {
                      id: '215',
                      name: 'Outdoor decorative light',
                    },
                    {
                      id: '219',
                      name: 'Electrical ballast',
                    },
                    {
                      id: '222',
                      name: 'Light bulb',
                    },
                    {
                      id: '225',
                      name: 'Energy saving lamp',
                    },
                    {
                      id: '228',
                      name: 'Commercial lighting',
                    },
                    {
                      id: '231',
                      name: 'Color lamp',
                    },
                    {
                      id: '235',
                      name: 'Outdoor lighting',
                    },
                    {
                      id: '238',
                      name: 'Interiors lighting',
                    },
                    {
                      id: '240',
                      name: 'Electric light',
                    },
                    {
                      id: '344',
                      name: 'Floor lamp',
                    },
                    {
                      id: '345',
                      name: 'Bedside lamp',
                    },
                    {
                      id: '407',
                      name: 'Spotlight',
                    },
                  ],
                },
                {
                  id: '267',
                  name: 'Wallpapers',
                  subChildren: [
                    {
                      id: '273',
                      name: 'Wallpaper',
                    }],
                },
                {
                  id: '307',
                  name: 'Accessories',
                  subChildren: [
                    {
                      id: '309',
                      name: 'Sanitary ware',
                    },
                    {
                      id: '311',
                      name: 'Washbasin',
                    },
                    {
                      id: '312',
                      name: 'Faucet',
                    },
                    {
                      id: '313',
                      name: 'Squat toilet',
                    },
                    {
                      id: '314',
                      name: 'Bathtub',
                    },
                    {
                      id: '315',
                      name: 'Shower',
                    },
                    {
                      id: '316',
                      name: 'Bathroom cabinet',
                    },
                    {
                      id: '318',
                      name: 'Flush valve',
                    },
                    {
                      id: '319',
                      name: 'Shower door',
                    },
                    {
                      id: '346',
                      name: 'Towel rack',
                    },
                    {
                      id: '347',
                      name: 'Basin',
                    },
                    {
                      id: '348',
                      name: 'Shower tray',
                    },
                    {
                      id: '349',
                      name: 'Sauna room',
                    },
                    {
                      id: '350',
                      name: 'Shower set',
                    },
                  ],
                },
                {
                  id: '320',
                  name: 'Hardware',
                  subChildren: [
                    {
                      id: '321',
                      name: 'Moulding',
                    },
                    {
                      id: '322',
                      name: 'Switch',
                    },
                    {
                      id: '323',
                      name: 'Locks',
                    },
                    {
                      id: '324',
                      name: 'Handle',
                    },
                    {
                      id: '326',
                      name: 'Hinge',
                    },
                    {
                      id: '328',
                      name: 'Sliding rails',
                    },
                    {
                      id: '329',
                      name: 'Hinge',
                    },
                  ],
                },
                {
                  id: '332',
                  name: 'Partitions',
                  subChildren: [
                    {
                      id: '333',
                      name: 'Movable partition',
                    },
                    {
                      id: '334',
                      name: 'Bathroom partition',
                    },
                    {
                      id: '335',
                      name: 'Screen',
                    },
                    {
                      id: '336',
                      name: 'Office partition',
                    },
                  ],
                },
                {
                  id: '372',
                  name: 'Fireplaces and stoves',
                  subChildren: [
                    {
                      id: '378',
                      name: 'Fireplace',
                    }],
                },
                {
                  id: '391',
                  name: 'Stairs',
                  subChildren: [
                    {
                      id: '392',
                      name: 'Stairs',
                    },
                    {
                      id: '408',
                      name: 'Handrail',
                    },
                  ],
                },
                {
                  id: '398',
                  name: 'Boards',
                  subChildren: [
                    {
                      id: '399',
                      name: 'Wooden board',
                    },
                    {
                      id: '400',
                      name: 'Panel',
                    },
                    {
                      id: '401',
                      name: 'Metal',
                    },
                  ],
                },
              ],
            },
            {
              id: '3',
              name: 'Decoration',
              children: [
                {
                  id: '4',
                  name: 'Bedding',
                  subChildren: [
                    {
                      id: '7',
                      name: 'Bed linen',
                    },
                    {
                      id: '9',
                      name: 'Pillow',
                    },
                    {
                      id: '10',
                      name: 'Blanket',
                    },
                    {
                      id: '14',
                      name: 'Bed sheet',
                    },
                    {
                      id: '387',
                      name: 'Mattress',
                    },
                  ],
                },
                {
                  id: '5',
                  name: 'House supplies',
                  subChildren: [
                    {
                      id: '26',
                      name: 'Drying racks',
                    },
                    {
                      id: '27',
                      name: 'Storage unit',
                    },
                    {
                      id: '37',
                      name: 'Hanger',
                    },
                    {
                      id: '45',
                      name: 'Cleaning supplies',
                    },
                    {
                      id: '48',
                      name: 'Storage box/bag',
                    },
                    {
                      id: '50',
                      name: 'Toiletries',
                    },
                    {
                      id: '52',
                      name: 'Hook',
                    },
                    {
                      id: '60',
                      name: 'Mirror',
                    },
                    {
                      id: '63',
                      name: 'Trash can',
                    },
                    {
                      id: '390',
                      name: 'Umbrella stand',
                    },
                    {
                      id: '393',
                      name: 'Mahjong',
                    },
                    {
                      id: '397',
                      name: 'Glass',
                    },
                  ],
                },
                {
                  id: '6',
                  name: 'Fabric',
                  subChildren: [
                    {
                      id: '66',
                      name: 'Curtain',
                    },
                    {
                      id: '71',
                      name: 'Rugs/carpet',
                    },
                    {
                      id: '76',
                      name: 'Sofa cover',
                    },
                    {
                      id: '81',
                      name: 'Towels',
                    },
                    {
                      id: '84',
                      name: 'Cushion',
                    },
                    {
                      id: '93',
                      name: 'Pillow',
                    },
                    {
                      id: '100',
                      name: 'Tablecloth',
                    },
                    {
                      id: '394',
                      name: 'Fabric',
                    },
                  ],
                },
                {
                  id: '25',
                  name: 'Home decoration',
                  subChildren: [
                    {
                      id: '96',
                      name: 'Paintings',
                    },
                    {
                      id: '99',
                      name: 'Accessories',
                    },
                    {
                      id: '104',
                      name: 'Clock',
                    },
                    {
                      id: '116',
                      name: 'Flower pot',
                    },
                    {
                      id: '124',
                      name: 'Photo frames',
                    },
                    {
                      id: '135',
                      name: 'Wall decorations',
                    },
                    {
                      id: '138',
                      name: 'Flower stand',
                    },
                    {
                      id: '147',
                      name: ' Candles and candle holders',
                    },
                    {
                      id: '153',
                      name: 'Ashtray',
                    },
                    {
                      id: '156',
                      name: 'Jewelry box',
                    },
                    {
                      id: '166',
                      name: 'Tray',
                    },
                    {
                      id: '339',
                      name: 'Wedding accessories',
                    },
                  ],
                },
                {
                  id: '198',
                  name: 'Kitchen supplies',
                  subChildren: [
                    {
                      id: '201',
                      name: 'Tableware',
                    },
                    {
                      id: '205',
                      name: 'Kitchen accessories',
                    },
                    {
                      id: '208',
                      name: 'Tea pots',
                    },
                    {
                      id: '216',
                      name: 'Knives and cutting boards',
                    },
                    {
                      id: '220',
                      name: 'Glasses and cups',
                    },
                    {
                      id: '224',
                      name: 'Spatulas',
                    },
                    {
                      id: '232',
                      name: 'Wine set',
                    },
                    {
                      id: '340',
                      name: 'Serving plate',
                    },
                    {
                      id: '363',
                      name: 'Kitchen cart',
                    },
                  ],
                },
              ],
            }
          ];
          dispatch({
            type: 'setUserCountries',
            payload: countries,
          });
          dispatch({
            type: 'setProductStyles',
            payload: styles,
          });
          dispatch({
            type: 'setProductSpaces',
            payload: spaces,
          });
          dispatch({
            type: 'setProductClassifications',
            payload: classifications,
          });
          const menuData = {
            index: [
              {
                name: intl.get('HOME'),
                icon: 'home',
                path: '',
                children: [],
              }],
            spots: [
              {
                name: '',
                path: '',
                children: [],
              },
              {
                name: intl.get('HOME'),
                icon: 'home',
                path: 'main',
                children: [],
              },
              {
                name: intl.get('SHOP'),
                icon: 'shop',
                path: 'shop',
                children: [
                  {
                    name: intl.get('SHOPINFO'),
                    path: 'info',
                  },
                  {
                    name: intl.get('SHOPADMIN'),
                    path: 'admin',
                  },
                ],
              },
              {
                name: intl.get('BRAND'),
                icon: 'tags',
                path: 'brand',
                children: [
                  {
                    name: intl.get('BRANDLIST'),
                    path: 'list',
                  },
                ],
              },
              {
                name: intl.get('PRODUCT'),
                icon: 'shopping-cart',
                path: 'product',
                children: [
                  {
                    name: intl.get('PRODUCTLIST'),
                    path: 'list',
                  },
                ],
              },
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
              }],
            futures: [
              {
                name: 'Home',
                icon: 'home',
                path: '/',
                children: [],
              }],
          };
          // 设置登录状态
          !token ? dispatch(routerRedux.push('/login')) :
            dispatch({
              type: 'setAdmin',
              payload: token.administrator,
            });
          // 设置导航打开状态
          const menu = getMenuData(pathname, menuData);
          dispatch({
            type: 'sideMenu/getAppMenuData',
            payload: { pathname, menu },
          });
          // 设置设备类型
          let useerAgent = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
          dispatch({
            type: 'setUserAgent',
            payload: useerAgent,
          });
          // 设置全局禁销国家列表

        }
      });
    },
  },
};
