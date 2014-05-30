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

/*function show_post(post_id) {
    var post_content, post_date, post_like_num;
    $.getJSON('/'+post_id+'/', 
        function(data) {
            var node = document.getElementById("post" + post_id);
            jQuery.each(data, function() {
                post_content = this.fields.post_content;
                post_date = this.fields.post_date;
                post_like_num = this.fields.post_like_num;
            });
        }
    );

}*/