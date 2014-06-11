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
	











