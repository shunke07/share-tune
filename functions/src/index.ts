const funcs = {}

const loadFunctions = (funcsObj: { [s: string]: string }) => {
  for (const name in funcsObj) {
    if (!process.env.K_SERVICE || process.env.K_SERVICE === name) {
      exports[name] = require(funcsObj[name])
    }
  }
}

loadFunctions(funcs)
