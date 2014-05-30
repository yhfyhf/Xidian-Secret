$(function(){
    $('.masonry').imagesLoaded(function() {
        $('.masonry').masonry({
            itemSelector: '.item',
        });
    });
 
    $('.masonry').infinitescroll({
        navSelector  : '#page-nav', 
        nextSelector : '#page-nav a',
        itemSelector : '.item',
        debug : true,
        loadingImg: '/static/img/loading.gif',
        loadingText: '<em>加载更多...</em>,'

    }, 
    function(newElements) {
        var $newElems = $(newElements).css({'opacity':0});
        $newElems.imagesLoaded(function() {
            $newElems.animate({'opacity':1});
            $('.masonry').masonry('appended', $newElems, true);         
        });
    });
});

$(document).on('mouseover', '.item', function() {
    $(this).find('.brick-actions').show();
});

$(document).on('mouseleave', '.item', function() {
    $(this).find('.brick-actions').hide();
    $(this).find('.dropdown-menu.shareDropDown').hide();
});

function like(id) {
    console.log(id);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dateType: "json",
        data: JSON.stringify({"id": id}),
        url: "/image/like",
        success : function(data) {
            if (data.status == 'success') {
                $('#like_' + id).text(data.favor_count);
            } 
        },
    });
};

function share(obj) {
    $(obj).parents('.brick-actions').find('.dropdown-menu.shareDropDown').show();
};


justDoShare.setApi({
    douban : {
        apiurl : "http://www.douban.com/recommend/",
        url : "http://www.shainimei.com",
        title : "快到晒你妹爆照呀...",
    },
    qzone : { 
        apiurl : "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
        url : "http://www.shainimei.com",
        title : "快到晒你妹爆照呀...",
    },
    weibo : {
        apiurl : "http://v.t.sina.com.cn/share/share.php",
        url : "http://www.shainimei.com",
        title : "快到晒你妹爆照呀...",
    },
});
