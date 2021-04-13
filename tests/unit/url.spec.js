import {isValidWebsocketUrl} from '@/util/url-tools'

describe('isValidWebsocketUrl', () => {
  it('should return string "invalid url." if websocket url is invalid', () => {
    const invalidUrls = [
      'http://website.com',
    ];


    invalidUrls.forEach(url => {
      const result = isValidWebsocketUrl(url)
      expect(result).toEqual('invalid url.')
    })
  })

  it('should return true if websocket url is valid', () => {
    const validUrls = [
      'wss://localhost:8080',
      'ws://127.0.0.1:3000',
      'wss://0.0.0.0:3000',
    ]

    validUrls.forEach(url => {
      const result = isValidWebsocketUrl(url)
      expect(result).toBeTruthy()
    })
  })
})
