
import { useSelector } from "react-redux";
import {create, createStore} from "zustand"



export const useFormEventStore = create((set) => ({
  data: {
    level: [],
    usePass: false,
    password: "",
    courses: []
  },
  setData: (newData) => set((state) => ({
    data: {
      ...state.data,
      ...newData,
    },
  })),
}));
