// 日付表示
document.getElementById("date").textContent =
new Date().toLocaleDateString("ja-JP",{weekday:"long",year:"numeric",month:"long",day:"numeric"});


// ================= GOAL =================
const goalDisplay=document.getElementById("goalDisplay");
const goalInput=document.getElementById("goalInput");

function saveGoal(){
localStorage.setItem("goal",goalInput.value);
loadGoal();
}

function loadGoal(){
goalDisplay.textContent=localStorage.getItem("goal")||"未設定";
}
loadGoal();


// ================= TODO =================
const list=document.getElementById("todoList");

function addTodo(){
const input=document.getElementById("todoInput");
if(!input.value)return;

const todos=JSON.parse(localStorage.getItem("todos")||"[]");
todos.push(input.value);
localStorage.setItem("todos",JSON.stringify(todos));
input.value="";
renderTodos();
}

function renderTodos(){
list.innerHTML="";
const todos=JSON.parse(localStorage.getItem("todos")||"[]");

todos.forEach((t,i)=>{
const li=document.createElement("li");
li.textContent=t;

li.onclick=()=>{
todos.splice(i,1);
localStorage.setItem("todos",JSON.stringify(todos));
renderTodos();
};

list.appendChild(li);
});
}
renderTodos();


// ================= MEMO =================
const memo=document.getElementById("memo");

function saveMemo(){
localStorage.setItem("memo",memo.value);
}

memo.value=localStorage.getItem("memo")||"";


// ================= TIMER =================
let time=1500;
let interval;

function updateTimer(){
const m=Math.floor(time/60);
const s=time%60;
document.getElementById("timer").textContent=
`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function startTimer(){
if(interval)return;
interval=setInterval(()=>{
time--;
updateTimer();
if(time<=0){
clearInterval(interval);
interval=null;
alert("終了！");
}
},1000);
}

function resetTimer(){
clearInterval(interval);
interval=null;
time=1500;
updateTimer();
}

updateTimer();


// ================= PWA =================
if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js");
}
