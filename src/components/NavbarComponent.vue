<template>
    <v-layout style="margin-bottom: 50px;">
      <v-navigation-drawer permanent location="top" style="height: 60px;">
        <v-list style="justify-content: center; display: flex; align-self: start;">
          <v-list-item prepend-icon="mdi-forum" title="Chat" value="chat" @click="chat"></v-list-item>
          <v-list-item prepend-icon="mdi-movie" title="Films" value="films" @click="films"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="User" value="user"></v-list-item>
          <v-list-item prepend-icon="mdi-exit-to-app" title="Exit" value="exit" @click="exit"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  function chat() {
    router.push("/home");
  }
  
  function films() {
    router.push("/films");
  }
  
  function exit() {
    router.push("/login");
  }
  </script>