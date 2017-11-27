<!-- app/view/news/list.tpl -->
<html>
<head>
    <title>Token</title>
    <script src="//cdn.bootcss.com/axios/0.17.1/axios.min.js"></script>
</head>
<body>
<form>
    username: <input type="text" name="username" id="username">
    password: <input type="text" name="password" id="password">
    <button id="get_token" type="button">Get Token</button>
    <button id="refresh_token" type="button">Refresh Token</button>
    <button id="parse_token" type="button">Parse Token</button>
    <br>token: <span id="token"></span>
    <br>refresh: <span id="refresh"></span>
    <br>parse: <span id="parse"></span>
</form>
<script>
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var credentials = '';
    document.getElementById('get_token').onclick = function () {
      axios.post('/users/token', {username: username.value, password: password.value})
        .then(function (res) {
          if (res.data.error) alert(res.data.error);
          else {
            credentials = res.data;
            document.getElementById('token').innerHTML = JSON.stringify(credentials);
          }
        })
    };
    document.getElementById('refresh_token').onclick = function () {
      var refresh = document.getElementById('refresh');
      axios.get('/api/users/token/refresh', {headers: {Authorization: 'Bearer '+credentials.refresh_token}})
        .then(function (res) {
          credentials = res.data;
          refresh.innerHTML = JSON.stringify(res.data);
        }).catch(function (err) {
          refresh.innerHTML = JSON.stringify(err.response.data);
        })
    };
    document.getElementById('parse_token').onclick = function () {
      var parse = document.getElementById('parse');
      axios.get('/api/users/token', {headers: {Authorization: 'Bearer '+credentials.token}})
        .then(function (res) {
          parse.innerHTML = JSON.stringify(res.data);
        }).catch(function (err) {
          parse.innerHTML = JSON.stringify(err.response.data);
        })
    }
</script>
</body>
</html>