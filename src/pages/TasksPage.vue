<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask" />
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" @updated="handleUpdatedTask" @completed="handleCompletedTask" @deleted="handleDeleteTask" />

                    <!-- show toggle button -->
                    <div class="my-3 text-center" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                        </button>
                    </div>

                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksVisible && showCompletedTasks"
                        @updated="handleUpdatedTask" @completed="handleCompletedTask" @deleted="handleDeleteTask" />

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from 'pinia';
import { useTaskStore } from "../stores/task";
import { allTasks, createTask, updateTask as apiUpdateTask, completeTask, deleteTask } from "../http/task-api";
import Tasks from "../components/Tasks/Tasks.vue";
import NewTask from "../components/Tasks/NewTask.vue";

const store = useTaskStore()
const { completed, uncompleted, uncompletedCount} = storeToRefs(store)

const tasks = ref([])
onMounted(async () => {
    const { data } = await allTasks()
    tasks.value = data.data
    console.log(store.completed)
    console.log(store.uncompleted)
    console.log(store.uncompletedCount)
});

const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))
const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))
const showToggleCompletedBtn = computed(() => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0)
const completedTasksVisible = computed(() => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0)
const showCompletedTasks = ref(false)

const handleAddedTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask)
    tasks.value.unshift(createdTask.data)
}

const handleUpdatedTask = async (task) => {
    const { data: updatedTask } = await apiUpdateTask(task.id, {
        name: task.name
    })
    const currentTask = tasks.value.find(t => t.id === task.id)
    currentTask.name = updatedTask.data.name
}

const handleCompletedTask = async (task) => {
    const { data: updatedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    })
    const currentTask = tasks.value.find(t => t.id === task.id)
    currentTask.is_completed = updatedTask.data.is_completed
}

const handleDeleteTask = async (task) => {
    const { data } = await deleteTask(task.id)
    const index = tasks.value.findIndex(t => t.id === task.id)
    tasks.value.splice(index, 1)
}
</script>