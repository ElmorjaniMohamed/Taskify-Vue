<template>
    <section class="bg-light py-3 py-md-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div class="card border border-light-subtle rounded-3 shadow-sm">
                        <div class="card-body p-3 p-md-4 p-xl-5">
                            <div class="text-center mb-3">
                                <a href="#!">
                                    <img src="./assets/img/logo.svg" alt="BootstrapBrain Logo" width="175" height="57">
                                </a>
                            </div>
                            <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Register to your account</h2>
                            <form @submit.prevent="handleSubmit">
                                <div class="row gy-2 overflow-hidden">
                                    {{ errors }}
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                :class="{ 'is-invalid': errors.name && errors.name[0] }" name="name"
                                                id="name" v-model="form.name" placeholder="Your Name" required>
                                            <label for="name" class="form-label">Name</label>
                                            <div class="invalid-feedback" v-if="errors.name && errors.name[0]">Error
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control"
                                                :class="{ 'is-invalid': errors.email && errors.email[0] }" name="email"
                                                id="email" v-model="form.email" placeholder="name@example.com" required
                                                autocomplete="username">
                                            <label for="email" class="form-label">Email</label>
                                            <div class="invalid-feedback" v-if="errors.email && errors.email[0]">Error
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control"
                                                :class="{ 'is-invalid': errors.password && errors.password[0] }"
                                                name="password" id="password" v-model="form.password" value=""
                                                placeholder="Password" required autocomplete="current-password">
                                            <label for="password" class="form-label">Password</label>
                                            <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                                                Error</div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control"
                                                :class="{ 'is-invalid': errors.password_confirmation && errors.password_confirmation[0] }"
                                                name="password_confirmation" id="password_confirmation"
                                                v-model="form.password_confirmation" placeholder="Confirm Password"
                                                required>
                                            <label for="password_confirmation" class="form-label">Confirm
                                                Password</label>
                                            <div class="invalid-feedback"
                                                v-if="errors.password_confirmation && errors.password_confirmation[0]">
                                                Error</div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid my-3">
                                            <button class="btn btn-primary btn-lg" type="submit">Register</button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <p class="m-0 text-secondary text-center">Don't have an account? <a href="#!"
                                                class="link-primary text-decoration-none">Sign up</a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "../stores/auth";

const router = useRouter();
const store = useAuthStore();
const { isLoggedIn, errors } = storeToRefs(store)

const { handleRegister } = store

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const handleSubmit = async () => {
    await handleRegister(form);
    if (isLoggedIn.value) {
        router.push({ name: "tasks" });
    }
};
</script>