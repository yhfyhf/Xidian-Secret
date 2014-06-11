# -*- coding: utf-8 -*-
import requests
import hashlib
import re
import sys
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)

BASE_URL = "http://202.117.120.37/xdjwWebNew"

LOGIN_URL = BASE_URL + "/systemAdmin/Login.jsp?command=studentLogin"  # 登录页面
POST_URL = BASE_URL + "/Servlet/UsersControl"  # 请求网址
GRADES_URL = BASE_URL + "/studentStatus/queryScore/query_person_score.jsp" # 成绩网址


headers = {
        "Referer": "http://202.117.120.37/xdjwWebNew/index.jsp",
        "Origin": "http://202.117.120.37",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36",
        "Host": "202.117.120.37"
    }

def encodePassword(password, share_value):   # 密码加密
    m = hashlib.md5()
    m.update(password)
    first = m.hexdigest()
    m = hashlib.md5()
    m.update(first + share_value)
    return m.hexdigest()

def login(uid, password):   #登录
    s = requests.session()
    login_page = s.get(LOGIN_URL, headers=headers)
    match = re.search('var sharedValue = (-?\d+)', login_page.text)  #找到随机生成的sharedValue
    shared_value = match.group(1)
    password = encodePassword(password, shared_value)        #加密密码

    data = {            # post数据
            "uid": uid,
            "password": password,
            'command': "studentLogin"
            }

    r = s.post(POST_URL, data=data, headers=headers)   # 提交
    r = s.get(GRADES_URL, headers=headers)
    return r.text.encode('utf-8')

if __name__ == "__main__":
    print login("02119001", "680913")
