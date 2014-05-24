# -*- coding: utf-8 -*-
from django.db import models
from datetime import datetime

import sys
reload(sys)
sys.setdefaultencoding('utf-8')


class Post(models.Model):
    post_uid = models.CharField(max_length=12)
    post_content = models.TextField()
    post_date = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.content

class Message(models.Model):
    post = models.ForeignKey(Post)
    message_uid = models.CharField(max_length=12)
    message_content = models.TextField()
    message_date = models.DateTimeField(auto_now=True)

