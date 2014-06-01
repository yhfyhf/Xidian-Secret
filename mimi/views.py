#! -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf
from django.core import serializers
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from mimi.models import Post, Comment, Notice, Chat

from get_grade import get_grade


#class PostForm(forms.Form):
#    content = forms.CharField(widget=forms.Textarea)
#
#class CommentForm(forms.Form):
#    comment =  forms.CharField(widget=forms.Textarea)

def verify(request):
    """ verify the request method is "POST" and a user is logged """
    if request.method == "POST":
        if not request.user.is_authenticated():  # no user is logged
            return 0
        else:
            return 1
    else:  # request method is not POST
        return 0


def index(request):
    ctx = {}
    posts = Post.objects.all().order_by("-post_date")
    for post in posts:
        comments = post.comment_set.all()
        post.comments = comments
        post.comments_num = len(comments)
    # notice
    if request.user.is_authenticated():
        notices = Notice.objects.filter(user_id=request.user.id, is_read=False)
        for notice in notices:
            notice.post_content = Post.objects.get(id=notice.post_id).post_content[:10]
    else:
        notices = None
    notice_num = len(notices) if notices else 0
    # paginator
    paginator = Paginator(posts, 20) # show 30 posts per page
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    # chat
    chats = Chat.objects.filter(to_id=request.user.id, is_read=False)
    chat_num = len(chats) if chats else 0
    for post in posts:
        post.post_uid = get_grade(post.post_uid)
        for comment in post.comment_set.all():
            comment.comment_uid = get_grade(comment.comment_uid)
    ctx.update(csrf(request))
    ctx['user'] = request.user
    ctx['posts'] = posts
    ctx['notices'] = notices
    ctx['notice_num'] = notice_num
    ctx['chat_num'] = chat_num
    return render(request, 'index.html', ctx)


def show_post(request, post_id):
    if request.method == "GET":
        post = Post.objects.get(id=post_id)
        if request.user.is_authenticated():
            try:
                # find the notice belongs to the logging user and set it read
                notice = Notice.objects.get(post_id=post_id, user_id=request.user.id, is_read=False)
                notice.is_read = True
                notice.save()
            except:
                pass
        comments = post.comment_set.all()
        for comment in comments:
            comment.comment_uid = get_grade(comment.comment_uid)
        ctx = {}
        ctx.update(csrf(request))
        ctx['post'] = post
        ctx['comments'] = comments
        ctx['comments_num'] = len(comments)
        return render(request, 'post.html', ctx)
    else:
        raise Http404()

def show_post_json(request, post_id):
    if request.method == "GET":
        response = HttpResponse()
        response['Content-Type'] = "text/javascript"
        post = serializers.serialize("json", Post.objects.filter(id=post_id),
                                     fields=('post_date','post_content', 'post_like_num'))
        response.write(post)
        return response
    else:
        return redirect('/')

def apost(request):   #  just POST
    if not verify(request):
        return redirect('/')
    if request.user.is_authenticated():
        submitted_content = request.POST['content']
        if not submitted_content:
            return redirect('/')
        post = Post(post_uid=request.user.username, post_content=submitted_content, post_like_num=0)
        post.save()
        Notice(post_id=post.id, user_id=request.user.id).save()
        return redirect('/')
    else:
        return redirect('/')

def comment(request, post_id): # just POST
    if not verify(request):
        return redirect('/')
    submitted_content = request.POST['comment']
    if not submitted_content:
        return redirect('/')
    Comment(post_id=post_id, comment_uid=request.user.username,
            comment_content=submitted_content, comment_like_num=0,
            comment_grade=get_grade(request.user.username)).save()
    # set all users who have followed this comment to unread
    Notice.objects.filter(post_id=post_id).exclude(user_id=request.user.id).update(is_read=False)
    # let user follow the post if hasn't followed
    try:
        Notice.objects.get(post_id=post_id, user_id=request.user.id)
    except:
        Notice(post_id=post_id, user_id=request.user.id).save()
    return redirect('/post/'+post_id+'/')

def post_like(request, post_id):
    posts = Post.objects.filter(id=int(post_id))
    for post in posts:
        post.post_like_num += 1
        post.save()
    return HttpResponse("OK")

def alogin(request):
    error = uid = password = None
    ctx = {}
    if request.user.is_authenticated():
        logout(request)
    if request.method == "GET":
        return render(request, 'login.html')
    if request.method == 'POST' :
        if not request.POST['uid']:
            error = '请输入学号!'
        else:
            uid = request.POST['uid']
        if not request.POST['password']:
            error = '请输入密码!'
        else:
            password= request.POST['password']
        user = authenticate(username=uid, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
            else:
                error = "您的用户已被锁定!"
        else:
            error = "您输入的账号或密码有误!"
            ctx.update(csrf(request))
            ctx['error'] = error
            return render(request, 'login.html', ctx)
        if user.is_authenticated():  # login succesfully, redirect to '/'
            return redirect('/')
        else:            # error in login
            return render(request, 'login.html', ctx)
    else:    # request method is not POST
        raise Http404()

def register(request):
    errors= []
    uid = password = password2 = None
    compareFlag = False
    ctx = {}

    if request.user.is_authenticated():
        logout(request)

    if request.method == 'POST':
        ctx = {}
        ctx.update(csrf(request))
        error = None
        if not request.POST.get('password2'):
            error = '请再次输入密码!'
        else:
            password2 = request.POST.get('password2')
        if not request.POST.get('password'):
            error = '请输入密码!'
        else:
            password= request.POST.get('password')
        if not password == password2:
            error = '您输入的两次密码不一致!'
        if password:
            if len(password) >= 20 or len(password) < 6:
                error = "密码长度必须在6位和20位之间!"
        if not request.POST.get('uid'):
            error = '请输入学号!'
        uid = request.POST.get('uid')
        if get_grade(uid) == "error":
            error = "请输入正确的学号!"
        users = User.objects.all()
        for user in users:
            if uid == user.username:
                error = "您输入的学号已存在!"
                break
        if error:
            ctx['error'] = error
            return render(request, 'register.html', ctx)
        user = User.objects.create_user(uid, None, password)
        user.is_active = True
        user.save()  # register successfully
        return redirect('/')

    ctx.update(csrf(request))
    ctx['errors'] = errors
    return render(request, 'register.html', ctx)

def alogout(request):
    if request.user.is_authenticated():
        logout(request)
    return redirect('/')  # logout successfully

def search(request):
    if 'q' in request.GET:
        term = request.GET['q']
        terms = term.split()
        posts = Post.objects.all()
        results = []
        for term in terms:
            for post in posts:
                if term in get_grade(post.post_uid):
                    post.post_uid = get_grade(post.post_uid)
                    results.append(post)
        ctx = {}
        ctx.update(csrf(request))
        ctx['posts'] = results
        ctx['user'] = request.user
        return render(request, 'search.html', ctx)

def chat(request, from_id, to_id):
    if not request.user.is_authenticated():
        return redirect('/login/')
    user_id = request.user.id
    if request.method == "POST":
        if not user_id == int(from_id): # not logged user post a chat
            raise Http404()
        chat_content = request.POST['chat']
        Chat(from_id=from_id, to_id=to_id, chat_content=chat_content).save()
        return redirect('/chat/')
    else:
        raise Http404()

def show_chat(request):
    if not request.user.is_authenticated():
        return redirect('/login/')
    if request.method == "GET":
        ctx = {}
        chats = Chat.objects.filter(Q(from_id=request.user.id) | Q(to_id=request.user.id)).order_by("-id")
        Chat.objects.filter(to_id=request.user.id).update(is_read=True)
        ctx.update(csrf(request))
        ctx['chats'] = chats
        ctx['user'] = request.user
        return render(request, "chat.html", ctx)
    else:
        raise Http404()






