"use strict";
const beforeTag = document.querySelector(".beforeText");
const afterTag = document.querySelector(".afterText");
const submitButton = document.querySelector(".submit");
const byte = 35;
let byteCount = 0;
let check_num = /[0-9]/; // 숫자
let check_eng = /[a-zA-Z]/; // 문자
let check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
let check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

submitButton.addEventListener("click", () => {
  afterTag.value = "";
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
  condidate.forEach((n) => {
    byteCheck(n);
    if (byteCount > byte) {
      return;
    } else {
      sortArray.push(n);
    }
  });
  byteCount = 0;
  return sortArray.join("");
}
function byteCheck(text) {
  if (check_eng.test(text)) {
    byteCount += 2;
  }
  if (check_kor.test(text)) {
    byteCount += 4;
  }
  if (check_num.test(text)) {
    byteCount += 2;
  }
  if (check_spc.test(text)) {
    byteCount += 4;
  }
  if (text === " ") {
    byteCount += 1;
  }
}
