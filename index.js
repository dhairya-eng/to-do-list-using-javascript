
//selectors
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');
const filteroption=document.querySelector('.filter-todo');

//eventlistener

todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click',deletecheck);
filteroption.addEventListener('click',filtertodo);


//function

function addtodo(event){
    event.preventDefault();
   //todo div
   const tododiv= document.createElement("div");
   tododiv.classList.add("todo");
   //li
   const newtodo= document.createElement("li");
   newtodo.innerText=todoInput.value;
   newtodo.classList.add('todo-item');
   tododiv.appendChild(newtodo);
   //localstorage
    saveLocaltodos(todoInput.value);
   //button
   const completebutton=document.createElement('button');
   completebutton.innerHTML='<i class="fas fa-check"></i>';
   completebutton.classList.add("complete-btn");
   tododiv.appendChild(completebutton);
   //delete
   const trashbutton=document.createElement('button');
   trashbutton.innerHTML='<i class="fas fa-trash"></i>';
   trashbutton.classList.add("trash-btn");
   tododiv.appendChild(trashbutton);
   //append  to list
   todoList.appendChild(tododiv);
   //clear todo input value
   todoInput.value="";
}

function deletecheck(e){
  const item = e.target;
  //delete todo
  if(item.classList[0]==="trash-btn"){
   const todo= item.parentElement;
   //animation
   todo.classList.add("fall");
   todo.addEventListener('transitionend',function(){
    todo.remove();
   });
   
  }
  //check mark
  if(item.classList[0]==="complete-btn"){
      const todo= item.parentElement;
      todo.classList.toggle("completed");
  }

}


function filtertodo(e){
  const todos=todoList.childNodes;
  todos.forEach(function(todo){
      switch(e.target.value){
          case "all":
              todo.style.display="flex";
              break;
           case "completed":
               if(todo.classList.contains('completed')){
                   todo.style.display="flex";
               }else{
                   todo.style.display="none";
               }  
         case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }   

      }
  });
}

//local storage function
function saveLocaltodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
