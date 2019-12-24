const pipe = require ('ramda/src/pipe')
const withCss = require ('@zeit/next-css')
const withOffline = require ('next-offline')
const withTranspileModules = require ('next-transpile-modules')

module.exports = (distDir = '../../dist/app') => pipe (
  withOffline,
  withCss,
  withTranspileModules,
) ({
  distDir,
  transpileModules: ['toolbelt'],
})
