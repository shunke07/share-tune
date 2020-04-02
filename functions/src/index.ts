const funcs = {
  spotifyGetAlbum: './spotify/get-album',
  spotifyGetNewReleases: './spotify/get-new-releases'
}

const loadFunctions = (funcsObj: { [s: string]: string }) => {
  for (const name in funcsObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
      exports[name] = require(funcsObj[name])
    }
  }
}

loadFunctions(funcs)
