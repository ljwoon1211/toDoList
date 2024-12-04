
import { useRecoilState, useRecoilValue,  } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../recoil/atoms/atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Link } from "react-router-dom";
import { Categories, categoriesState } from "../recoil/atoms/categories";

export default function ToDoList(){
  // const toDos = useRecoilValue(toDoState)
  // console.log(toDos)
  const toDos = useRecoilValue(toDoSelector)
  const [category, setCategory] = useRecoilState(categoryState)
  const categories = useRecoilValue(categoriesState)


  const onInput = (event : React.FormEvent<HTMLSelectElement>)=> {
    setCategory(event.currentTarget.value as any)
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr/>
      <select value= {category} onInput={onInput}>
        {categories.map(category => 
          <option key={category} value={category}>{category}</option>
        )}
      </select>

      <Link to={"/categories"}> Edit Category </Link>

      <CreateToDo />
      {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}
      {/* <h2>To Do</h2>
      <ul>
        {toDo.map(toDo =>(
          <ToDo key={toDo.id} {...toDo}/>
        ))}
      </ul>
      <hr/>
      <h2>Doing</h2>
      <ul>
        {doing.map(doing =>(
          <ToDo key={doing.id} {...doing}/>
        ))}
      </ul>
      <hr/>   
      <h2>Done</h2>
      <ul>
        {done.map(done =>(
          <ToDo key={done.id} {...done}/>
        ))}
      </ul>
      <hr/> */}
    </div>
  )
}

// interface FormData {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
//   extraError?:string;
// }


// export default function ToDoList(){
//   const {register, watch, handleSubmit, formState:{errors}, setError} = useForm<FormData>({
//     defaultValues:{
//       email:"@naver.com"
//     }
//   })
//   const onValid = (data:FormData)=>{
//     console.log(data)
//     // handleSubmit submit 이벤트가 일어났을 시 값을 객체로 보여준다.
//     if(data.password !== data.password1){
//       setError("password1",
//         {message: "Password are not the same"},
//         {shouldFocus: true}
//       )
//     }
//     setError("extraError",{message: "Server offline"})
//   }
//   console.log(errors) 
//   // 에러 종류 보여줌
//   console.log(register("email"))
//   // register는 input에 일어나는 이벤트 onChange, onClick, onBlur 등을 보여줌
//   console.log(watch())
//   // watch form안에 변하는 값을 보여줌

//   return (
//     <div>
//       <form 
//         style={{display:"flex", flexDirection:"column",}}
//       onSubmit={handleSubmit(onValid)}>
//         {/* html내부에 required : true 를 안하는 이유. 오래된 브라우저나 개발자창에서 해킹가능 */}
//         <input {...register("email", {
//           required:"Email is required",
//           pattern:{
//             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//             message: "Only naver.com emails allowed",
//           },
//         })} placeholder="Email" />
//         <span>
//           {errors?.email?.message}
//         </span>
//         <input {...register("firstName", {required:"write here", minLength:10})} placeholder="First Name" />
//         <span>
//           {errors?.firstName?.message}
//         </span>
//         <input {...register("lastName", {
//           required:"write here", 
//           minLength:5,
//           validate:(value)=> !value.includes('e')})} 
//           placeholder="Last Name" />
//         <span>
//           {errors?.lastName?.message}
//         </span>
//         <input {...register("username", {required:"write here", minLength:5})} placeholder="Username" />
//         <span>
//           {errors?.username?.message}
//         </span>
//         <input {...register("password", {required:"write here"})} placeholder="Password" />
//         <span>
//           {errors?.password?.message}
//         </span>
//         <input {...register("password1", {
//               required:"Password is required",
//               minLength:{
//                 value:5,
//                 message:"Your password is too short"
//               },
//         })} type="password"
//         placeholder="Password1" />
//         <span>
//           {errors?.password1?.message}
//         </span>
//         <button>Add</button>
//         <span>
//           {errors?.extraError?.message}
//         </span>
//       </form>
//     </div>
//   )
// }