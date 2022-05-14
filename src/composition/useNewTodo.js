import { ref } from 'vue';
import { generataId } from '../utils/todoStorage';

export default function useNewTodo(todosRef) {
  const newTodoRef = ref(''); // 新任务的标题
  const addTodo = () => {
    // 新增一个任务 如果有值，就去掉首尾空格
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return;
    }
    // 生成一个任务对象，将其加入到任务列表中
    const todo = {
      title: value,
      completed: false, //任务是否完成
      id: generataId(),
    };
    // 加入到任务列表当中
    todosRef.value.push(todo);
    newTodoRef.value = '';
  };
  return {
    newTodoRef,
    addTodo,
  }
}