<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- show toggle button -->
                    <div class="my-3 text-center" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                        </button>
                    </div>

                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksVisible && showCompletedTasks"/>

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from 'pinia';
import { useTaskStore } from "../stores/task";
import Tasks from "../components/Tasks/Tasks.vue";
import NewTask from "../components/Tasks/NewTask.vue";

const store = useTaskStore()
const { completedTasks, uncompletedTasks} = storeToRefs(store)
const { fetchAllTasks } = store

onMounted(async () => {
    await fetchAllTasks()
});

const showToggleCompletedBtn = computed(() => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0)
const completedTasksVisible = computed(() => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0)
const showCompletedTasks = ref(false)



</script>