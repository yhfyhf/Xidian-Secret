# -*- coding: utf-8 -*-

def get_grade(uid):
    if uid == "admin" or uid == "yhf":
        return "管理员"

    if not uid.isdigit():
        return "error"

    uid_len = len(uid)

    if uid_len == 8 or uid_len == 11:
        pass
    else:
        return "error"

    school_num = uid[0:2] if uid_len == 8 else uid[2:4]

    if school_num == "01":
        grade = "通院"
    elif school_num == "02":
        grade = "电院"
    elif school_num == "03":
        grade = "计算机院"
    elif school_num == "04":
        grade = "机电院"
    elif school_num == "05":
        grade = "物光院"
    elif school_num == "06":
        grade = "经管院"
    elif school_num == "07":
        grade = "数学院"
    elif school_num == "08":
        grade = "人文院"
    elif school_num == "09":
        grade = "外国语学院"
    elif school_num == "13":
        grade = "软件学院"
    elif school_num == "14":
        grade = "微电院"
    elif school_num == "15":
        grade = "生科院"
    else:
        return "error"

    if uid_len == 8:
        year = uid[2:4]
        if year == "10":
            grade += "大四"
        elif year == "11":
            grade += "大三"
        elif year == "12":
            grade += "大二"
        else:
            return "error"
    else:
        year = uid[0:2]
        if year == "13":
            grade += "大一"
        else:
            return "error"
    return grade


if __name__ == "__main__":
    print get_grade("02119001")
    print get_grade("02169001")
    print get_grade("16137001")
    print get_grade("00119001")
    print get_grade("120332322")
    print get_grade("0219001")
    print get_grade("02139001")




















