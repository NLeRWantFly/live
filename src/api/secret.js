import request from '../utils/request'

export function getRoomUUID(roomName) {
  return request({
    url: `/getRoomUUID/${roomName}`,
    method: 'get',
  })
}


export function getRoomToken(roomName) {
  return request({
    url: `/getRoomToken/${roomName}`,
    method: 'get',
  })
}
