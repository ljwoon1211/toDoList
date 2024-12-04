import { atom } from "recoil";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
}

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: loadFromLocalStorage("categoriesState", [Categories.TO_DO, Categories.DOING, Categories.DONE]),
  effects: [
    ({ onSet }) => {
      onSet((category) => {
        saveToLocalStorage("categoriesState", category); // 상태 변경 시 로컬스토리지에 저장
      });
    },
  ],
})


