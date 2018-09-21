import intl from 'react-intl-universal';
import _ from 'lodash';

const lang = {
  namespace:'lang',
  state:{
    languages:[
      {
        index: 1,
        name:'汉语',
        value: "zh-CN",
        type:'zhongguo',
        selected: false
      },
      {
        index: 1,
        name:'English',
        value: "en-US",
        type:'yingguo',
        selected: false
      },
      {
        index: 1,
        name:'Français',
        value: "fr-FR",
        type:'faguo',
        selected: false
      },
      {
        index: 1,
        name:'Italiano',
        value: "it-IT",
        type:'yidali',
        selected: false
      }
    ],
    currentLocale:'',
  },
  reducers:{
    choose(state,{payload:data}){
      data.languages.forEach(v => {
        v.selected = v.value === data.lang ? !0 : !1;
      });
      return { ...state,languages:data.languages}
    },
    initLang(state,{payload:lang}){
      let locales = lang.locale;
      let currentLocale = lang.type;
      intl.init({
        currentLocale,
        locales: {
          [currentLocale]: locales
        }
      });
      return { ...state,currentLocale}
    }
  },
  effects:{
    *setLocale({ payload:{ lang } }, { call, put,select }){
      let currentLocale = yield intl.determineLocale({urlLocaleKey: "lang",cookieLocaleKey: "lang"});
      lang = lang ? lang : currentLocale;
      const languages = yield select(({lang}) => lang.languages);
      if (!_.find(languages, { value: currentLocale })){currentLocale = "en-US";}
      let data = yield require(`Locale/${lang}`);
      yield put({type:'choose',payload:{languages,lang}});
      yield put({type:'left/setLang',payload:lang});
      yield put({type:'initLang',payload: data.default})
    }
  }
};

export default lang
