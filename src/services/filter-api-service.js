import config from '../config'
import TokenService from './token-service'

const FilterApiService = {
  getBeans() {
    return fetch(`${config.API_ENDPOINT}/beans`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getBeanReviews() {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postReview( text, beanId ) {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        text: text,
        coffee_bean_id: beanId
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default FilterApiService
