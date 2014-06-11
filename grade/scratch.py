# -*- coding: utf-8 -*-
import bs4
from bs4 import BeautifulSoup
from login import login


def get_grades(uid, password):
    results = []
    html = login(uid, password)
    if "失败" in html[:15]:
        return None
    soup = BeautifulSoup(html, fromEncoding="utf-8")
    trs = soup.find_all('tr')
    name = trs[2].find('td').text.strip()[3:]
    results.append(name)
    trs = trs[6:]
    for tr in trs:
        tds = tr.find_all('td')
        time = tds[0].text.strip().replace("年上", " Spring").replace("年下", " Fall")
        course_name = tds[2].text.strip()
        course_type = tds[3].text.strip()
        credit = float(tds[4].text.strip())
        score = tds[6].text.strip()
        if score == "" or score == "不通过" or score == "0.0":
            continue
        if score == "免修":
            score = 85
        elif score == "优秀":
            score = 95
        elif score == "通过":
            score = 80
        else:
            score = float(score)
        result = dict()
        result['time'] = time
        result['courseName'] = course_name
        result['courseType'] = course_type
        result['credit'] = credit
        result['score'] = score
        results.append(result)
    return results


if __name__ == "__main__":
    print get_grades("02119001", "sdfas")




