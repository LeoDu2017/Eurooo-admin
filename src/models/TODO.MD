一、全局状态负责管理 Local(setLocale)、登录状态(loginhook)：
    1、Local(setLocale)：
      app:
      setup({ dispatch,history }){
        return history.listen(({ pathname,query }) => {
          dispatch({ type:'lang/setLocale',payload:{query} }); // setLocale
        });
      }
      lang/setLocale:
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
    2、登录状态(loginhook)：
      进入页面前查找本地 session 判断是否登录， 如果登录进入页面，如果未登录 redirection 到登录页面；

