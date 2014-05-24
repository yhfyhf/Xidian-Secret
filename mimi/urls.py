from django.conf.urls import include, patterns, url

urlpatterns = patterns('',
    url(r'^$', 'mimi.views.index'),
    url(r'^login/$', 'mimi.views.alogin'),
    url(r'^register/$', 'mimi.views.register'),
    url(r'^logout/$', 'mimi.views.alogout'),
    url(r'^post/$', 'mimi.views.apost'),
)
