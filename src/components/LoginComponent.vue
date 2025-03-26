<template>
    <form @submit.prevent="login" ref="form">
        <input type="text" placeholder="Username" v-model="username">
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
        <button type="submit">Login</button>
        <button type="button" @click="registerPage">Register</button>
    </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const username = ref("");
        const errorMessage = ref("");
        const router = useRouter();

        function registerPage() {
            router.push("/register");
        }
        function login() {
            if (!username.value.trim()) {
                errorMessage.value = "Enter username";
                return;
            }

            try {
                const js = localStorage.getItem("usernames");
                const jsondata = JSON.parse(js);

                if (!jsondata || !Array.isArray(jsondata)) {
                    errorMessage.value = "No usernames found";
                    return;
                }

                if (jsondata.includes(username.value)) {
                    localStorage.setItem("username", username.value); // Save the current username
                    router.push("/home");
                    return;
                }

                errorMessage.value = "Username not found";
            } catch (err) {
                console.log(err);
                errorMessage.value = "Error reading usernames";
            }
        }

        return { username, errorMessage, login, registerPage };
    }
};
</script>
