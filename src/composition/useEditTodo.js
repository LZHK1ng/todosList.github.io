import { ref } from 'vue';
import { computed } from 'vue';

export default function useEditTodo(todosRef) {
  const editingTodoRef = ref(null); // 当前正在修改的是哪一个todo
  let originTitle = null; //缓存之前的title值
  const editTodo = (todo) => {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  };
  const doneEdit = (todo) => {
    editingTodoRef.value = null;
    const title = todo.title.trim(); // 去掉前后空格
    if (title) {
      todo.title = title;
    } else {
      // 删除
      todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    }
  };
  const cancelEdit = (todo) => {
    editingTodoRef.value = null;
    todo.title = originTitle;
  };
  const allDoneRef = computed({
    get() {
      return todosRef.value.filter((it) => !it.completed).length === 0;
    },
    set(checked) {
      return todosRef.value.forEach((todo) => {
        todo.completed= checked;
      })
    },
  })
  return {
    editingTodoRef,
    editTodo,
    doneEdit,
    cancelEdit,
    allDoneRef,
  }
};