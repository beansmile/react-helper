const fs = require('fs-extra')
const glob = require('glob')
const babel = require('babel-core')

if (process.env.NODE_ENV !== 'development') {
  glob('dist/**/*.{js,jsx}', {}, (err, files) => {
    files.forEach(file => {
      const result = babel.transformFileSync(file)
      fs.outputFileSync(file, result.code)
    })
  })
}

glob('src/**/*.less', {}, (err, files) => {
  files.forEach(file => {
    const result = fs.readFileSync(file, 'utf-8')
    fs.outputFileSync(file.replace('src', 'dist'), result)
  })
  fs.copyFileSync('package.json', 'dist/package.json')
  fs.copyFileSync('README.md', 'dist/README.md')
})
