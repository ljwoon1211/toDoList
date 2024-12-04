import { atom, selector } from "recoil";
import { Categories } from "./categories";
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';



export interface FormData {
  toDo: string
}

export interface ToDoFormData {
  id: number,
  text: string,
  category: Categories,
}


export const isDarkAtom = atom({
  key: "isDark",
  default: false
})

export const toDoState = atom<ToDoFormData[]>({
  key: "toDo",
  default: loadFromLocalStorage("toDo", []),
  effects: [
    ({ onSet }) => {
      onSet((toDo) => {
        saveToLocalStorage("toDo", toDo); // 상태 변경 시 로컬스토리지에 저장
      });
    },
  ],
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // if (category === "TO_DO") return toDos.filter((todo) => todo.category === "TO_DO")
    // if (category === "DOING") return toDos.filter((todo) => todo.category === "DOING")
    // if (category === "DONE") return toDos.filter((todo) => todo.category === "DONE")
    return toDos.filter((toDo) => toDo.category === category)
  },
})

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
})