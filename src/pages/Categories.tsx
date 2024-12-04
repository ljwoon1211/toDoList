import { useRecoilValue, useSetRecoilState } from "recoil"
import { categoriesState } from "../recoil/atoms/categories"
import { useState } from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`

export default function Categories(){
  const [addCategory, setAddCategory] = useState('');
  const [isEditMode, setIsEditMode]=useState<boolean>(false)
  const [updateCategoryId, setUpdateCategoryId]=useState<string | null>(null)
  const [updateCategory, setUpdateCategory]=useState<string>('')
  const categories = useRecoilValue(categoriesState)
  const setCategories = useSetRecoilState(categoriesState)

  const handlerAddCategory = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setAddCategory(e.target.value)
  }

  const handleAddClick = () =>{
    setCategories(prev=> [...prev,addCategory])
  }

  const handleEditClick = (category:string) =>{
    setIsEditMode(true)
    setUpdateCategoryId(category)
    setUpdateCategory(category);
  }

  const handleUpdateClick = ()=>{
    setCategories((categories) => {
      const updatedCategories = categories.map((category) =>
        category === updateCategoryId ? updateCategory : category
      );
        return updatedCategories;
    });
    resetState()
  }

  const handleDelClick = (category:string)=>{
    const deletedCategories = categories.filter((prevCategory)=> prevCategory!==category)
    setCategories(deletedCategories)
  }

  const handleCancelClick = (category:string) =>{
    resetState()
  }

  const resetState =()=>{
    setIsEditMode(false);
    setUpdateCategoryId(null);
    setUpdateCategory("");
  }
  return (
    <>
    <Header>
      <h2>Edit Category</h2>
      <Link to={"/"}> Home </Link>
    </Header>
    <hr/>
    <input 
      onChange={handlerAddCategory}
      value={addCategory}
      placeholder="Add category"/>
    <button onClick={handleAddClick}>Add</button>
    <ul>
      {categories.map((category)=>
        <li key={category}>
          {(isEditMode && category === updateCategoryId) ? 
            <div>
              <input onChange={(e)=>setUpdateCategory(e.target.value)}  value={updateCategory} /> 
              <button onClick={()=> handleUpdateClick()}>Update</button>
              <button onClick={()=> handleCancelClick(category)}>Cancel</button>
            </div>
            :
            <div>
              <span>{category}</span>
              <button onClick={()=> handleEditClick(category)}>Edit</button>
              <button onClick={() => handleDelClick(category)}>Delete</button>
            </div>
          }

        </li>
      )}
    </ul>
    </>
  )
}