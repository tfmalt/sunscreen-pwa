
const storage = window.localStorage

class LocalCache {
  get rememberCredentials() { 
    return JSON.parse(storage.getItem('rememberCredentials')) || false 
  }

  set rememberCredentials(value) { 
    storage.setItem('rememberCredentials', JSON.stringify(value))
  }

  get credentials() { 
    const credentials = storage.getItem('credentials');
    if (typeof credentials === 'undefined') {
      return {}
    }

    return JSON.parse(storage.getItem('credentials')) || {}
  }

  set credentials(auth) {
    storage.setItem('credentials', JSON.stringify(auth))
  }

  get sunscreenEntities() {
    return JSON.parse(storage.getItem('sunscreenEntities'))
  }

  set sunscreenEntities(value) {
    storage.setItem('sunscreenEntitites', JSON.stringify(value))
  }
  
  get hasAuthorizedOk() { return JSON.parse(storage.getItem('authorizedOk')) || false }
  set hasAuthorizedOk(value) { storage.setItem('authorizedOk', JSON.stringify(value)) }

  delete = (key) => storage.removeItem(key)
}

export default LocalCache