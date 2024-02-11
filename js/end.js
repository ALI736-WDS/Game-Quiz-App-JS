const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //agar chizi zakhire nadashtim mesle dafe aval, array[khali] mizarim

const scoreEle = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

scoreEle.innerText = score;

saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid Username or Score");
  } else {
    const finalScore = { name: input.value, score }; //score: score
    highScores.push(finalScore);
    // console.log(finalScore)
    //sort baraye numbers
    // highScores.sort(a, (b) => a - b); //number haro az kuchik be bozorg michine
    // highScores.sort(a, (b) => b - a); //number haro az bozorg be kuchik michine
    highScores.sort(a, (b) => b.score - a.score); //baraye obj migim a.score, score name obj hast, va dar array localStorage ham b-a mishe
    highScores.splice(10); //10ta ro neshun bede

    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("scores");
    window.location.assign("/"); //ferestande karbar be safhe asli
  }
};

button.addEventListener("click", saveHandler);
