const fs = require('fs-extra')
const ghpages = require('gh-pages')
const { version } = require('./package.json')

ghpages.publish('dist', {
  branch: 'release', tag: `v${version}`
}, err => {
  if (err) console.error(err)
  else {
    fs.removeSync('dist')
    console.log('success')
  }
})
