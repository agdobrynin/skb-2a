/**
 * Возвращает канонизированое имя либо строку с ошибкой
 *
 * @param  {string} name                  строка которую обрабатываем
 * @param  {String} [invalidname="Invalid username"]    строка с ошибкой
 * @return {string}
 */
export default function canonizename (name, invalidname = "Invalid username"){
  //модуль URL
  const url = require('url');
  // получить из query string по параметру username
  var parts;
  //уберем пробелы и табы
  try{
    name = name.trim();
  }catch(e){}

  //проверяем на корректность
  if (name == undefined || name == ""){
    name = invalidname;
  }else{
    if( /^https?\:/g.test(name) == false ){
      name = "https:" + name;
    }
    parts = url.parse(name, true);
    name = parts.pathname.replace(/@{1,}/g,"").substring(parts.pathname.indexOf("/")+1).replace(/\/(.*)$/g,"");
    name = "@" + name;
  }
  return name;
}
