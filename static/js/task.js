/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = Number(condition);  // these two variables are passed by the psiturk server process
var mycounterbalance = Number(counterbalance);  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

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
	"postquestionnaireNoMusic3.html"

];

psiTurk.preloadPages(pages);


musicCondition=7;

if (mycondition===0) {

	alert("0");
	musicCondition = 0;
}else if(mycondition===3){
		alert("3");
		 musicCondition = 0;
}else if(mycondition===1){
		alert("1");
		 musicCondition = 1;
}else if(mycondition===4){
		alert("4");
		 musicCondition = 1;
}else if(mycondition===2){
		alert("2");
		 musicCondition = 2;
}else if(mycondition===5){
		alert("5");
		 musicCondition = 2;
}

console.log(typeof mycondition);
console.log( musicCondition);

if(musicCondition==0){
	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html"
		//"instructions/instructHigh.html",
		//"instructions/instructLow.html",
		//"instructions/instructNo.html"
	];

}else if (musicCondition==1) {

	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html",
		"instructions/instructHigh.html"
		//"instructions/instructLow.html",
		//"instructions/instructNo.html"
	];

}else  {
	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html",
		//"instructions/instructHigh.html",
		"instructions/instructLow.html"
		//"instructions/instructNo.html"
	];

}




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


	var wordon,
		listening = false,
		listeningInt = false;

	var initialCond = 2;


	if (mycounterbalance == 0) {

		var valLevels = [50, 100, 200];
	}
	else {
		var valLevels = [200, 100, 50];
	}


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
			finish(questionset);

		}
		else {
			trialNum += 1;
			stim = stims.shift();
			stimH = stim.toString();
			currentnumber = stim;
			show_info(stimH);
			trialstart = new Date().getTime();
			listening = true;

			if (secondCondition===1) {
				if (musicCondition > 0) {
					document.getElementById('music').play();
				}
			}

		}
	};


	var riskyText1 = " Imagine that there is a bag on the table filled with exactly 50 red poker chips and" +
		" 50 black poker chips. Suppose that you are offered a ticket to a game that is to be played as " +
		"follows: First, you are to guess a color (red or black). Next, without looking, you are to draw " +
		"a poker chip out the bags. If the color that you draw is the same as the one you predicted, then you will win $";

	var ambiguousText1 = "Imagine that there is a bag on the table filled with 100 poker chips that are red and black, " +
		"but you do not know their relative proportion. Suppose that you are offered a ticket to a game that is to be" +
		" played as follows: First, you are to guess a color (red or black). Next, without looking, " +
		"you are to draw a poker chip out of the bag. If the color that you draw is the same as the " +
		"one you predicted, then you will win $";


	var endText1 = "; otherwise you win nothing. What is the most that you would pay for a" +
		" ticket to play such a game for each of the bags?";


	var questionText = "Please provide a dollar value between $0 and $";


	var response_handler = function () {


		var rt = trialstart - new Date().getTime();
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
			psiTurk.recordTrialData([rt, TextEntry1]);


			remove_stims();
			next();

		}

	};


	var finish = function () {

		if (secondCondition == 1) {
			currentview = new secondInstruction;

			switch (musicCondition) {


				case 1:

					d3.select("#additionaltext").html('<p> In this section, music will play in the background.  This music allows us to monitor attention.  ' +
						'As an attention check, at some point during this task a word will be said over the music. ' +
						'You will be asked to report what word was said. ' +
						'Please note that previous research with this music shows that it generally enhances one’s focus and makes it feel easier to think. ' +
						'That is, in the decision task you are about to do, the music will make it easier to identify how much the gamble is worth to you.' +
						'</p>');
					break;

				case 2:

					d3.select("#additionaltext").html('<p> In this section, music will play in the background.  This music allows us to monitor attention.  ' +
						'As an attention check, at some point during this task, a word will be said over the music. ' +
						'You will be asked to report what word was said. ' +
						"Please note that previous research with this music shows that it generally disrupts one’s focus and makes it feel more difficult to think" +
						'That is, in the decision task you are about to do, the music will make it hard to identify how much the gamble is worth to you.' +
						'</p>');
			}


		} else {


			EndQuestions();


		}


	};

	var show_info = function (text) {


		//finish up

		if (questionset[0] === 0) {
			d3.select("#stim1")
				.append("div")
				.attr("id", "word")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "140")
				.style("margin", "20px")
				.text(riskyText1 + text.toString() + endText1);

			d3.select("#stim2")
				.append("div")
				.attr("id", "worda1")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("In the bag, there are:");
			d3.select("#stim2")
				.append("div")
				.attr("id", "worda2")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "140")
				.style("margin", "20px")
				.text("50 red poker chips");
			d3.select("#stim2")
				.append("div")
				.attr("id", "worda3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("50 black poker chips");


		} else {
			d3.select("#stim1")
				.append("div")
				.attr("id", "word")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "140")
				.style("margin", "20px")
				.text(ambiguousText1 + text.toString() + endText1);

			d3.select("#stim2")
				.append("div")
				.attr("id", "worda1")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("In the bag, there are:");
			d3.select("#stim2")
				.append("div")
				.attr("id", "worda2")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "140")
				.style("margin", "20px")
				.text("? red poker chips");
			d3.select("#stim2")
				.append("div")
				.attr("id", "worda3")
				.style("text-align", "center")
				.style("font-size", "20px")
				.style("font-weight", "180")
				.style("margin", "20px")
				.text("? black poker chips");

		}


		//basic text
		d3.select("#stim3")
			.append("div")
			.attr("id", "word2")
			.style("text-align", "center")
			.style("font-size", "20px")
			.style("font-weight", "180")
			.style("margin", "20px")
			.text(questionText + text.toString());


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

var secondInstruction = function(){



	psiTurk.showPage('secondInstruction.html');





};


//what happens when you click on the second instructions.

var secondInstructionsAdvance = function(){

	currentview = new GambleExperiment();

};


var EndQuestions = function() {


	d3.select("#stim1")
		.append("div")
		.attr("id", "word")
		.style("text-align", "center")
		.style("font-size", "30px")
		.style("font-weight", "140")
		.style("margin", "20px")
		.text("Thank you for finishing Section 2. Please press 'submit' to advance.");

	if(musicCondition!=0){
		document.getElementById('brick').play();
	}

	document.getElementById('SubButton').onclick=endtrial;




};

var endtrial = function(){
	document.getElementById('music').pause();

	if(musicCondition==0){
		currentview = QuestionnaireNoMusic2();

	}else{
		currentview = Questionnaire();
	}


};

/****************
* Questionnaire *
****************/






var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('radio').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});

	};


	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

	$("#next").click(function () {
		record_responses();
		psiTurk.saveData();
		currentview = new Questionnaire2()
	});


};



var Questionnaire2 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('radio').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});

	};



	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire2.html');
	psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'begin'});


	$("#next").click(function () {
		record_responses();
		psiTurk.saveData();
		currentview = new Questionnaire3();

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


	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postQuestion3', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('radio').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});

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
		record_responses();
		psiTurk.saveData();
		psiTurk.saveData({
			success: function(){
					psiTurk.completeHIT(); // when finished saving compute bonus, the quit

			},
			error: prompt_resubmit});
	});


};


var QuestionnaireNoMusic2 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('radio').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});

	};



	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaireNoMusic2.html');
	psiTurk.recordTrialData({'phase':'postQuestion2', 'status':'begin'});


	$("#next").click(function () {
		record_responses();
		psiTurk.saveData();
		currentview = new QuestionnaireNoMusic3();

	});


};

var QuestionnaireNoMusic3 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	//d3.select("#Q3")
	//	.append("div")
	//	.attr("id","word2")
	//	.style("class","center")
	//	.style("col-md-8")
	//	.text("ExampleText");


	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postQuestion3', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('radio').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});

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
		record_responses();
		psiTurk.saveData();
		psiTurk.saveData({
			success: function(){
				psiTurk.completeHIT(); // when finished saving compute bonus, the quit

			},
			error: prompt_resubmit});
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
