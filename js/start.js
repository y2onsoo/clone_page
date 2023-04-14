const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPonit = 12;
const select = [];

function calResult(){
  var pointArray = [
    { name: 'mouse', value:0, key:0},
    { name: 'cow', value:0, key:1},
    { name: 'tiger', value:0, key:2},
    { name: 'rabbit', value:0, key:3},
    { name: 'dragon', value:0, key:4},
    { name: 'snake', value:0, key:5},
    { name: 'horse', value:0, key:6},
    { name: 'sheep', value:0, key:7},
    { name: 'monkey', value:0, key:8},
    { name: 'chick', value:0, key:9},
    { name: 'dog', value:0, key:10},
    { name: 'pig', value:0, key:11},
  ]

  for(let i = 0; i <endPonit.length; i++){
    var target = qnaList[i].a[select[i]];
    for(let j =0; j<target.length; j++){
      for(let k=0; k<pointArray.length; k++){
        if(target.type[j] === pointArray[k].name){
          pointArray[k].value += 1;
        }
      }
    }
  }
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(()=>{
      qna.style.display = "none";
      result.style.display = "block";
  },450)})

  console.log(select)
}

function addAnswer(answerText, qIndx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  a.appendChild(answer);        //answer(button)이 a(.answerBox)에 소속될수있도록 만듦
  answer.innerHTML = answerText;
  // 다음질문으로 넘어가게 addEventListener사용,3개버튼중 아무거나 클릭했을 때 버튼3개 다 사라짐
  answer.addEventListener("click",function(){
    var children = document.querySelectorAll('.answerList');
    for(let i =0; i < children.length; i++){
      children[i].disabled =true;   //버튼비활성화
      children[i].style.WebkitAnimation = "fadeOut 0.5s"
      children[i].style.animation = "fadeOut 0.5s"
    }
    setTimeout(()=>{
      select[qIndx] = idx;    //몇번째 질문에서 몇번째 버튼을 클릭했는지 알수있음
      for(let i =0; i < children.length; i++){
        children[i].style.display = 'none';
      }
        goNext(++qIndx);
    },450)
  },false)
}

function goNext(qIndx){
  if(qIndx+1 === endPonit){
    goResult();
    return;
  }
  var q =document.querySelector('.qBox');
  q.innerHTML = qnaList[qIndx].q;    //인덱스를 변수로만들고 호출해줘야된다(qIndx)
  // answerBox는 버튼으로 만들어서 호출하니깐 반복문으로 만들어주는것임
  for( let i in qnaList[qIndx].a){
    addAnswer( qnaList[qIndx].a[i].answer, qIndx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPonit) * (qIndx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(()=>{
      main.style.display = "none";
      qna.style.display = "block";
  },450)
  let qIndx = 0;
  goNext(qIndx);
  },450);
}