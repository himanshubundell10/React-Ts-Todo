import { Delete, Edit } from "@mui/icons-material"
import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

type PropsType={
    todo:TodoItemType
    deleteHandler:(id:TodoItemType["id"])=>void
    updateHandler:(id:TodoItemType["id"])=>void
    editHandler:(id:TodoItemType["id"],newTitle:TodoItemType["title"])=>void
    

}

const TodoItem = ({todo,deleteHandler,updateHandler,editHandler}:PropsType) => {
    const[editActive,setEditActive]=useState<boolean>(false);

    const[textVal,setTextVal]= useState<string>(todo.title)

  return (
   <Paper sx={{
    padding:"1rem",
    
   }}  >


<Stack  direction={"row"} alignItems={"center"}>
    {editActive?<TextField  onKeyDown={(e)=>todo.title!=="" &&(e.key==="Enter"&&(editHandler(todo.id,textVal), setEditActive(false)))}  value={textVal}  onChange={(e)=>setTextVal(e.target.value)}/> : <Typography marginRight={"auto"}>
        {todo.title}
    </Typography>}
   
    <Checkbox checked={todo.isCompleted} onChange={()=>updateHandler(todo.id)}/>
    <Button onClick={()=>setEditActive(prev=>!prev)}><Edit/></Button>
    <Button onClick={()=>deleteHandler(todo.id)} color="warning"><Delete/></Button>
    </Stack>

    
   </Paper>
  )
}

export default TodoItem
