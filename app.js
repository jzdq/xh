// 获取video和canvas元素
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');

// 请求用户授权访问摄像头，并将视频流设置到video标签上
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.log(`访问摄像头出错：${err}`);
  });

// 将视频帧绘制到canvas上
setTimeout(() => {
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}, 1000);

// 将绘制后的画布转换成PNG格式的图片数据，保存到本地相册
setTimeout(() => {
  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'screenshot.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}, 2000);
