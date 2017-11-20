<html>
<head>
    <title>Restful Api</title>
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
    <h3>Show</h3>
    id:&nbsp;&nbsp;&nbsp; <input type="text" name="_id" id="update_id">
    <button id="show" type="button">show</button>
</form>
<form>
    <h3>Update</h3>
    title: <input type="text" name="title" id="update_title">
    desc: <input type="text" name="desc" id="update_desc">
    thumb: <input type="number" name="thumb" id="update_thumb">
    <button id="update" type="button">submit</button>
</form>
<script>
  function request(method, url, cb, formdata) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200){
          console.warn(httpRequest.responseText);
          cb(JSON.parse(httpRequest.responseText));
        }
        else alert(httpRequest.responseText);
      }
    };
    httpRequest.open(method, url);
    httpRequest.send(formdata);
  }
  document.getElementById('show').onclick = function () {
    var id = document.getElementById('update_id').value;
    request('GET', '/posts/'+id, function (data) {
      if (data) {
        document.getElementById('update_title').value = data.title;
        document.getElementById('update_desc').value = data.desc;
        document.getElementById('update_thumb').value = data.thumb;
      }
    });
  };
  document.getElementById('update').onclick = function () {
  };
</script>
</body>
</html>