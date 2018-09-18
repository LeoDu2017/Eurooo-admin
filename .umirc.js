const path = require('path');
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'Eurooo_stock',
      dll: true,
      pwa: false,
      routes: {
        exclude: [],
      },
      hardSource: true,
    }],
  ],
  alias: {
    Styles: path.resolve(__dirname, 'src/styles/'),
    Components: path.resolve(__dirname, 'src/components/'),
    Assets: path.resolve(__dirname, 'src/assets/'),
    Actions: path.resolve(__dirname, 'src/actions/'),
    Locale: path.resolve(__dirname, 'src/locale/'),
  }
}
