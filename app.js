
String.prototype.replaceAt=function(index, char) { //this function replaces a character at a specified index with the character you specified
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

function goodMatch(myStr){ //this function finds how many times each character appears in the string
	
	myStr=(myStr.split(" ").join("")).toLowerCase();//changes ever letther in the string to be in lower case
	sumStr = "";//stores the sum of the added  umbers 
	for(var i = 0; i< myStr.length; i++){ //used to get characters
		var current = myStr.charAt(i);//stores the character at the current index
		var count = 0;//counts the number of times a *current* appears in the string
		if(current != '*'){//checks if the current character is not a "*"
			for(var j = 0; j<myStr.length; j++){//checks how many times current occurs
				if(myStr.charAt(j)==current){
					count++;//increments when current appears
					myStr = myStr.replaceAt(j, "*");//changes the character that has already been checked to a "*"
				}
			}
		}
		if(count >0){
			sumStr+=count.toString();//appends count to sumStr
		}
		
	}
	
	while(sumStr.length>2){//checks to see if there are only two digits left in the string and if not then the function will run again
		sumStr=findPercent(sumStr);
	}
	return sumStr//returns the final two digits 
}

function findPercent(sumStr){//reduces the string that contains how many times a character appears in it
	var n = Math.round((sumStr.length-1)/2);//finds the half of the length of the string
	var sum;//stores the sum of the numbers 
	var newStr = "";//will contain the new string of sum of numbers 
	for(var i = 0; i<n; i++){//loops through the string only half the length of the string		
		sum = parseInt(sumStr.charAt(i))+parseInt(sumStr.charAt(sumStr.length-1-i)); //adds the value on the right side of the string and the value at the left side of tghe string
		newStr += sum.toString();//adds the sum to the newString
	}
		
	if(sumStr.length %2 !=0){//checks if the length of sumStr if odd and if it is the the number at the center will be ppended to the end of the newStr
		newStr += sumStr.charAt(n);
	}
	
	return newStr;//returns the reduced String
	
}




var t0 = Date.now(); // stores current time

var data = require('fs').readFileSync("test.csv", "utf8"); //fetches the data from the csv file
data = data.split("\r\n");
var strline ="";
var strline2 ="";//reverse
var matchesArray =[];//stores matches
var revmatchesArray =[];//reverse of matches
let male =[];//males array
let female=[];//females arra
var invalidInput =0;//keeps track of invalid inputes
var duplicate =0;//kepps track of duplicates
var total = 0;
var count =0;
for(let line in data){
	let arr = data[line].split(", ");//splits the data by comma
	let name = arr[0];//fetches the name
	let gender =arr[1];//fetches the gender
	//console.log(gender);
	
	if(gender=='m' && !male.includes(name) && /[a-zA-Z]/.test(name)){//checks if gender is male, is name is not duplicated and if input is only letters
	male.push(name);}
	else if(gender=='f' && !female.includes(name) && /[a-zA-Z]/.test(name)){//checks if gender is female, is name is not duplicated and if input is only letters
		female.push(name);}
	else if(female.includes(name) || male.includes(name)){//checks if name is not duplicated 
		console.log(name +": Name already Exist");
		duplicate++;}
		
	else {//achecks if input contains any other characters besides letters 
		console.log(name+" Invalid Input");
		invalidInput++}
	
}


for(var b =0; b<female.length; b++){

	for(var d= 0; d<male.length;d++){
		var inputStr = female[b].trim() + " matches " +male[d].trim();
		var result =goodMatch(inputStr);//match between female name and male name 
		matchesArray.push(result+","+inputStr);	//adds them to the array
		
		
	}
}
/*Reverse*/
for(var x =0; x<male.length; x++){

	for(var y= 0; y<female.length;y++){
		var inputStr2 = male[x].trim() + " matches " +female[y].trim();
		var result2 =goodMatch(inputStr2);//match between mae male and female name 
		revmatchesArray.push(result2+","+inputStr2);	//adds them to the array
		
		
	}
}

revmatchesArray.sort();//reverse
matchesArray.sort();//sorts the array according to the highest percentage and if they are the same then it checks the alphabetical order
for(var h =0; h<matchesArray.length ; h++){
	let temporary = matchesArray[h].split(",");//splits the array by comma
	if(temporary[0]>=80){//appends to strline and adds good match if match is above 80%
		strline += (temporary[1]+" "+temporary[0]+"%, good match\n");
		total+=parseInt(temporary[0]);
		count ++;
	}
	
	else{//appends to strline 
		strline += (temporary[1]+" "+temporary[0]+"%\n");
		total+=parseInt(temporary[0]);
		count ++;
	}
}
/*reverse*/
for(var cn =0; cn<revmatchesArray.length ; cn++){
	let temporary = matchesArray[cn].split(",");//splits the array by comma
	if(temporary[0]>=80){//appends to strline and adds good match if match is above 80%
		strline2 += (temporary[1]+" "+temporary[0]+"%, good match\n");
		
	}
	
	else{//appends to strline 
		strline2 += (temporary[1]+" "+temporary[0]+"%\n");
		
	}
}



const fs = require('fs');//allows for interaction with file

 fs.writeFile("test.txt", strline+"\n\n---Reverse---\n"+strline2 +"\n\nAverage ="+(parseInt(total)/parseInt(count))+"%", function(err) {//writes to the file the matches and if it doesn't exist it creates one 
    if(err) {//throws an error is there are errors whie trying to write to the file
        return console.log(err);
    }
    console.log("The file was saved!");
});

 var t1 = Date.now();
var timeTaken = t1-t0;//calculated the time taken for the code to execute
 var logs = "Duplicated names: "+ duplicate+"\nInvalid Input: "+invalidInput+"\nExecution Time: "+timeTaken+"s";
 fs.writeFile("logs.log", logs , function(err) {//writes to the file the logs and if it doesn't exist it creates one 
    if(err) {//throws an error is there are errors whie trying to write to the file
        return console.log(err);
    }
    console.log("Logs Saved");
});






//var htmlRes =name1.trim() +" matches "+name2.trim(htmlRes);