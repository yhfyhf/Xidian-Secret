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


