/*
* formatMoney(s,type)
* 功能：金额按千位逗号分隔，负号用括号
* 参数：s，需要格式化的金额数值.
* 参数：type,判断格式化后的金额是否需要小数位.
* 返回：返回格式化后的数值字符串.
*/

export function formatMoney(s, type) {
  var result = s;
  if (s < 0)
    s = 0 - s;
  if (/[^0-9\.]/.test(s))
    return "0.00";
  if (s == null || s == "null" || s == "")
    return "0.00";

  if (type > 0)
    s = new Number(s).toFixed(type);
  s = s.toString().replace(/^(\d*)$/, "$1.");
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  s = s.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(s))
    s = s.replace(re, "$1,$2");
  s = s.replace(/,(\d\d)$/, ".$1");

  if (type == 0) {
    var a = s.split(".");
    if (a[1] == "00") {
      s = a[0];
    }
  }
  if (result < 0)
    result = "(" + s + ")";
  else
    result = s;
  return result;
}
