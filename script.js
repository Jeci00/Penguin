function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default 
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


//---------------------------------------------------------------------------------

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

  function showQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

      // first reset the list of answers
      answers = [];

      // for each available answer to this question...
      for (letter in questions[i].answers) {

        // ...add an html radio button
        answers.push(
          '<label>'
          + '<input type="radio" name="question' + i + '" value="' + letter + '">'
          + letter + ': '
          + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  showQuestions(questions, quizContainer);

  function showResults(questions, quizContainer, resultsContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      // switch for Correct child
      opo = 0;
      if (userAnswer == 'a'){
        opo = 0;
      }
      else if (userAnswer == 'b'){
        opo = 1;
      }
      else if (userAnswer == 'c'){
        opo = 2;
      }
      else{
       opo = 3;
      }

      // if answer is correct
      if (userAnswer === questions[i].correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green

        answerContainers[i].children[opo].style.color = 'lightgreen';

        //console.log(userAnswer,answerContainers)

      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[i].children[opo].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // on submit, show results
  submitButton.onclick = function() {
    showResults(questions, quizContainer, resultsContainer);
  }

  // show the questions
  showQuestions(questions, quizContainer);

  // when user clicks submit, show results
  submitButton.onclick = function() {
    showResults(questions, quizContainer, resultsContainer);
  }
}


var myQuestions = [
  {
    question: "How rare are north Atlantic lobsters that are born bright blue?",
    answers: {
      a: '1 in 1,000',
      b: '1 in 5,000',
      c: '1 in 10,000',
      d: 'there are no bright blue lobsters'
    },
    correctAnswer: 'b'
  },
  {
    question: "How many human body parts are there with only 3 letters?",
    answers: {
      a: '3',
      b: '5',
      c: '10',
      d: 'i don\'t know'
    },
    correctAnswer: 'c'
  },
  {
    question: "What percentage of atoms in your body are replaced every year?",
    answers: {
      a: '25',
      b: '50',
      c: '78',
      d: '98'
    },
    correctAnswer: 'd'
  },
  {
    question: "Which mammal can\'t jump?",
    answers: {
      a: 'Sloth',
      b: 'European Glass Lizard',
      c: 'Elephant',
      d: 'i don\'t know'
    },
    correctAnswer: 'c'
  },
  {
    question: "When is World Tourist day",
    answers: {
      a: 'September 27.',
      b: 'January 11',
      c: 'January 22',
      d: 'March 18'
    },
    correctAnswer: 'a'
  }
];

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);



//---------------------------------------------------------------------------------

/*var in1 = document.getElementById('in1');
var btn1 = document.getElementById('btn1');
var ul1 = document.getElementById('ul1');

function inputLength() {
  return input.value.length;
}

function deleteElementAfterClick (event) {
  event.currentTarget.parentElement;
}

function createListElement() {
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul1.appendChild(li);
  in1.value = '';
}

function addListAfterClick (event) {
  if (inputLength() > 0 ) {
    createListElement();
  }
}

function addListAfterKeypress (event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

btn1.addEventListener("click", addListAfterClick);
in1.addEventListener("keypress", addListAfterKeypress);
*/

var in1 = document.getElementById('in1');
var btn1 = document.getElementById('btn1');
var ul1 = document.getElementById('ul1');

function inputLength() {
  return in1.value.length;
}

function createListElement() {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(in1.value));
  ul1.appendChild(li);
  in1.value = "";
  var button = document.createElement("button");
  button.innerHTML = 'Delete';
  li.appendChild(button);
  button.addEventListener('click',function(){
  this.parentNode.remove();
  });
  li.addEventListener('click',function(){
    li.classList.toggle('done');
  });
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

btn1.addEventListener("click", addListAfterClick);
in1.addEventListener("keypress", addListAfterKeypress);
