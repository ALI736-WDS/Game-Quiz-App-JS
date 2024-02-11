import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerText = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");
const error = document.getElementById("error");

// const baseURL = "https://opentdb.com";
// const endpoint = "/api.php";
// const query = "?amount=10&difficulty=easy&type=multiple";
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

const CORRECT_BONUS = 10; //emtiaz har javab dorost ke dar score miravad ba innerText
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

// ((func formatData dar module helper tarif shode ast, dar bala import shod))

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    // console.log(json);
    formattedData = formatData(json.results);
    // console.log("questionData Sakhte Shode", formattedData);
    start();
  } catch (errorr) {
    loader.style.display = "none";
    error.style.display = "block";
    
    // console.log(error);
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1; //index az 0 shoru mishe pas +1 mokonim ke shomare soal dorost beshe
  //destructor : mavarede zir ro az formattedData ba index [questionIndex] migirim, yani mavarede har soal ro migirim
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex]; //formattedData yek array be ma mide pas index soal ro ba [questionIndex] moshakhas mikonim
  // console.log(answers, answerText);
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerText.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  // console.log(index);
  if (!isAccepted) return; //agar false bud dige func ejra nemishe

  isAccepted = false; //agar true bud va ejra shod, bare bad false hast va ejra nemishe
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect"); //red shodane gozine ghalat
    answerText[correctAnswer].classList.add("correct"); //green shodane gozine sahih
  }
};

const nextHandler = () => {
  questionIndex++; //aval be meghdare questionIndex ezafe shavad ke error nade
  if (questionIndex < formattedData.length) {
    isAccepted = true; //baraye inke vaghti raft soal badi, betune javab entekhab kone
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerText.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerText.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index)); //chun bayad be checkAnswer(index) index ro bedim pas () dare va darja
  //...ejra mishe pas code kharab mishe, rahe hal: ya 2 func tarif konim(code zir #1) ya besurate arrow func tarif konim ke ruye har kodum
  //...click shod, index button ro bede
});
//#1
// answerText.forEach((button, index) => {
//   const handler = () => checkAnswer(index);
//   button.addEventListener("click", () => handler);
// });
