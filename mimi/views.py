from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf

from mimi.models import Post, Comment


class PostForm(forms.Form):
    content = forms.CharField(widget=forms.Textarea)

class CommentForm(forms.Form):
    comment =  forms.CharField(widget=forms.Textarea)

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
    user_logged = True if request.user.is_authenticated() else False
    post_form = PostForm()
    comment_form = CommentForm()
    posts = Post.objects.all().order_by("-post_date")
    for post in posts:
        post.comments = post.comment_set.all()
    ctx.update(csrf(request))
    ctx['post_form'] = post_form
    ctx['comment_form'] = comment_form
    ctx['user_logged'] = user_logged
    ctx['posts'] = posts
    return render(request, 'index.html', ctx)

def apost(request):
    if not verify(request):
        return redirect('/')
    post_form = PostForm(request.POST)
    if post_form.is_valid():
        submitted_content = request.POST['content']
        Post(post_uid=request.user.username, post_content=submitted_content, post_like_num=0).save()
        return redirect('/')
    else:
        return HttpResponse("post form is not valid")

def comment(request, post_id):
    if not verify(request):
        return redirect('/')
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        submitted_content = request.POST['comment']
        Comment(post_id=post_id, comment_uid=request.user.username,
                comment_content=submitted_content, comment_like_num=0).save()
        return redirect('/')
    else:
        return HttpResponse("comment form is not valid")

def post_like(request, post_id):
    posts = Post.objects.filter(id=int(post_id))
    for post in posts:
        post.post_like_num += 1
        post.save()
    return HttpResponse("OK")

def alogin(request):
    error = uid = password = None
    ctx = {}

    if request.method == 'POST' :
        if not request.POST.get('uid'):
            error = 'Please Enter uid'
        else:
            uid = request.POST.get('uid')
        if not request.POST.get('password'):
            error = 'Please Enter password'
        else:
            password= request.POST.get('password')
        user = authenticate(username=uid, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
            else:
                error = "user not active"
        else:
            error = "error in uid or password"
        ctx['error'] = error
        ctx['user'] = request.user.is_authenticated()
        ctx.update(csrf(request))
        if ctx['user']:  # login succesfully, redirect to '/'
            return redirect('/')
        else:            # error in login
            return render(request, 'index.html', ctx)
    else:    # request method is not POST
        raise Http404()

def register(request):
    errors= []
    uid = password = password2 = None
    compareFlag = False
    ctx = {}

    if request.method == 'POST':
        if not request.POST.get('uid'):
            errors.append('Please Enter uid')
        else:
            uid = request.POST.get('uid')
        if not request.POST.get('password'):
            errors.append('Please Enter password')
        else:
            password= request.POST.get('password')
        if not request.POST.get('password2'):
            errors.append('Please Enter password2')
        else:
            password2 = request.POST.get('password2')

        if password is not None and password2 is not None:
            if password == password2:
                compareFlag = True
            else:
                errors.append('different password!')

        if uid is not None and password is not None and password2 is not None and compareFlag:
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