const sendURL = 'https://market.csyjia.com/user/customer'

const request = (url, data = {}, method = 'POST') => new Promise((resolve, reject) => {
  url = sendURL + url
  wx.request({
    url,
    data,
    method,
    success: res => resolve(res.data),
    fail: res => reject(res)
  })
})

export default request
