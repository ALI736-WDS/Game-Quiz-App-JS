const formatData = (questionData) => {
  // console.log("questionData Asli", questionData);
  const results = questionData.map((item) => {
    const questionObject = { question: item.question }; //surat soal
    const answers = [...item.incorrect_answers]; //spread operator ke 3ta javab ro az array begire
    const correctAnswerIndex = Math.floor(Math.random() * 4); //random kardan index javab asli
    answers.splice(correctAnswerIndex, 0, item.correct_answer); //az correctAnswerIndex shoru kon, 0 hich hazf nakon, in javab sahih
    // console.log(answers, correctAnswerIndex); //...ro gharar bede, baghie javabha besurate khodkar jayegozari mishan
    questionObject.answers = answers; //ezafe kardane answer be obj be obj sakhte shode
    questionObject.correctAnswerIndex = correctAnswerIndex; //ezafe kardane correctAnswerIndex be obj sakhte shode

    return questionObject;
  });

  return results;
};

export default formatData;
