import { ref, watchEffect } from "vue";
import * as todoStorage from "../utils/todoStorage";

export default function useTodoList() {
  const todosRef = ref(todoStorage.fetch());
  window.todosRef = todosRef; // 测试
  // 是一个函数，参数里面再传一个函数,这个函数里面用到响应式数据，说明我这个函数用来响应数据
  watchEffect(() => {
    todoStorage.save(todosRef.value);
  });
  return {
    todosRef,
  };
}

