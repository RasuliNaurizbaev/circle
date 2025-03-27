<template>
    <v-container class="d-flex align-center justify-center" style="min-height: 100vh; background: #121212;">
      <v-card class="mx-auto px-6 py-8" max-width="400" elevation="10" color="#1E1E1E">
        <v-card-title class="text-h5 text-center text-white">Register</v-card-title>
        
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
          <v-btn color="success" size="large" class="custom-btn" @click="toHome">
            Submit
            <v-icon icon="mdi-check" end></v-icon>
          </v-btn>
          <v-btn color="primary" size="large" class="custom-btn" @click="login">
            Login
            <v-icon icon="mdi-login" end></v-icon>
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
  
  const toHome = () => {
    if (!username.value.trim()) {
      errorMessage.value = "Username cannot be empty!"
      return
    }
  
    let usernames = JSON.parse(localStorage.getItem("usernames")) || []
    
    if (!Array.isArray(usernames)) {
      usernames = []
    }
  
    if (usernames.includes(username.value)) {
      errorMessage.value = "User already exists in Storage"
      return
    }
  
    usernames.push(username.value)
  
    // Keep only the last 5 usernames
    if (usernames.length > 5) {
      usernames = usernames.slice(-5)
    }
  
    localStorage.setItem("username", username.value)
    localStorage.setItem("usernames", JSON.stringify(usernames))
    router.push("/home")
  }
  
  const login = () => {
    router.push("/login")
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
  