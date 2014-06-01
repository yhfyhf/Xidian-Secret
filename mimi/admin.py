from django.contrib import admin
from mimi.models import Post, Comment, Chat

# Register your models here.
class CommentInline(admin.TabularInline):
    model = Comment

class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline]

# class ChatAdmin(admin.ModelAdmin):
	# model = Chat

admin.site.register(Post, PostAdmin)
admin.site.register(Chat)
