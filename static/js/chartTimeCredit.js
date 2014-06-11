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

