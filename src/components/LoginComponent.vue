<template>
    <v-container class="d-flex align-center justify-center" style="min-height: 100vh; background: #121212;">
      <v-card class="mx-auto px-6 py-8" max-width="400" elevation="10" color="#1E1E1E">
        <v-card-title class="text-h5 text-center text-white">Login</v-card-title>
        
        <v-container>
          <v-text-field
            v-model="username"
            color="primary"
            label="Username"
            variant="solo"
            class="custom-input"
          ></v-text-field>
    
          <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        </v-container>
    
        <v-divider></v-divider>
    
        <v-card-actions class="d-flex justify-center mt-4">
          <v-btn color="success" size="large" class="custom-btn" @click="login">
            Login
            <v-icon icon="mdi-login" end></v-icon>
          </v-btn>
          <v-btn color="primary" size="large" class="custom-btn" @click="registerPage">
            Register
            <v-icon icon="mdi-account-plus" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref("")
  const errorMessage = ref("")
  const router = useRouter()
  
  const registerPage = () => {
    router.push("/register")
  }
  
  const login = () => {
    if (!username.value.trim()) {
      errorMessage.value = "Enter username"
      return
    }
    
    try {
      const js = localStorage.getItem("usernames")
      const jsondata = JSON.parse(js)
  
      if (!jsondata || !Array.isArray(jsondata)) {
        errorMessage.value = "No usernames found"
        return
      }
  
      if (jsondata.includes(username.value)) {
        localStorage.setItem("username", username.value)
        router.push("/home")
        return
      }
  
      errorMessage.value = "Username not found"
    } catch (err) {
      console.log(err)
      errorMessage.value = "Error reading usernames"
    }
  }
  </script>
  
  <style scoped>
  .custom-input :deep(input) {
    color: white !important;
  }
  
  .custom-btn {
    transition: transform 0.2s ease-in-out;
    margin: 0 5px;
  }
  
  .custom-btn:hover {
    transform: scale(1.05);
  }
  
  .error-text {
    color: red;
    text-align: center;
    margin-top: 5px;
  }
  </style>
  