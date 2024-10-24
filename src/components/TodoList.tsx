import { Todo } from "@prisma/client"

export default function TodoList({ todos = [] }: { todos: Todo[] }) {
  console.log("todos", todos)
  return (
    <div>
      <div>todo list</div>
    </div>
  )
}
