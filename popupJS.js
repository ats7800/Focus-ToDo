let currentTaskText=""

if(localStorage.getItem("checkboxChecked")){
    checkboxChecked=JSON.parse(localStorage.getItem("checkboxChecked"))
    if(checkboxChecked==true){
        focusOn()
    }else if(checkboxChecked==false){
        focusOff()
    }
}else{
    checkboxChecked=false
}

if(localStorage.getItem("nextTasks")){
    nextTasks=JSON.parse(localStorage.getItem("nextTasks"))
    renderNextTasks(nextTasks)
}else{
nextTasks=[]
}

if(localStorage.getItem("doneTasksArr")){
    doneTasksArr=JSON.parse(localStorage.getItem("doneTasksArr"))
    renderDoneTasks(doneTasksArr)
}else{
    doneTasksArr=[]
}
greeings()

elemId(WDText)
elemId(delDoneTasks)
elemId(focusButton)
elemId(currentTask)
elemId(whenBlocking)
elemId(workDone)
elemId(title)
elemId(addTask)
elemId(addTaskText)
elemId(addTaskInput)
elemId(nextTasksDiv)
elemId(roundBall)
elemId(turnOffFocus)
elemId(currentlyShowing)
elemId(doneTasksList)
elemId(adTaskButton)
elemId(roundBall)

let n=nextTasks.length
let oneTime =true
let doneAnyJob

delDoneTasks.addEventListener("dblclick",function(){
    clearDoneTask()
    greeings()
})
addTaskText.addEventListener("click",function(){
    taskAdder()
})
adTaskButton.addEventListener("click", function(){
    parseValue()
})
roundBall.addEventListener("click", function(){
    if((checkboxChecked==false)){
        checkboxChecked=true
        turnFocusOn()
    }else if(checkboxChecked==true){
        alert("To turn the Focus mode Off Double Click on the Title Button")
    }
})

turnOffFocus.addEventListener("dblclick", function(){
    if(checkboxChecked==true){
        checkboxChecked=false
        turnFocusOff()
    }
})

// to turn off focus mode
function turnFocusOff() {
    focusOff()
    localStorage.setItem("checkboxChecked",checkboxChecked)
    if(n>0){
        if(currentTaskText!=""){
            doneTasksArr.unshift(currentTaskText)
        }
        localStorage.setItem("doneTasksArr",JSON.stringify(doneTasksArr))
        oneTime=true
    }else if(n==0&&oneTime==true){
        if(currentTaskText!=""){
            doneTasksArr.unshift(currentTaskText)
        }
        localStorage.setItem("doneTasksArr",JSON.stringify(doneTasksArr))
        oneTime=false
    }
    renderDoneTasks(doneTasksArr)
    greeings()
}

// to turn on focus mode
function turnFocusOn() {
    focusOn()
    localStorage.setItem("checkboxChecked",checkboxChecked)
    fetchNextTask()
}

// focus mode off template
function focusOff(){   
currentTask.style.display="none"
whenBlocking.style.display="none"
workDone.style.display="block"
title.style.display="block"
roundBall.style.transform="translateX(0px)"
document.getElementById("sliderOut").style.backgroundColor="#ccc"

}

// focus mode on template
function focusOn(){
    workDone.style.display="none"
    currentTask.style.display="block"
    whenBlocking.style.display="block"
    title.style.display="none"
    roundBall.style.transform="translateX(26px)"
    document.getElementById("sliderOut").style.backgroundColor="#2196F3"
}

// adding task in nex tasks
function taskAdder(){
    addTaskText.style.visibility="hidden"
    addTaskInput.style.visibility="visible"
    adTaskButton.style.visibility="visible"
    addTaskInput.focus()
}

function parseValue() {
    addTaskText.style.visibility="visible"
    addTaskInput.style.visibility="hidden"
    adTaskButton.style.visibility="hidden"
    if(addTaskInput.value==""){
    }else{
        nextTasks.push(addTaskInput.value)
        oneTime =true
        addTaskInput.value=""
        renderNextTasks(nextTasks)
        n=nextTasks.length
    }
    localStorage.setItem("nextTasks",JSON.stringify(nextTasks))
}

// this renders all done tasks
function renderDoneTasks(arr){
    if(doneTasksList==""){
        doneTasksList.innerHTML+=`
        <li  id="doneTasksItems" style="font-size: 12px; color:grey;">
            Your Tasks go here
        </li>
        `
    }else{
        doneTasksList.innerHTML=' '
        arr.forEach(task => {
            doneTasksList.innerHTML+=`
            <li  id="doneTasksItems">
                ${task}
            </li>
            `
        });
    }
    if(arr.length!=0){
        delDoneTasks.style.display="block"
    }
}
// to clear done task
function clearDoneTask() {
    doneTasksArr=[]
    renderDoneTasks(doneTasksArr)
    localStorage.setItem("doneTasksArr",JSON.stringify(doneTasksArr))
    delDoneTasks.style.display="none"
}

// this renders all next tasks
function renderNextTasks(arr){
    nextTasksDiv.innerHTML=' '
    arr.forEach(task => {
        nextTasksDiv.innerHTML+=`
        <li class="nextTasks" id="nextTasksItems">
            ${task}
        </li>
        `
    });
}

// to get new task on the title dock
function fetchNextTask(){
    if(localStorage.getItem("nextTasks")){
        if(nextTasks.length){
            currentTaskText=nextTasks.shift()
            n=nextTasks.length
            localStorage.setItem("nextTasks",JSON.stringify(nextTasks))
            localStorage.setItem("currentTaskText",JSON.stringify(currentTaskText))
            currentlyShowing.textContent=currentTaskText
            renderNextTasks(nextTasks)
        }
    }else{
        currentlyShowing.textContent="Focus On"
    }
}

// to change greating text
function greeings() {
    if (doneTasksArr.length==0) {
        WDText.textContent=`
        Hey! How'bout You add some tasks and Finish some huh?
        `
    }else{
        WDText.textContent=`
        Yay! You have Finished Tasks before...
        Lets Do More.
        `
    }
}

// to get element by id and create the same js element
function elemId(id){
    id=document.getElementById(id)
}