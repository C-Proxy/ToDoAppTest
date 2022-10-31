<!-- pages/index.vue -->
<template>
  <section class="container">
    <header class="head">
      <h1>るかユキのTodoリスト</h1>
      <div class="add-area">
        <input
          v-model="content"
          type="text"
          name="addName"
          placeholder="タスクを入力してください"
        />
        <button class="button button--green" @click="insert">追加</button>
      </div>
      <div class="filter">
        <button
          class="button button--gray"
          :class="{ 'is-active': filterStatus === -1 }"
          @click="changeFilter(-1)"
        >
          全て
        </button>
        <button
          class="button button--gray"
          :class="{ 'is-active': filterStatus === 0 }"
          @click="changeFilter(0)"
        >
          作業前
        </button>
        <button
          class="button button--gray"
          :class="{ 'is-active': filterStatus === 1 }"
          @click="changeFilter(1)"
        >
          作業中
        </button>
        <button
          class="button button--gray"
          :class="{ 'is-active': filterStatus === 2 }"
          @click="changeFilter(2)"
        >
          完了
        </button>
      </div>
    </header>
    <table class="todo-list">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayTodos" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.created }}</td>
          <td>
            <button
              class="button"
              :class="['waiting', 'working', 'completed'][item.status]"
              @click="changeStatus(index)"
            >
              {{ option[item.status] }}
            </button>
          </td>
          <td>
            <button class="button button--delete" @click="remove(index)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return { content: '', filterStatus: -1 }
  },
  computed: {
    ...mapState(['todos', 'option']),
    displayTodos() {
      if (this.filterStatus !== -1) {
        return this.todos.filter((todo) => todo.status === this.filterStatus)
      } else {
        return this.todos
      }
    },
  },
  methods: {
    insert() {
      if (this.content !== '') {
        this.$store.commit('insert', { content: this.content })
        this.content = ''
      }
    },
    remove(index) {
      this.$store.commit('remove', index)
    },
    changeStatus(index) {
      this.$store.commit('changeStatus', index)
    },
    changeFilter(status) {
      this.filterStatus = status
    },
  },
}
</script>

<style>
header.head {
  width: 50%;
  margin: auto;
}

.todo-list {
  width: 60%;
  margin: auto;
}

.button {
  background: white;
  border: 0.5px solid;
  border-radius: 5px;

  height: 40px;
  width: 80px;
}

.button.working {
  color: white;
  background: cyan;
}

.button.completed {
  color: white;
  background: darkslategray;
}

.button--delete {
  border-color: red;
  color: red;
}

.is-active {
  background: darkslategray;
  color: white;
}
</style>
