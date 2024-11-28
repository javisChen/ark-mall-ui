/**
 * components util
 */

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 * 元转分
 */
export const yuanToFen = (value) => {
  if (!value) {
    return 0
  }
  return (value - 0) * 100
}


/**
 * 元转分
 */
export const fenToYuan = (value) => {
  if (!value) {
    return 0
  }
  return (value - 0) / 100
}


/**
 * 构建商品描述
 * @param item
 * @returns {string}
 */
export const buildProductDesc = (item) => {
  if (typeof item.specs === 'string') {
    item.specs = JSON.parse(item.specs)
  }
  // console.log('spec', item.specs)
  let name = ''
  for (let i = 0; i < item.specs.length; i++) {
    const spec = item.specs[i];
    name += spec.attrValue
    if (i < item.specs.length - 1) {
      name += ' '
    }
  }
  return name
}
/**
 * 构建商品描述
 * @param item
 * @returns {string}
 */
export const buildSpecDesc = (item) => {
  if (typeof item.specs === 'string') {
    item.specs = JSON.parse(item.specs)
  }

  let name = ''
  for (let i = 0; i < item.specs.length; i++) {
    const spec = item.specs[i];
    name += spec.attrName + ':' + spec.attrValue
    if (i < item.specs.length - 1) {
      name += ' '
    }
  }
  return name
}