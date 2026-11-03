const target_text = document.getElementById("target_text");
const user_text = document.getElementById("user_text");
const Next = document.getElementById("Next");
const reset = document.getElementById("reset");
const Minute = document.getElementById("M");
const Second = document.getElementById("S");
const MilliSecond = document.getElementById("Ms");


const ListText = [
  "M like the Moon that brightens my dark nights.",
  "O like an ocean, deep and full of mysteries.",
  "B like a beauty that takes my breath away.",
  "I like an inspiration that fills my life with passion.",
  "N like the notes of a sweet melody that linger in my heart.",
  "A like an angel who makes every moment magical for me."
];

let indexOf_ListText = 0;
let timerInterval = null;
let running = false;            
let lastStartTime = 0;         // وقتی تایمر آخرین بار استارت خورد (performance.now())
let elapsed = 0;               // مجموع میلی‌ثانیه‌ای که تا کنون سپری شده (حالت پایدار)
let allowNext = false;         // آیا رفتن به next مجاز است؟

target_text.textContent = ListText[indexOf_ListText];


function updateDisplay() {
  const total = elapsed + (running ? (performance.now() - lastStartTime) : 0);
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const centiseconds = Math.floor((total % 1000) / 10);

  Minute.textContent = String(minutes).padStart(2, "0");
  Second.textContent = String(seconds).padStart(2, "0");
  MilliSecond.textContent = String(centiseconds).padStart(2, "0");
}

function startTimer() {
  if (running) return;
  running = true;
  lastStartTime = performance.now();
  timerInterval = setInterval(updateDisplay, 10);
}


function stopTimer() {
  if (!running) return;
  elapsed += performance.now() - lastStartTime;
  clearInterval(timerInterval);
  timerInterval = null;
  running = false;
  updateDisplay(); 
}


function resetAll() {
  clearInterval(timerInterval);
  timerInterval = null;
  running = false;
  lastStartTime = 0;
  elapsed = 0;
  allowNext = false;
  indexOf_ListText = 0;
  target_text.textContent = ListText[indexOf_ListText];
  user_text.value = "";
  updateDisplay();
}

user_text.addEventListener("input", () => {
  if (!running) startTimer();
  
  if (user_text.value === target_text.textContent) {
    stopTimer();
    allowNext = true;
  }
});

Next.addEventListener("click", () => {
  if (allowNext || Second.textContent === "00") {
    if (indexOf_ListText < ListText.length - 1) {
      indexOf_ListText++;
      target_text.textContent = ListText[indexOf_ListText];
      user_text.value = "";

      allowNext = false;
      updateDisplay();
    }
  }
});


reset.addEventListener("click", () => {
  resetAll();
});
updateDisplay();









// keyboard
const btnKeyboard = document.querySelectorAll(".btn-keyboard")



user_text.addEventListener("keydown",(btnTarget)=>{

  btnKeyboard.forEach(btn =>{    

    if(btnTarget.key === "Tab" && btn.dataset.nameBtn === btnTarget.code){
      btnTarget.preventDefault();
    }

    if(btn.dataset.nameBtn === btnTarget.code){
      btn.classList.add("hit")
      btn.addEventListener("animationend",()=>{
         btn.classList.remove("hit")
      })
    }

  })
})
// btn.addEventListener("click",(clickBtn)=>{
//   if(clickBtn.dataset.nameBtn === btnTarget.code){
//     user_text.value += btnTarget.code
//   }
// })




