export type TodoItem = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type FavouriteTodoItem = TodoItem & {
  favourite: boolean
}
