export enum JsonCommands {

  // Base commands
  Del = 'JSON.DEL',
  Get = 'JSON.GET',
  MGet = 'JSON.MGET',
  Set = 'JSON.SET',
  Type = 'JSON.TYPE',

  // Operations
  StrAppend = 'JSON.STRAPPEND',
  StrLen = 'JSON.STRLEN',
  NumIncrBy = 'JSON.NUMINCRBY',
  NumMultBy = 'JSON.NUMMULTBY',

  // array operations
  ArrAppend = 'JSON.ARRAPPEND',
  ArrIndex = 'JSON.ARRINDEX',
  ArrInsert = 'JSON.ARRINSERT',
  ArrLen = 'JSON.ARRLEN',
  ArrPop = 'JSON.ARRPOP',
  ArrTrim = 'JSON.ARRTRIM',

  // misc
  ObjKeys = 'JSON.OBJKEYS',
  ObjLen = 'JSON.OBJLEN',
  Debug = 'JSON.DEBUG',
  Resp = 'JSON.RESP'
}
