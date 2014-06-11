from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('mimi.urls')),
    url(r'^grade/', include('grade.urls')),
    url(r'^abt-grade/$', 'grade.views.about'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': '/static/'}),
)
