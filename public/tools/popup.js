import { getService } from 'vc-cake'

const getPopupId = (attrValue) => {
  if (attrValue && attrValue.url && attrValue.type === 'popup') {
    const popupId = attrValue.url.split('#vcv-popup-')
    if (popupId && popupId[1]) {
      return popupId[1]
    }
    return null
  }
  return null
}

export function getPopupDataFromElement (cookElement) {
  const ids = []
  const urlAttrKeys = cookElement.filter((key, value, settings) => {
    return settings.type === 'url'
  })

  urlAttrKeys.forEach((urlKey) => {
    const urlValue = cookElement.get(urlKey)
    const popupId = getPopupId(urlValue)
    if (popupId) {
      ids.push(popupId)
    }
  })

  const attachImageAttrKeys = cookElement.filter((key, value, settings) => {
    return settings.type === 'attachimage'
  })

  attachImageAttrKeys.forEach((attachImageKey) => {
    const imageValue = cookElement.get(attachImageKey)
    if (Array.isArray(imageValue)) {
      imageValue.forEach((imgValue) => {
        const popupId = getPopupId(imgValue.link)
        if (popupId) {
          ids.push(popupId)
        }
      })
    } else if (typeof imageValue === 'object') {
      const popupId = getPopupId(imageValue.link)
      if (popupId) {
        ids.push(popupId)
      }
    }
  })

  const innerElementKeys = cookElement.filter((key, value, settings) => {
    return settings.type === 'element'
  })

  innerElementKeys.forEach((elementKey) => {
    const elementValue = cookElement.get(elementKey)
    const cook = getService('cook')
    const innerCookElement = cook.get(elementValue)
    const innerElementIds = getPopupDataFromElement(innerCookElement)
    if (innerElementIds.length) {
      innerElementIds.forEach((innerId) => {
        ids.push(innerId)
      })
    }
  })

  return ids
}
