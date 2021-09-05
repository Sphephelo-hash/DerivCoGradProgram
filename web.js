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
		
	if(sumStr.length %2 !=0){//checks if the length of sumStr if odd and if it is the the number at the center will be appended to the end of the newStr
		newStr += sumStr.charAt(n);
	}
	
	return newStr;//returns the reduced String
	
}

document.getElementById("submit").onclick=function(){
	
	var name1 = document.getElementById("name1");
	var name2 = document.getElementById("name2");

	if(/[a-zA-Z]/.test(name1) && /[a-zA-Z]/.test(name2)){//checks if input is only letters
		var inputStr=name1 +" matches "+name2;
		var result =goodMatch(inputStr);
		//window.alert(result);
		document.getElementById('result').innerHTML=result;
}
else{
	document.getElementById('result').innerHTML="Inavlid Input";
	//window.alert("Invalid input");
}
}