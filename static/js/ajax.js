var xmlhttp;
if (window.XMLHttpRequest)
    xmlhttp = new XMLHttpRequest();
else
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

function post_like(post_id) {
    var like_num_node = document.getElementById("post_like_num"+post_id);
    var like_num = like_num_node.innerText;
    like_num = parseInt(like_num);
    like_num++;
    like_num_node.innerText = like_num;
    var post_like_node = document.getElementById("post_like"+post_id);
    post_like_node.innerHTML = "<span class='glyphicon glyphicon-heart'></span>";
    var post_like_node = document.getElementById("post_like"+post_id+"in");
    post_like_node.innerHTML = "<span class='glyphicon glyphicon-heart'></span>";
    var url = "/post_like/" + post_id;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function comment(floor_num) {
    var textarea = document.getElementById("comment_textarea");
    textarea.value = "@" + floor_num + "楼 ";
}

