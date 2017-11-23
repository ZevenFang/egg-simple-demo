<!-- app/view/news/list.tpl -->
<html>
<head>
    <title>Aliyun OSS</title>
    <script src="//cdn.bootcss.com/axios/0.17.1/axios.min.js"></script>
    <script src="//www.promisejs.org/polyfills/promise-6.1.0.js"></script>
    <script src="//gosspublic.alicdn.com/aliyun-oss-sdk.min.js"></script>
</head>
<body>
<input id="file" type="file"><button id="upload">上传文件</button>
<span id="progress" style="margin-left: 1em;">上传进度</span>
<script>
  var token = null;
  var client = null;
  axios.get('/oss/token').then(function (res) {
    token = res.data;
    client = new OSS.Wrapper({
      region: 'oss-cn-shenzhen',
      accessKeyId: token.AccessKeyId,
      accessKeySecret: token.AccessKeySecret,
      stsToken: token.SecurityToken,
      bucket: 'zeven'
    });
  });
  var progress = function (p) {
    return function (done) {
      var bar = document.getElementById('progress');
      bar.innerHTML = Math.floor(p * 100) + '%';
      done();
    }
  };
  document.getElementById('upload').onclick = function () {
    var file = document.getElementById('file').files[0];
    var key = 'test/' + Date.now() + '_' + file.name;
    console.log(file.name + ' => ' + key);
    document.getElementById('progress').innerHTML = '0%';
    return client.multipartUpload(key, file, {
      progress: progress
    }).then(function (res) {
      console.log('upload success: %j', res);
    });
  };
</script>
</body>
</html>