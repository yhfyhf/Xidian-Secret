from django.conf.urls import include, patterns, url

urlpatterns = patterns('',

    url(r'^', 'grade.views.index'),
    url(r'^api/$', 'grade.views.api'),
)
