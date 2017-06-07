import { addStorage, getService } from 'vc-cake'

addStorage('shortcodeAssets', (storage) => {
  const utils = getService('utils')
  const assetsWindow = window.document.querySelector('.vcv-layout-iframe').contentWindow

  let loadedCssFiles = []
  let loadedJsFiles = []

  let collectLoadFiles = () => {
    let data = {
      cssBundles: assetsWindow.jQuery('style, link[href]'),
      jsBundles: assetsWindow.jQuery('script')
    }
    loadFiles(data, false)
  }
  let loadFiles = (data, addToDocument) => {
    if (data.cssBundles && data.cssBundles.length) {
      // it is jquery
      data.cssBundles.each((i, cssNode) => {
        let $el = assetsWindow.jQuery(cssNode)
        let slug = ''
        if ($el.is('style')) {
          // inline
          slug = utils.slugify(cssNode.innerHTML)
        } else if ($el.is('link[href]')) {
          // load href
          slug = utils.slugify($el.attr('href'))
        } else {
          console.log('wtf', $el, i, cssNode)
        }

        // let slug = utils.slugify(file)
        if (loadedCssFiles.indexOf(slug) === -1) {
          console.log('adding file', slug, addToDocument)
          loadedCssFiles.push(slug)
          if (addToDocument) {
            assetsWindow.document.head.appendChild(cssNode)
          }
        } else {
          console.log('skip adding file', slug)
        }
      })
    }
    if (data.jsBundles && data.jsBundles.length) {
      // use each, it is jquery
      data.jsBundles.each(
        (i, jsNode) => {
          let $el = assetsWindow.jQuery(jsNode)
          let slug = ''
          if ($el.is('script[src]')) {
            // inline
            slug = utils.slugify($el.attr('src'))
          } else {
            // load href
            slug = utils.slugify(jsNode.innerHTML)
          }
          if (loadedJsFiles.indexOf(slug) === -1) {
            console.log('adding js file', slug, addToDocument)
            loadedJsFiles.push(slug)
            if (addToDocument) {
              $el.insertAfter(assetsWindow.document.head)
            }
          } else {
            console.log('skip adding js file', slug)
          }
        }
      )
    }
  }

  // Collecting
  collectLoadFiles()

  // Event listen
  storage.on('add', (data) => {
    console.log('storage.add')
    loadFiles(data, true)
    window.setTimeout(() => {
      assetsWindow.jQuery(assetsWindow).trigger('vc_reload')
      assetsWindow.jQuery(assetsWindow).trigger('resize')
    }, 100)
  })
})
