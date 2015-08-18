/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = Number(condition);  // these two variables are passed by the psiturk server process
var mycounterbalance = Number(counterbalance);  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to address

mycondition=0;

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instructHigh.html",
	"instructions/instructLow.html",
	"instructions/instructNo.html",
	"stage.html",
	"postquestionnaire.html",
	"postquestionnaire2.html",
	"postquestionnaire3.html",
	"secondInstruction.html",
	"endquestions.html",
	"postquestionnaireNoMusic2.html",
	"postquestionnaireNoMusic3.html",
	"DifficultyQuestion1.html",
	"DifficultyQuestion2.html"

];

psiTurk.preloadPages(pages);


musicCondition=7;

if (mycondition===0) {

	//alert("0");
	musicCondition = 0;
}else if(mycondition===3){
		//alert("3");
		 musicCondition = 0;
}else if(mycondition===1){
		//alert("1");
		 musicCondition = 1;
}else if(mycondition===4){
		//alert("4");
		 musicCondition = 1;
}else if(mycondition===2){
		//alert("2");
		 musicCondition = 2;
}else if(mycondition===5){
		//alert("5");
		 musicCondition = 2;
}

console.log(typeof mycondition);
console.log( musicCondition);

psiTurk.recordUnstructuredData("condition", mycondition);
psiTurk.recordUnstructuredData("counterbalance", mycounterbalance);


//if(musicCondition==0){
	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html"
		//"instructions/instructHigh.html",
		//"instructions/instructLow.html",
		//"instructions/instructNo.html"
	];

//}else if (musicCondition==1) {
//
//	var instructionPages = [ // add as a list as many pages as you like
//		"instructions/instruct-1.html",
//		"instructions/instructHigh.html"
//		//"instructions/instructLow.html",
//		//"instructions/instructNo.html"
//	];
//
//}else  {
//	var instructionPages = [ // add as a list as many pages as you like
//		"instructions/instruct-1.html",
//		//"instructions/instructHigh.html",
//		"instructions/instructLow.html"
//		//"instructions/instructNo.html"
//	];
//
//}




/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/


if(mycondition<3){
	var questionset = [0,1];
}else{
	var questionset = [1,0];
}

var secondCondition = 0;




var GambleExperiment = function() {


	var currentnumber = 0;


	var initialCond = 2;






	var valLevels = [200,150,100, 50];




	function shuffleArray(a) { // Fisher-Yates shuffle, no side effects
		var i = a.length, t, j;
		a = a.slice();
		while (--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
		return a;
	}

	valLevels = shuffleArray(valLevels);



	var numTrials = valLevels.length;

	//this is probably wrong
	var soundtrial = numTrials * 2;
	var stims = valLevels;

	var trialNum = 0;

	var trialstart = 0;


	var next = function () {
		if (stims.length === 0) {
			questionset.shift();
			secondCondition += 1;
			prefinish();

		}
		else {
			trialNum += 1;

			stim = stims.shift();
			stimH = stim.toString();
			currentnumber = stim;
			show_info(stimH);
			document.getElementById('SubButton').style.visibility = 'visible';

			trialstart = new Date().getTime();

			if (secondCondition===1) {
				if (musicCondition > 0) {
					document.getElementById('music').play();
				}
			}

		}
	};


	var riskyText1 = " Imagine that there is a bag on the table filled with <b>exactly 50 red poker chips and" +
		" 50 black poker chips.</b> Suppose that you are offered a ticket to a game that is to be played as " +
		"follows: First, you are to guess a color (red or black). Next, without looking, you are to draw " +
		"a poker chip out the bag. If the color that you draw is the same as the one you predicted, then you will win $";

	var ambiguousText1 = "Imagine that there is a bag on the table filled with 100 poker chips that are red and black, " +
		"but <b> you do not know their relative proportion.</b> Suppose that you are offered a ticket to a game that is to be" +
		" played as follows: First, you are to guess a color (red or black). Next, without looking, " +
		"you are to draw a poker chip out of the bag. If the color that you draw is the same as the " +
		"one you predicted, then you will win $";


	var endText1 = "; otherwise you win nothing. What is the most that you would pay for a" +
		" ticket to play such a game.";


	var questionText = "Please provide a dollar amount between <b>$0 and $";


	var response_handler = function () {


		var rt = new Date().getTime()-trialstart;
		d3.select("#word3").remove();

		var TextEntry1 = document.getElementById("newtextbox").value;

		var re = new RegExp('^[0-9]+([,.][0-9]+)?');


		if (TextEntry1 == "") {
			d3.select("#message")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("please answer the question");
		}

		else if (TextEntry1 == null) {
			d3.select("#message")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("please answer the question");
		}
		else if (re.test(TextEntry1) == false) {
			d3.select("#message")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("please enter a number")

		}
		else if (TextEntry1 < 0) {
			d3.select("#message")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("please enter a value greater than 0");
		}

		else if (TextEntry1 > currentnumber) {
			d3.select("#message")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("Please enter a value less than " + currentnumber.toString());
		}
		else {
			psiTurk.recordTrialData({"reactiontime":rt,
				"response":TextEntry1,
				'stim':stimH});


			remove_stims();
			document.getElementById('SubButton').style.visibility = 'hidden';
			setTimeout(next,250);


		}

	};




	var prefinish = function () {
			currentview = new DifficultyQuestions1;


	};




	var show_info = function (text) {


		//finish up

		if (questionset[0] === 0) {
			//d3.select("#stim1")
			//	.append("div")
			//	.attr("id", "word")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "140")
			//	.style("margin", "20px")
			//	.text(riskyText1 + text.toString() + endText1);

			d3.select("#stim1")
				.append("div")
				.attr("id", "word")
				.html('<p>'+riskyText1 + '<b>'+ text.toString() + '</b>' + endText1+'</p>');

			//d3.select("#stim2")
			//	.append("div")
			//	.attr("id", "worda1")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "180")
			//	.style("margin", "20px")
			//	.text("In the bag, there are:");
			//d3.select("#stim2")
			//	.append("div")
			//	.attr("id", "worda2")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "140")
			//	.style("margin", "20px")
			//	.text("50 red poker chips");
			//d3.select("#stim2")
			//	.append("div")
			//	.attr("id", "worda3")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "180")
			//	.style("margin", "20px")
			//	.text("50 black poker chips");


		} else {
			d3.select("#stim1")
				.append("div")
				.attr("id", "word")
				.html('<p>'+ambiguousText1 + '<b>' +text.toString()+'</b>' + endText1+'</p>');

			//d3.select("#stim2")
			//	.append("div")
			//	.attr("id", "worda1")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "180")
			//	.style("margin", "20px")
			//	.text("In the bag, there are:");
			//d3.select("#stim2")
			//	.append("div")
			//	.attr("id", "worda2")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "140")
			//	.style("margin", "20px")
			//	.text("? red poker chips");
			//d3.select("#stim2")
			//	.append("div")
			//	.attr("id", "worda3")
			//	.style("text-align", "center")
			//	.style("font-size", "20px")
			//	.style("font-weight", "180")
			//	.style("margin", "20px")
			//	.text("? black poker chips");

		}


		//basic text
		d3.select("#stim3")
			.append("div")
			.attr("id", "word2")
			.html('<p>' + questionText + text.toString()+ "</b></p>");


		//textbox
		d3.select("#tb")
			.append("svg")
			.attr("id", "drawntextbox")
			.attr("width", 200)
			.attr("height", 50)
			.append("foreignObject")
			.attr("class", "externalObject")
			.attr("width", 200)
			.attr("height", 50)
			.append("xhtml:div")
			.html("<input type='text' id=newtextbox>");


		if(secondCondition===0){
			d3.select("#stagetitle").html('<h2>Section 1</h2>');

		}else{
			d3.select("#stagetitle").html('<h2>Section 2</h2>');

		}


		document.getElementById('SubButton').onclick = response_handler;



	};

	var remove_stims = function () {
		d3.select("#word").remove();
		d3.select("#word2").remove();
		d3.select("#worda1").remove();
		d3.select("#worda2").remove();
		d3.select("#worda3").remove();
		d3.select("#word3").remove();
		d3.select("#drawntextbox").remove();
	};


	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Start the test


	var firstSection = function () {


		d3.select("#stim1")
			.append("div")
			.attr("id", "title")
			.html("<h1>Section 1</h1>")

		d3.select("#stim1")
			.append("div")
			.attr("id", "word")
			.style("text-align", "center")
			.style("font-size", "20px")
			.style("font-weight", "140")
			.style("margin", "20px")
			.text("Please press 'submit' to advance to the first set of questions.");


		document.getElementById('SubButton').onclick = erasefirstSection;


	};

	var erasefirstSection = function () {
		d3.select("#word").remove();
		d3.select("#title").remove();
		next();

	};


	if (secondCondition == 0) {

		firstSection();
	} else {
	next();
}





};

var hidebutton = function (){
	document.getElementById('nextbutton').style.visibility = 'hidden';
	console.log("hidebutton");
};

var hideMusicbutton = function (){
	document.getElementById('soundbutton').style.visibility = 'hidden';

};
var showbutton = function (){
	document.getElementById('nextbutton').style.visibility = 'visible';
	console.log("showbutton")

};



var finish = function () {

	if (secondCondition == 1) {
		currentview = new secondInstruction;

		switch (musicCondition) {


			case 1:

				d3.select("#additionaltext").html('<p> In this section, music will be playing in the background. '+
					'</br> </br><b>Please note one important thing about the music. Previous research has shown that it enhances one’s focus and makes it feel easier to think. ' +
					'That is, in the decision task you are about to do, the music may make it easier to identify how much the gamble is worth to you.</b>' +
					'</br> </br>To get an impression of the music please click the "music" button below to start listening. After 10 seconds you will be able to advance to Section 2.'+
					' Please make sure you can hear the music clearly, you will later be asked some simple questions about the music. </p>');
				hidebutton();

				break;

			case 2:

				//d3.select("#additionaltext").html('<p> In this section, music will be playing in the background. You will start playing the music soon, please turn up your volume so that you are able to hear it clearly. ' +
				//	'As an attention check, you will be asked to answer some simple questions about the music. ' +
				//	"</br> </br>Please note one important thing about the music. Previous research with this music shows that it generally disrupts one’s focus and makes it feel more difficult to think.  " +
				//	'That is, in the decision task you are about to do, the music will make it hard to identify how much the gamble is worth to you.' +
				//	'</br> </br>To get an impression of the music please click the button below to start listenting to the music. After 10 seconds you will be able to advance to Section 2.'+
				//	'</p>');

				d3.select("#additionaltext").html('<p> In this section, music will be playing in the background. '+
					"</br> </br><b>Please note one important thing about the music. Previous research has shown that it disrupts one’s focus and makes it feel more difficult to think.  " +
					'That is, in the decision task you are about to do, the music may make it harder to think about how much the gamble is worth to you.</b>' +
					'</br> </br>To get an impression of the music please click the "music" button below to start listening. After 10 seconds you will be able to advance to Section 2.'+
					' Please make sure you can hear the music clearly, you will later be asked some simple questions about the music. </p>');
				hidebutton();
				break;
			case 0:
				hideMusicbutton();



		}


	} else {


		endtrial();


	}


};


var playmusic = function(){
	document.getElementById('music').play();
	setTimeout(showbutton,10000);
};






var DifficultyQuestions1 = function(){

	var cbversion =0;

	record_responses = function() {

		if (secondCondition ==1){
			psiTurk.recordTrialData({'phase':'difQuestions1', 'status':'submit','cbversion':cbversion});
			//alert("secondcondition1");
			//alert(secondCondition);
			//alert(type(secondCondition));


			psiTurk.recordUnstructuredData("first difquestion","first");

			$('input').each( function(i, val) {
				if (this.checked==true) {
					psiTurk.recordUnstructuredData(this.id, this.value);
				}
			})

		}else{
			//alert("secondcondition2");
			//alert(secondCondition);
			//alert(type(secondCondition));

			psiTurk.recordTrialData({'phase':'difQuestions2', 'status':'submit','cbversion':cbversion});
			psiTurk.recordUnstructuredData("second difquestion","second");

			$('input').each( function(i, val) {
				if (this.checked==true) {
					psiTurk.recordUnstructuredData(this.id+"2",this.value);
				}
			})
		}






	};




	if (mycounterbalance==0) {
		//alert("0");
		psiTurk.showPage('DifficultyQuestion1.html');
		cbversion =0;


	}else{
		//alert("1");
		psiTurk.showPage('DifficultyQuestion2.html');
		cbversion =1;
	}

	var checkinputs = function () {

		var numchecked = 0;

		$('input').each(function (i, val) {
			if (this.checked == true) {
				numchecked += 1;
			}
		});

		if (numchecked < 3) {
			d3.select("#stim2")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("Please answer all questions");

		} else {
			if (secondCondition ==1){
				psiTurk.recordTrialData({'phase':'difQuestions1', 'status':'begin','cbversion':cbversion});


			}else{

				psiTurk.recordTrialData({'phase':'difQuestions2', 'status':'begin','cbversion':cbversion});
			}
			record_responses();
			psiTurk.saveData();
			DifficultyQuestionsAdvance();
		}
	};



	$("#next").click(function () {
		checkinputs();
	});

};

var DifficultyQuestionsAdvance = function(){

	finish();
};




var secondInstruction = function(){



	psiTurk.showPage('secondInstruction.html');





};


//what happens when you click on the second instructions.

var secondInstructionsAdvance = function(){

	currentview = new GambleExperiment();

};


//var EndQuestions = function() {
//
//	document.getElementById('SubButton').style.visibility = 'visible';
//
//
//	d3.select("#stim1")
//		.append("div")
//		.attr("id", "word")
//		.style("text-align", "center")
//		.style("font-size", "30px")
//		.style("font-weight", "140")
//		.style("margin", "20px")
//		.text("Thank you for finishing Section 2. Please press 'submit' to advance.");
//
//	document.getElementById('SubButton').onclick=endtrial;
//
//
//
//
//};

var endtrial = function(){
	//document.getElementById('music').pause();

	if(musicCondition==0){
		currentview = QuestionnaireNoMusic3();

	}else{
		currentview = Questionnaire();
	}


};

/****************
* Questionnaire *
****************/















var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";


	var record_responses = function () {

		psiTurk.recordTrialData({'phase': 'postquestionnaire', 'status': 'submit'});

		$('textarea').each(function (i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each(function (i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('input').each(function (i, val) {
			if (this.checked == true) {
				psiTurk.recordUnstructuredData(this.id, this.value);
			}
		});
	};


	var checkinputs = function () {

		var numchecked = 0;




		$('input').each(function (i, val) {
			if (this.checked == true) {
				numchecked += 1;
			}
		});

		if (numchecked < 2) {
			d3.select("#stim2")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("Please answer all questions");

		} else {
			record_responses();
			psiTurk.saveData();
			currentview = new Questionnaire2();

		}
	};






	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase': 'postquestionnaire', 'status': 'begin'});

	$("#next").click(function () {
		checkinputs();

	});
};





var Questionnaire2 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	var record_responses = function() {

		psiTurk.recordTrialData({'phase': 'postQuestion2', 'status': 'submit'});

		$('textarea').each(function (i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each(function (i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('input').each(function (i, val) {
			if (this.checked == true) {
				psiTurk.recordUnstructuredData(this.id, this.value);
			}
		})
	};


	var checkinputs = function () {

		var numchecked = 0;

		$('input').each(function (i, val) {
			if (this.checked == true) {
				numchecked += 1;
			}
		});

		if (numchecked < 2) {
			d3.select("#stim2")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("Please answer all questions");

		} else {
			record_responses();
			psiTurk.saveData();
			currentview = new Questionnaire3();
		}
	};







	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire2.html');
	psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'begin'});


	$("#next").click(function () {
		checkinputs();


	});


};

var Questionnaire3 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	//d3.select("#Q3")
	//	.append("div")
	//	.attr("id","word2")
	//	.style("class","center")
	//	.style("col-md-8")
	//	.text("ExampleText");


	var record_responses = function() {

		psiTurk.recordTrialData({'phase':'postQuestion3', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('input').each( function(i, val) {
			if (this.checked==true) {
				psiTurk.recordUnstructuredData(this.id, this.value);
			}
		})



	};


	var checkinputs = function () {

		var numchecked = 0;

		$('input').each(function (i, val) {
			if (this.checked == true) {
				numchecked += 1;
			}
		});

		if (numchecked < 4) {
			d3.select("#stim2")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("Please answer all questions");

		} else {
			record_responses();
			psiTurk.saveData();
			psiTurk.saveData({
				success: function(){
					psiTurk.completeHIT(); // when finished saving compute bonus, the quit

				},
				error: prompt_resubmit});
		}
	};



	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);

		psiTurk.saveData({
			success: function() {
				clearInterval(reprompt);
				psiTurk.computeBonus('compute_bonus', function(){finish()});
			},
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire3.html');
	psiTurk.recordTrialData({'phase':'postQuestion3', 'status':'begin'});



	$("#next").click(function () {
		checkinputs();

	});


};

//
//var QuestionnaireNoMusic2 = function() {
//
//	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
//
//	record_responses = function() {
//
//		psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'submit'});
//
//		$('textarea').each( function(i, val) {
//			psiTurk.recordUnstructuredData(this.id, this.value);
//		});
//		$('select').each( function(i, val) {
//			psiTurk.recordUnstructuredData(this.id, this.value);
//		});
//		$('input').each( function(i, val) {
//			if (this.checked==true) {
//				psiTurk.recordUnstructuredData(this.id, this.value);
//			}
//		})
//
//	};
//
//
//
//	// Load the questionnaire snippet
//	psiTurk.showPage('postquestionnaireNoMusic2.html');
//	psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'begin'});
//
//
//	$("#next").click(function () {
//		record_responses();
//		psiTurk.saveData();
//		currentview = new QuestionnaireNoMusic3();
//
//	});
//
//
//};

var QuestionnaireNoMusic3 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	var record_responses = function() {

		psiTurk.recordTrialData({'phase':'postQuestion3', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('input').each( function(i, val) {
			if (this.checked==true) {
				psiTurk.recordUnstructuredData(this.id, this.value);
			}
		})
	};
	//d3.select("#Q3")
	//	.append("div")
	//	.attr("id","word2")
	//	.style("class","center")
	//	.style("col-md-8")
	//	.text("ExampleText");

	var checkinputs = function () {

		var numchecked = 0;

		$('input').each(function (i, val) {
			if (this.checked == true) {
				numchecked += 1;
			}
		});

		if (numchecked < 3) {
			d3.select("#stim2")
				.append("div")
				.attr("id", "word3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("Please answer all questions");

		} else {
			record_responses();
			psiTurk.saveData();
			psiTurk.saveData({
				success: function(){
					psiTurk.completeHIT(); // when finished saving compute bonus, the quit

				},
				error: prompt_resubmit});
		}
	};






	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);

		psiTurk.saveData({
			success: function() {
				clearInterval(reprompt);
				psiTurk.computeBonus('compute_bonus', function(){finish()});
			},
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaireNoMusic3.html');
	psiTurk.recordTrialData({'phase':'postQuestion3', 'status':'begin'});



	$("#next").click(function () {
		checkinputs();

	});


};








// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new GambleExperiment(); } // what you want to do when you are done with instructions
    );
});
