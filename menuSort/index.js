"use strict";
const beforeTag = document.querySelector(".beforeText");
const afterTag = document.querySelector(".afterText");
const submitButton = document.querySelector(".submit");
let byte; // 92 : puse pos
let byteCount = 0;
let puseFlag;
let check_num = /[0-9]/; // 숫자
let check_eng = /[a-zA-Z]/; // 문자
let check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
let check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
let check_spe = ["[", "]"]; // 인식 안되는 것
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
  byteCount = 0;
  return sortArray.join("");
}
function byteCheck(text) {
  if (check_eng.test(text)) {
    byteCount += 2;
  } else if (check_kor.test(text)) {
    byteCount += 4;
  } else if (check_num.test(text)) {
    byteCount += 2;
  } else if (check_spc.test(text)) {
    byteCount += 4;
  } else if (check_spe.includes(text)) {
    byteCount += 2;
  } else if (text === " ") {
    byteCount += 2;
  } else {
    console.log("nope");
  }
}

document.querySelector(".pusePos").addEventListener("click", () => {
  byte = 92;
  puseFlag = true;
});
document.querySelector(".oldBaemin").addEventListener("click", () => {
  byte = 58;
});
