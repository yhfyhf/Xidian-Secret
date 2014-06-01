from django.conf.urls import include, patterns, url
from feeds import LatestEntriesFeed

urlpatterns = patterns('',
    url(r'^$', 'mimi.views.index'),
    url(r'^login/$', 'mimi.views.alogin'),
    url(r'^register/$', 'mimi.views.register'),
    url(r'^logout/$', 'mimi.views.alogout'),
    url(r'^/api/(?P<post_id>\d+)/$', 'mimi.views.show_post'),
    url(r'^post/$', 'mimi.views.apost'),
    url(r'^post/(?P<post_id>\d+)/$', 'mimi.views.show_post'),
    url(r'^comment/(?P<post_id>\d+)/$', 'mimi.views.comment'),
    url(r'^post_like/(?P<post_id>\d+)/$', 'mimi.views.post_like'),
    url(r'^search/$','mimi.views.search'),
    url(r'^feeds/$', LatestEntriesFeed()),
    url(r'^chat/$', 'mimi.views.show_chat'),
    url(r'^chat/(?P<from_id>\d+)/(?P<to_id>\d+)/$', 'mimi.views.chat'),
    url(r'^policy/$', 'mimi.views.policy'),
    url(r'^contact/$', 'mimi.views.contact'),
    url(r'^about/$', 'mimi.views.about'),
)
