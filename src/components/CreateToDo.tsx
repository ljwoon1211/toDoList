import { useForm } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {  categoryState, FormData, toDoState } from "../recoil/atoms/atoms"
import { Categories } from "../recoil/atoms/categories"

export default function CreateToDo(){
  const setToDos = useSetRecoilState(toDoState)
  const category = useRecoilValue<Categories>(categoryState)
  const {register, handleSubmit, setValue} = useForm<FormData>()
  const handleValid = ({toDo}:FormData) =>{
    console.log('add to do', toDo)
    setToDos((prev) => [{id:prev.length,text: toDo ,category},...prev])

    setValue("toDo","")
  }
  return (

    <form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register("toDo",{
          required:"Please write a toDo",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  )
}