# -*- coding:utf-8 -*-
from django.core.urlresolvers import reverse
from django.contrib.syndication.views import Feed
from django.utils.feedgenerator import Rss201rev2Feed

from mimi.models import Post
from datetime import datetime, time

from get_grade import get_grade

class ExtendedRSSFeed(Rss201rev2Feed):
    mime_type = 'application/xml'
    """
    Create a type of RSS feed that has content:encoded elements.
    """
    def root_attributes(self):
        attrs = super(ExtendedRSSFeed, self).root_attributes()
        attrs['xmlns:content'] = 'http://purl.org/rss/1.0/modules/content/'
        return attrs

    def add_item_elements(self, handler, item):
        super(ExtendedRSSFeed, self).add_item_elements(handler, item)
        handler.addQuickElement(u'content:encoded', item['content_encoded'])


class LatestEntriesFeed(Feed):
    feed_type = ExtendedRSSFeed

    # Elements for the top-level, channel.
    title = u"西电秘密 XDMM"
    link = "http://xdmm.sinaapp.com"
    author = 'Ying Haofei'
    description = ""

    def items(self):
        return Post.objects.all().order_by('-post_date')

    def item_extra_kwargs(self, item):
        return {'content_encoded': self.item_content_encoded(item)}

    # Elements for each item.
    def item_title(self, item):
        return get_grade(item.post_uid)

    #def item_description(self, item):
    #    return item.post_content

    def item_pubdate(self, item):
        return datetime.combine(item.post_date, time())

    def item_content_encoded(self, item):
        return item.post_content

    def item_link(self, item):
        return '/post/%d' % item.id