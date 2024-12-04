import { useRecoilValue, useSetRecoilState } from "recoil";
import {  categoryState, ToDoFormData, toDoState } from "../recoil/atoms/atoms";
import { Categories, categoriesState } from "../recoil/atoms/categories";

export default function ToDo({text,category,id}:ToDoFormData){
  const setToDos=useSetRecoilState(toDoState)

  const currentCategory = useRecoilValue(categoryState)
  const categories = useRecoilValue(categoriesState)


  const onClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
    const {currentTarget:{name}} = event
    console.log('onClick')
    setToDos((prev)=> {
      const targetIndex = prev.findIndex(toDo => toDo.id === id)
      const newToDo = { text, id, category: name as any };

      return [...prev.slice(0,targetIndex), newToDo,...prev.slice(targetIndex+1) ];
    })
  }
   return(
    <li>
      <span>{text}</span>
      {categories
        .filter((cat) => cat !== category) 
        .map((cat) => (                    
        <button key={cat} name={cat} onClick={onClick}>
          {cat}
        </button>
      ))}
      {/* { category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button> }
      { category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button> }
      { category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button> } */}
    </li>
   )
  
}