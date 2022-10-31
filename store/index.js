/*
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [
        { content: 'テスト', created: '2020-04-30 17:00', state: '作業前' },
        {
          content: 'コーディング',
          created: '2020-04-30 16:00',
          state: '作業中',
        },
        { content: '環境構築', created: '2020-04-30 15:30', state: '完了' },
      ],
    }),
  })
}

export default createStore
*/

export const state = () => ({
  todos: [
    { content: 'テスト', created: '2020-04-30 17:00', status: 0 },
    {
      content: 'コーディング',
      created: '2020-04-30 16:00',
      status: 1,
    },
    { content: '環境構築', created: '2020-04-30 15:30', status: 2 },
  ],
  option: ['作業前', '作業中', '完了'],
})
export const mutations = {
  insert(state, obj) {
    const d = new Date()
    const fmt =
      d.getFullYear() +
      '-' +
      ('00' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + d.getDate()).slice(-2) +
      ' ' +
      ('00' + d.getHours()).slice(-2) +
      ':' +
      ('00' + d.getMinutes()).slice(-2)
    state.todos.unshift({
      content: obj.content,
      created: fmt,
      status: 0,
    })
  },
  remove(state, index) {
    const todo = state.todos[index]
    if (confirm('"' + todo.content + '"を削除しますか？')) {
      state.todos.splice(index, 1)
    }
  },
  changeStatus(state, index) {
    const status = (state.todos[index].status + 1) % state.option.length
    state.todos[index].status = status
  },
}
export const action = {}
/*
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
*/
