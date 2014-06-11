/************** chartGradeInterval.js ******************/
function divideByGrade(course) {  // divide courses into groups according to their score
	/* divide the courses by GRADE and parse them into STRING */
		grade6065 = "[";	// grade from 60 to 64.9
		grade6570 = "[";	// grade from 65 to 69.9
		grade7075 = "[";    // grade from 70 to 74.9
		grade7580 = "[";    // grade from 75 to 79.9
		grade8085 = "[";    // grade from 80 to 84.9
		grade8590 = "[";    // grade from 85 to 89.9
		grade9095 = "[";    // grade from 90 to 94.9
		grade9510 = "[";    // grade from 95 to 100
	for(i=0; i<course.length; i++){
		if(course[i].score>=60 && course[i].score<65)
			grade6065 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=65 && course[i].score<70)
			grade6570 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=70 && course[i].score<75)
			grade7075 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=75 && course[i].score<80)
			grade7580 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=80 && course[i].score<85)
			grade8085 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=85 && course[i].score<90)
			grade8590 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=90 && course[i].score<95)
			grade9095 += JSON.stringify(course[i]) + ",";
		else if(course[i].score>=95 && course[i].score<=100)
			grade9510 += JSON.stringify(course[i]) + ",";
	}

  	grade6065 = (grade6065 == "[")? "[]": grade6065.substring(0, grade6065.length-1) + "]";
	grade6570 = (grade6570 == "[")? "[]": grade6570.substring(0, grade6570.length-1) + "]";
	grade7075 = (grade7075 == "[")? "[]": grade7075.substring(0, grade7075.length-1) + "]";
	grade7580 = (grade7580 == "[")? "[]": grade7580.substring(0, grade7580.length-1) + "]";
	grade8085 = (grade8085 == "[")? "[]": grade8085.substring(0, grade8085.length-1) + "]";
	grade8590 = (grade8590 == "[")? "[]": grade8590.substring(0, grade8590.length-1) + "]";
	grade9095 = (grade9095 == "[")? "[]": grade9095.substring(0, grade9095.length-1) + "]";
	grade9510 = (grade9510 == "[")? "[]": grade9510.substring(0, grade9510.length-1) + "]";
	/* STRING parse to JSON */
	grade6065 = JSON.parse(grade6065);
	grade6570 = JSON.parse(grade6570);
	grade7075 = JSON.parse(grade7075);
	grade7580 = JSON.parse(grade7580);
	grade8085 = JSON.parse(grade8085);
	grade8590 = JSON.parse(grade8590);
	grade9095 = JSON.parse(grade9095);
	grade9510 = JSON.parse(grade9510);

	var dataPoints = "var gradeIntervalDataPoints = " + "[" +
						   "{ label: \"60-65\", y: " + grade6065.length + " }," +
						   "{ label: \"65-70\", y: " + grade6570.length + " }," +
						   "{ label: \"70-75\", y: " + grade7075.length + " }," +
						   "{ label: \"75-80\", y: " + grade7580.length + " }," +
						   "{ label: \"80-85\", y: " + grade8085.length + " }," +
						   "{ label: \"85-90\", y: " + grade8590.length + " }," +
						   "{ label: \"90-95\", y: " + grade9095.length + " }," +
						   "{ label: \"95-100\", y: " + grade9510.length + " }" + "]";
	return dataPoints;
}


/************** chartTime.js ******************/
function divideByTime(course) {  // divide courses into groups according to their time
	var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0;
	var up2011Sum = 0, down2011Sum = 0, up2012Sum = 0, down2012Sum =0,
		up2013Sum = 0, down2013Sum = 0, up2014Sum = 0, down2014Sum = 0;
	var up2011Average, down2011Average, up2012Average, down2012Average,
		up2013Average, down2013Average, up2014Average, down2014Average;
	/* get the SUM grade of every semester */
	for(i=0; i<course.length; i++){
		if(course[i].time == "2011 Spring")
			{ up2011Sum += course[i].score * course[i].credit; i1 += course[i].credit; }
		if(course[i].time == "2011 Fall")
			{ down2011Sum += course[i].score * course[i].credit; i2+= course[i].credit; }
		if(course[i].time == "2012 Spring")
			{ up2012Sum += course[i].score * course[i].credit; i3 += course[i].credit; }
		if(course[i].time == "2012 Fall")
			{ down2012Sum += course[i].score*  course[i].credit; i4 += course[i].credit; }
		if(course[i].time == "2013 Spring")
			{ up2013Sum += course[i].score * course[i].credit; i5 += course[i].credit; }
		if(course[i].time == "2013 Fall")
			{ down2013Sum += course[i].score * course[i].credit; i6 += course[i].credit; }
		if(course[i].time == "2014 Spring")
			{ up2014Sum += course[i].score * course[i].credit; i7 += course[i].credit; }
		if(course[i].time == "2014 Fall")
			{ down2014Sum += course[i].score * course[i].credit; i8 += course[i].credit; }
	}
	/* get the AVERAGE grade of every semester */
	{
		up2011Average = up2011Sum / i1;
		down2011Average = down2011Sum / i2;
		up2012Average = up2012Sum / i3;
		down2012Average = down2012Sum / i4;
		up2013Average = up2013Sum / i5;
		down2013Average = down2013Sum / i6;
		up2014Average = up2014Sum / i7;
		down2014Average = up2014Sum / i8;
	}
    var dataPoints;
    if (i2 == 0) {   // 2012届
        if (i8 != 0) {
            dataPoints = "var timeDataPoints = " + "[" +
                               "{ label: \"2012下\", y: " + down2012Average + " }," +
                               "{ label: \"2013上\", y: " + up2013Average + " }," +
                               "{ label: \"2013下\", y: " + down2013Average + " },"  +
                               "{ label: \"2014上\", y: " + up2014Average + " }," +
                               "{ label: \"2014下\", y: " + down2014Average + " }" + "]";
        }
        else if (i7 != 0) {
            dataPoints = "var timeDataPoints = " + "[" +
                               "{ label: \"2012下\", y: " + down2012Average + " }," +
                               "{ label: \"2013上\", y: " + up2013Average + " }," +
                               "{ label: \"2013下\", y: " + down2013Average + " },"  +
                               "{ label: \"2014上\", y: " + up2014Average + " }" + "]";
        }
        else {
            dataPoints = "var timeDataPoints = " + "[" +
                               "{ label: \"2012下\", y: " + down2012Average + " }," +
                               "{ label: \"2013上\", y: " + up2013Average + " }," +
                               "{ label: \"2013下\", y: " + down2013Average + " }" + "]";
        }
    }
    else {  // 2011届
        if (i8 != 0) {
            dataPoints = "var timeDataPoints = " + "[" +
                               "{ label: \"2011下\", y: " + down2011Average + " }," +
                               "{ label: \"2012上\", y: " + up2012Average + " }," +
                               "{ label: \"2012下\", y: " + down2012Average + " }," +
                               "{ label: \"2013上\", y: " + up2013Average + " }," +
                               "{ label: \"2013下\", y: " + down2013Average + " },"  +
                               "{ label: \"2014上\", y: " + up2014Average + " }," +
                               "{ label: \"2014下\", y: " + down2014Average + " }" + "]";
        }
        else if (i7 != 0) {
            dataPoints = "var timeDataPoints = " + "[" +
                               "{ label: \"2011下\", y: " + down2011Average + " }," +
                               "{ label: \"2012上\", y: " + up2012Average + " }," +
                               "{ label: \"2012下\", y: " + down2012Average + " }," +
                               "{ label: \"2013上\", y: " + up2013Average + " }," +
                               "{ label: \"2013下\", y: " + down2013Average + " },"  +
                               "{ label: \"2014上\", y: " + up2014Average + " }" + "]";
        }
        else {
            dataPoints = "var timeDataPoints = " + "[" +
                               "{ label: \"2011下\", y: " + down2011Average + " }," +
                               "{ label: \"2012上\", y: " + up2012Average + " }," +
                               "{ label: \"2012下\", y: " + down2012Average + " }," +
                               "{ label: \"2013上\", y: " + up2013Average + " }," +
                               "{ label: \"2013下\", y: " + down2013Average + " }" + "]";
        }
    }
	return dataPoints;
}


/****************** chartTimeCredit.js *******************/
function divideByTimeCredit(course) {  // divide courses into groups according to their time
	var up2011Sum = 0, down2011Sum = 0, up2012Sum = 0, down2012Sum =0,
		up2013Sum = 0, down2013Sum = 0, up2014Sum = 0, down2014Sum = 0;
	/* get the SUM credits of every semester */
	for(i=0; i<course.length; i++){
		if(course[i].time == "2011 Spring")
			{ up2011Sum += course[i].credit; }
		if(course[i].time == "2011 Fall")
			{ down2011Sum += course[i].credit;}
		if(course[i].time == "2012 Spring")
			{ up2012Sum += course[i].credit;}
		if(course[i].time == "2012 Fall")
			{ down2012Sum += course[i].credit;}
		if(course[i].time == "2013 Spring")
			{ up2013Sum += course[i].credit;}
		if(course[i].time == "2013 Fall")
			{ down2013Sum += course[i].credit;}
		if(course[i].time == "2014 Spring")
			{ up2014Sum += course[i].credit;}
		if(course[i].time == "2014 Fall")
			{ down2014Sum += course[i].credit;}
	}
    var dataPoints;
    if (up2012Sum - 0 < 0.1) {   // 2012届
        if( down2014Sum - 0 > 0.1) {
            dataPoints = "var timeCreditDataPoints = " + "[" +
                               "{ label: \"2012下学期\", legendText: \"2012下学期\", y: " + down2012Sum + " }," +
                               "{ label: \"2013上学期\", legendText: \"2013上学期\", y: " + up2013Sum + " }," +
                               "{ label: \"2013下学期\", legendText: \"2013下学期\", y: " + down2013Sum + " }," +
                               "{ label: \"2014上学期\", legendText: \"2014上学期\", y: " + up2014Sum + " }," +
                               "{ label: \"2014下学期\", legendText: \"2014下学期\", y: " + down2014Sum + " }," + "]";
        }
        else {
            dataPoints = "var timeCreditDataPoints = " + "[" +
                               "{ label: \"2012下学期\", legendText: \"2012下学期\", y: " + down2012Sum + " }," +
                               "{ label: \"2013上学期\", legendText: \"2013上学期\", y: " + up2013Sum + " }," +
                               "{ label: \"2013下学期\", legendText: \"2013下学期\", y: " + down2013Sum + " }," +
                               "{ label: \"2014上学期\", legendText: \"2014上学期\", y: " + up2014Sum + " }," + "]";
        }
	}
    else {   // 2011届
        if( down2014Sum - 0 > 0.1) {
            dataPoints = "var timeCreditDataPoints = " + "[" +
                               "{ label: \"2011下学期\", legendText: \"2011下学期\", y: " + down2011Sum + " }," +
                               "{ label: \"2012上学期\", legendText: \"2012上学期\", y: " + up2012Sum + " }," +
                               "{ label: \"2012下学期\", legendText: \"2012下学期\", y: " + down2012Sum + " }," +
                               "{ label: \"2013上学期\", legendText: \"2013上学期\", y: " + up2013Sum + " }," +
                               "{ label: \"2013下学期\", legendText: \"2013下学期\", y: " + down2013Sum + " }," +
                               "{ label: \"2014上学期\", legendText: \"2014上学期\", y: " + up2014Sum + " }," +
                               "{ label: \"2014下学期\", legendText: \"2014下学期\", y: " + down2014Sum + " }," + "]";
        }
        else {
            dataPoints = "var timeCreditDataPoints = " + "[" +
                               "{ label: \"2011下学期\", legendText: \"2011下学期\", y: " + down2011Sum + " }," +
                               "{ label: \"2012上学期\", legendText: \"2012上学期\", y: " + up2012Sum + " }," +
                               "{ label: \"2012下学期\", legendText: \"2012下学期\", y: " + down2012Sum + " }," +
                               "{ label: \"2013上学期\", legendText: \"2013上学期\", y: " + up2013Sum + " }," +
                               "{ label: \"2013下学期\", legendText: \"2013下学期\", y: " + down2013Sum + " }," +
                               "{ label: \"2014上学期\", legendText: \"2014上学期\", y: " + up2014Sum + " }," + "]";
        }
    }
	return dataPoints;
}

/****************** getOthers.js *******************/
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


