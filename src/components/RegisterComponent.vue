<template>
    <form @submit.prevent="toHome">
        <input type="text" placeholder="Username" v-model="username">
        <button type="submit">Submit</button>
        <button type="button" @click="login">Login</button>
        <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p> 
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref(""); 
const errorMessage = ref("");

const toHome = () => {
    if (username.value.trim() === "") {
        errorMessage.value = "Username cannot be empty!";
        return;
    }

    let usernames = JSON.parse(localStorage.getItem("usernames")) || [];

    if (!Array.isArray(usernames)) {
        usernames = [];
    }

    if (usernames.includes(username.value)) {
        errorMessage.value = "User already exists in Storage";
        return;
    }

    usernames.push(username.value);

    // Keep only the last 5 usernames
    if (usernames.length > 5) {
        usernames = usernames.slice(-5);
    }

    localStorage.setItem("username", username.value); // Save the current username
    localStorage.setItem("usernames", JSON.stringify(usernames)); // Save all usernames

    router.push("/home");
};

const login = () => {
    router.push("/");
};
</script>

<style>
form input {
    border: 1px solid #ccc;
}
</style>
