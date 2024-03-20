export const saveTodos=(todo:TodoItemType[]):void=>{
    localStorage.setItem("myTodos",JSON.stringify(todo))

}

export const getTodo=():TodoItemType[]=>{
    const todos=localStorage.getItem("myTodos");
  return  todos?JSON.parse(todos):[]
}