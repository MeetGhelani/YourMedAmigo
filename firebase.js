
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSetting = {
    databaseURL : "https://notes-88bf3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const Tasks = ref(database, "Meds")


const input = document.getElementById("input");
const btn = document.getElementById("add");

const cont = document.getElementById("tasks");

btn.addEventListener("click", addTask);

onValue(Tasks, function(obj){
    clear();

    if(obj.exists()){
        let arr = Object.entries(obj.val());

        for(let i = 0; i<arr.length; i++){
            let currentTask = arr[i];
            let ID = currentTask[0];
            let Value = currentTask[1];
            displayItems(arr[i]);
        }
    }else{
        cont.innerHTML = "No Tasks Left, Add New Tasks"
    }
})

function clear(){
    cont.innerHTML = "";
}

function addTask(){
    push(Tasks, input.value);
    alert("Added To Database!")
    input.value = "";
}

function displayItems(item){

    let task_id = item[0];
    let task_value = item[1];

    let li = document.createElement("li");
    li.textContent = `${task_value}`;
    cont.appendChild(li);

    li.addEventListener("click", function(){
        let exactLocation = ref(database, `Tasks/${task_id}`);
        remove(exactLocation);
        console.log("Removed")
    })

}
