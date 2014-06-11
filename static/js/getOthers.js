var courses_num = myCourse.length;
var credits_num = 0.0;
var score_all = 0.0;
var required_credits_num = limited_credits_num = elective_credits_num = 0.0;
var required_score_all = limited_score_all = elective_score_all = 0.0;
for (i = 0; i < courses_num; i++) {
    var course = myCourse[i];
    var score = course.score;
    var credit = course.credit;
    credits_num += credit;
    score_all += score * credit;
    if (course.courseType == "Required") {
        required_credits_num += credit;
        required_score_all += score * credit;
    }
    else if (course.courseType == "Limited") {
        limited_credits_num += credit;
        limited_score_all += score * credit;
    }
    else {
        elective_credits_num += course.credit;
        elective_score_all += score * credit;
    }
}
var score_avg = score_all / credits_num;
var required_avg = required_score_all / required_credits_num;
var limited_avg = limited_score_all / limited_credits_num;
var elective_avg = elective_score_all / elective_credits_num;

function gpa1(grade) {
  if (grade >= 90 && grade <= 100)
    return 4.0;
  else if (grade >= 85 && grade <= 89)
    return 3.7;
  else if (grade >= 82 && grade <= 84)
    return 3.3;
  else if (grade >= 78 && grade <= 81)
    return 3.0;
  else if (grade >= 75 && grade <= 77)
    return 2.7;
  else if (grade >= 72 && grade <= 74)
    return 2.3;
  else if (grade >= 69 && grade <= 71)
    return 2.0;
}

function gpa2(grade) {
  if (grade >= 90 && grade <= 100)
    return 4.0;
  else if (grade >= 85 && grade <= 89)
    return 3.7;
  else if (grade >= 80 && grade <= 84)
    return 3.3;
  else if (grade >= 75 && grade <= 79)
    return 3.0;
  else if (grade >= 72 && grade <= 74)
    return 2.7;
  else if (grade >= 69 && grade <= 71)
    return 2.3;
  else if (grade >= 66 && grade <= 68)
    return 2.0;
}

gradeSum1 = 0;
creditSum1 = 0;
for(i = 0; i < myCourse.length; i++) {
  gradeSum1 += gpa1(myCourse[i].score) * myCourse[i].credit;
  creditSum1 += myCourse[i].credit;
}
var gpa1 = gradeSum1 / creditSum1;

gradeSum2 = 0;
creditSum2 = 0;
for(i = 0; i < myCourse.length; i++) {
  gradeSum2 += gpa2(myCourse[i].score) * myCourse[i].credit;
  creditSum2 += myCourse[i].credit;
}
var gpa2 = gradeSum2 / creditSum2;


$jQuery(document).ready(function($) {
	$("[data-toggle=popover]")
      .popover()
});