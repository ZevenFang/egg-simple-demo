<html>
<head>
    <title>Restful Api</title>
    <script src="//cdn.bootcss.com/axios/0.17.1/axios.min.js"></script>
</head>
<body>
<form action="/posts" method="post">
    <h3>Create</h3>
    title: <input type="text" name="title">
    desc: <input type="text" name="desc">
    thumb: <input type="number" name="thumb">
    <button type="submit">submit</button>
</form>
<form>
    <h3>Delete</h3>
    id:&nbsp;&nbsp;&nbsp; <input type="text" name="_id" id="delete_id">
    <button id="delete" type="button">delete</button>
</form>
<form>
    <h3>Show</h3>
    id:&nbsp;&nbsp;&nbsp; <input type="text" name="_id" id="update_id">
    <button id="show" type="button">show</button>
</form>
<form id="update_form">
    <h3>Update</h3>
    title: <input type="text" name="title" id="update_title">
    desc: <input type="text" name="desc" id="update_desc">
    thumb: <input type="number" name="thumb" id="update_thumb">
    <button id="update" type="button">submit</button>
</form>
<script>
  document.getElementById('delete').onclick = function () {
    var id = document.getElementById('delete_id').value;
    axios.delete('/posts/'+id).then(function (res) {
      if (res.data) alert(JSON.stringify(res.data));
    });
  };
  document.getElementById('show').onclick = function () {
    var id = document.getElementById('update_id').value;
    axios.get('/posts/'+id).then(function (res) {
      var data = res.data;
      if (res.data) {
        document.getElementById('update_title').value = data.title;
        document.getElementById('update_desc').value = data.desc;
        document.getElementById('update_thumb').value = data.thumb;
      }
    });
  };
  document.getElementById('update').onclick = function () {
    var id = document.getElementById('update_id').value;
    axios.put('/posts/'+id, {
      title: document.getElementById('update_title').value,
      desc: document.getElementById('update_desc').value,
      thumb: document.getElementById('update_thumb').value,
    }).then(function (res) {
      if (res.data) alert(JSON.stringify(res.data));
    });
  };
</script>
</body>
</html>