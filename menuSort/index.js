"use strict";
const beforeTag = document.querySelector(".beforeText");
const afterTag = document.querySelector(".afterText");
const submitButton = document.querySelector(".submit");
let byte; // 92 : puse pos
let byteCount = 0;
let puseFlag;
let check_num = /[0-9]/; // 숫자
let check_eng = /[a-zA-Z]/; // 문자
let check_spc = /[~@#$%^&*_+<>]/; // 특수문자
let check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
let check_spe = ["[", "]", ".", ",", "(", ")", "{", "}", ":", "?", "!", "|"]; // 인식 안되는 것
submitButton.addEventListener("click", () => {
  afterTag.value = "";
  if (!byte) {
    alert("해당하는 포스를 클릭해주세요");
    return;
  }
  let sortCondidate = beforeTag.value.split("\n");
  sortCondidate.forEach((text) => {
    const afterText = menuSort(text);
    if (!afterTag.value) {
      afterTag.value += afterText;
    } else {
      afterTag.value += `\n${afterText}`;
    }
  });
});

function menuSort(text) {
  let condidate = text.split("");
  let sortArray = [];
  let flag = false;
  condidate.forEach((n) => {
    byteCheck(n);
    if (puseFlag && Math.floor(byteCount) > byte && flag === false) {
      sortArray = [];
      sortArray.push(n);
      flag = true;
    } else if (!puseFlag && Math.floor(byteCount) > byte) {
      return;
    }
    {
      sortArray.push(n);
    }
  });
  console.log(byteCount);
  console.log(count_kr, count_eng, count_num, count_spc, count_spe, count_emt);
  count_kr = 0;
  count_eng = 0;
  count_num = 0;
  count_spc = 0;
  count_spe = 0;
  count_emt = 0;
  byteCount = 0;
  return sortArray.join("");
}
let count_kr = 0;
let count_eng = 0;
let count_num = 0;
let count_spc = 0;
let count_spe = 0;
let count_emt = 0;
function byteCheck(text) {
  if (check_eng.test(text)) {
    byteCount += 2;
    count_eng++;
  } else if (check_kor.test(text)) {
    byteCount += 4;
    count_kr++;
  } else if (check_num.test(text)) {
    byteCount += 2;
    count_num++;
  } else if (check_spc.test(text)) {
    byteCount += 4;
    count_spc++;
  } else if (check_spe.includes(text)) {
    byteCount += 2;
    count_spe++;
  } else if (text === " ") {
    byteCount += 4;
    count_emt++;
  } else {
    console.log("nope");
  }
}

document.querySelector(".pusePos").addEventListener("click", () => {
  byte = 92;
  puseFlag = true;
});
document.querySelector(".oldBaemin").addEventListener("click", () => {
  byte = 60;
  console.log(
    "count_eng 2, count_kor 4, count_num 2, count_spc 4, count_spe 2, count_emt 4"
  );
});
