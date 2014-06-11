#! -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.core.context_processors import csrf

import json

from scratch import get_grades

import sys
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)

def index(request):
    ctx = {}
    ctx.update(csrf(request))
    if request.method == "GET":
        return render(request, "grade.html")
    elif request.method == "POST":
        uid = request.POST["uid"]
        if not uid.isdigit():
            return HttpResponse("您输入的学号有误")
        else:
            if (uid[2:4] == "11" or uid[2:4] == "12") and len(uid) == 8:
                pass
            else:
                return HttpResponse("暂不支持您的年级")
        password = request.POST["password"]
        data = get_grades(uid, password)
        if not data:
            return HttpResponse("账号或密码错误")
        name = data[0]
        del data[0]
        data = json.dumps(data, ensure_ascii=False)
        ctx['name'] = name
        ctx['data'] = data
        return render(request, "grade.html", ctx)
    else:
        return redirect('/grade/')

def api(request):
    if request.method == "POST":
        uid = request.POST["uid"]
        password = request.POST["password"]
        response = HttpResponse()
        response['Content-Type'] = "text/javascript;charset=utf-8"
        response.write(json.dumps(get_grades(uid, password), ensure_ascii=False))
        return response
    else:
        return redirect('/')

def about(request):
    return render(request, "abt-grade.html")

