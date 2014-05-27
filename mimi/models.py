# -*- coding: utf-8 -*-
from django.db import models

import sys
reload(sys)
sys.setdefaultencoding('utf-8')


class Post(models.Model):
    post_uid = models.CharField(max_length=12)
    post_content = models.TextField()
    post_date = models.DateTimeField(auto_now_add=True)
    post_like_num = models.IntegerField()

    def __unicode__(self):
        return self.post_content

class Comment(models.Model):
    post = models.ForeignKey(Post)
    comment_uid = models.CharField(max_length=12)
    comment_content = models.TextField()
    comment_date = models.DateTimeField(auto_now_add=True)
    comment_like_num = models.IntegerField()

