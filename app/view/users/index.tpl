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
    <button id="parse_token" type="button">Parse Token</button>
    <br>token: <span id="token"></span>
    <br>parse: <span id="parse"></span>
</form>
<script>
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var token = '';
    document.getElementById('get_token').onclick = function () {
      axios.post('/users/token', {username: username.value, password: password.value})
        .then(function (res) {
          if (res.data.error) alert(res.data.error);
          else {
            token = res.data.token;
            document.getElementById('token').innerHTML = token;
          }
        })
    };
    document.getElementById('parse_token').onclick = function () {
      axios.get('/api/users/token', {headers: {Authorization: 'Bearer '+token}})
        .then(function (res) {
          if (res.data.error) alert(res.data.error);
          else {
            var user = res.data;
            document.getElementById('parse').innerHTML = JSON.stringify(user);
          }
        })
    }
</script>
</body>
</html>