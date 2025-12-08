
export const getImageUrl = (path) => {
  if (!path) return ''
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  if (path.startsWith('/public/')) {
    return path.replace('/public/', '/')
  }
  
  return path.startsWith('/') ? path : `/${path}`
}


export const getUserAvatar = (avatar) => {
  if (avatar) {
    return getImageUrl(avatar)
  }
  
  return '/img/users/default-avatar.svg'
}


export const getIngredientImage = (image) => {
  if (!image) return ''
  return getImageUrl(image)
}


export const getPizzaImage = (image) => {
  if (!image) return '/img/product.svg'
  return getImageUrl(image)
}


