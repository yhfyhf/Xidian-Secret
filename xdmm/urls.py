from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('mimi.urls')),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': '/static/'}),
)
