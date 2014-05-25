from django.contrib import admin
from mimi.models import Post, Message

# Register your models here.
class MessageInline(admin.TabularInline):
    model = Message

class PostAdmin(admin.ModelAdmin):
    inlines = [MessageInline]

admin.site.register(Post, PostAdmin)