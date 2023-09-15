const inputBox=document.getElementById("input-box");
const listContainer=document.querySelector("#list-container");
const loggedUser = document.querySelector("#loggedUser");
const datePlaceHolder = document.querySelector(".datePlaceHolder");

loggedUser.textContent = "Welcome "+ localStorage.getItem("loggedUser") + "!";

function addTask() {
    if (inputBox.value == '') {
        alert("Task must not be empty");
    } else {
        let li = document.createElement("li");
        li.classList.add("list-photo");
        
        let content = document.createElement("span");
        content.className = "text-content";
        content.textContent = inputBox.value; 
        
        let dateSpan = document.createElement("span"); 
        dateSpan.className = "date-content";
        dateSpan.textContent = datePlaceHolder.value; 
        
        li.appendChild(content);
        li.appendChild(dateSpan); 
        
        listContainer.appendChild(li);

        let spanEdit = document.createElement("span");
        spanEdit.innerHTML = "\u270E";
        spanEdit.classList = ["edit"];
        li.appendChild(spanEdit);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.className = "remove";
        li.appendChild(span);
    }
    
    inputBox.value = '';
    datePlaceHolder.value = ''; 
    saveData();
}



listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI" || (e.target.tagName == "SPAN" && e.target.className == "text-content") ){
        e.target.classList.toggle("checked"); 
        saveData();
    }
    else if(e.target.tagName==="SPAN" && e.target.className == "remove"){
        e.target.parentElement.remove(); 
        saveData();
    }
    else if(e.target.tagName==="SPAN" && e.target.className == "edit"){
        var listItem = e.target.parentElement;
        var listItemText = listItem.querySelector(".text-content");
        listItemText.contentEditable = true;
        listItemText.focus();

        listItemText.addEventListener("blur", function () {
            listItemText.contentEditable = false;
            saveData();
        });
    }
}, false);
 
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}

function sortTasks() {
    const dataString = localStorage.getItem('data');
    if (!dataString) return;

    const listItemPattern = /<li.*?>.*?<\/li>/g;
    const listItems = dataString.match(listItemPattern);

    if (!listItems) return;

    const parsedItems = listItems.map(item => {
        const match = item.match(/<span class="text-content">(.*?)<\/span><span class="date-content">(.*?)<\/span>/);
        if (match) return { item, text: match[1], date: match[2] };
    }).filter(item => item);

    parsedItems.sort((a, b) => new Date(a.date) - new Date(b.date));

    const sortedHTML = parsedItems.map(item => item.item).join('');
    localStorage.setItem('data', sortedHTML);

    showTask();

    // console.log('List items sorted and stored in localStorage.');
}

showTask();

function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const taskItems = document.querySelectorAll("#list-container li");

    taskItems.forEach(item => {
        const taskText = item.querySelector(".text-content").textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            item.style.display = "block"; 
        } else {
            item.style.display = "none"; 
        }
    });
}
const searchInput =document.getElementById("searchbar"); 
searchInput.addEventListener("keyup", searchTasks);