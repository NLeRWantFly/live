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

export function getRoomStatus(roomName) {
  return request({
    url: `/getRoomStatus/${roomName}`,
    method: "get"
  })
}

export function imageUpload(file) {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post('/imageupload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function videoUpload(fileName,fileTags) {
  return request({
    url: `/videoupload/${fileName}/${fileTags}`,
    method: "post"
  })
}

export function videoFindByTag(videoTag) {
  return request({
    url: `/videofindByTag/${videoTag}`,
    method: "get"
  })
}


export function findCommentByVid(vid) {
  return request({
    url: `/findCommentByVid/${vid}`,
    method: 'get'
  });
}

export function videoAddComment(vid, uid, comment) {
  const commentData = {
    vid: vid,
    uid: uid,
    comment: comment
  };

  return request({
    url: '/videoAddComment',
    method: 'post',
    data: commentData
  });
}
