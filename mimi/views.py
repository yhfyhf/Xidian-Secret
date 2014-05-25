from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth.models import User
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf

from mimi.models import Post, Message


class PostForm(forms.Form):
    content = forms.CharField(widget=forms.Textarea)

def index(request):
    ctx = {}
    user_logged = True if request.user.is_authenticated() else False
    post_form = PostForm()
    posts = Post.objects.all().order_by("-post_date")
    ctx.update(csrf(request))
    ctx['post_form'] = post_form
    ctx['user_logged'] = user_logged
    ctx['posts'] = posts
    return render(request, 'index.html', ctx)

def apost(request):
    if request.method == "POST":
        if not request.user.is_authenticated(): # no user is logged
            return redirect('/')
        else:  # logged in
            post_form = PostForm(request.POST)
            if post_form.is_valid():
                submitted_content = request.POST['content']

                Post(post_uid=request.user.username, post_content=submitted_content).save()
                return redirect('/')
            else:
                return HttpResponse("post form is not valid")
    else:   # request method is not POST
        return redirect('/')

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