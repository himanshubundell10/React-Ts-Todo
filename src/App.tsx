import { AppBar, Container, Toolbar,Typography,Stack, TextField,Button} from "@mui/material"
import TodoItem from "./components/TodoItem"
import { useEffect, useState } from "react"
import { getTodo, saveTodos } from "./utils/features"

function App() {

  const [todo,setTodo] = useState<TodoItemType[]>(getTodo())

  const[title,setTitle]=useState<TodoItemType["title"]>("")

  const deleteHandler = (id:TodoItemType["id"]):void=>{
    const newTodos:TodoItemType[]=todo.filter(i=>i.id!==id
    )
     setTodo(newTodos);
     

  }

  const updataHandler = (id:TodoItemType["id"]):void=>{

   const newTodos:TodoItemType[]=todo.map((i)=>{
    if(i.id===id) i.isCompleted=!i.isCompleted
    return i
   })
   setTodo(newTodos);
   
    
  }

 
 
  const submitHandler=():void=>{
    const newTodo:TodoItemType={
      title,
      isCompleted:false,
      id:String(Math.random()*1000)
    }

    setTodo(prev=>([...prev,newTodo]))
    setTitle("")
    
  }
 
  const editHandler=(id:TodoItemType["id"],newTitle:TodoItemType["title"]):void=>{
    const newTodos=todo.map((i)=>{
      if(i.id===id) i.title=newTitle;
      return i
    })
     setTodo(newTodos)
    
  }


  useEffect(() => {
    saveTodos(todo)
  }, [todo])
  
  return (
    <Container  maxWidth="sm" sx={{height:"100vh"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography >
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
     <Stack overflow={"auto"}  height={"70%"} direction={"column"} spacing={"1rem"} p={"1rem"} >
     {todo.map((i)=>(
        <TodoItem deleteHandler={deleteHandler} updateHandler={updataHandler} editHandler={editHandler}  key={i.id} todo={i} />
      ))}
     </Stack>
  
     <TextField onKeyDown={(e)=>title!=="" &&(e.key==="Enter"&&submitHandler())} value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth label={"New Task"}/>
     <Button  sx={{
      margin:"1rem 0"
     }} fullWidth variant="contained" onClick={submitHandler} disabled={title===""}>Add</Button>
    
    
    </Container>
     
  )
}

export default App
