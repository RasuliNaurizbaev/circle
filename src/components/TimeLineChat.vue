<template>
  <v-container style="max-width: 600px;">
    <v-timeline density="compact" side="end">
      <v-timeline-item class="mb-12" :dot-color="getUserColor(username)" size="70" fill-dot>
        <template v-slot:icon>
          <span>{{ username }}</span>
        </template>
        <v-text-field
          style="width: 500px;"
          v-model="input"
          density="compact"
          label="Leave a comment..."
          hide-details
          @keydown.enter="comment"
        >
          <template v-slot:append>
            <v-btn class="mx-0" variant="text" @click="comment">
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>

      <v-slide-x-transition group>
        <v-timeline-item
          v-for="event in timeline"
          :key="event.id"
          :dot-color="getUserColor(event.username)"
          size="small"
        >
          <div
            class="post-container"
            @mouseover="hoveredPost = event.id"
            @mouseleave="clearHover(event.id)"
          >
            <div class="post-content">
              <div class="d-flex justify-space-between align-items-center">
                <div class="post-text">
                  <span v-if="event.username !== username">{{ event.username }}: </span>{{ event.text }}
                </div>
                <div class="time-text">{{ event.time }}</div>
              </div>
              <div class="d-flex justify-end mt-2 button-container">
                <v-btn
                  variant="text"
                  size="small"
                  @click="startEdit(event.id)"
                  class="me-2"
                  v-if="hoveredPost === event.id && editingPost !== event.id && replyingTo !== event.id"
                >
                  Edit
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  @click="startReply(event.id)"
                  v-if="hoveredPost === event.id && editingPost !== event.id && replyingTo !== event.id"
                >
                  Reply
                </v-btn>
              </div>
            </div>
            <div v-if="editingPost === event.id" class="mt-2">
              <v-text-field
                v-model="event.text"
                style="width: 100%;"
                density="comfortable"
                label="Edit your post..."
                hide-details
              />
              <div class="d-flex justify-end mt-2">
                <v-btn
                  variant="text"
                  size="small"
                  @click="saveEdit(event)"
                  class="me-2"
                >
                  Save
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  @click="cancelEdit"
                >
                  Cancel
                </v-btn>
              </div>
            </div>
            <div v-if="replyingTo === event.id" class="mt-2">
              <v-text-field
                v-model="replyInput"
                style="width: 100%;"
                density="comfortable"
                label="Write a reply..."
                hide-details
              />
              <div class="d-flex justify-end mt-2">
                <v-btn
                  variant="text"
                  size="small"
                  @click="saveReply(event.id)"
                  class="me-2"
                >
                  Save
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  @click="cancelReply"
                >
                  Cancel
                </v-btn>
              </div>
            </div>
          </div>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </v-container>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
const socket = new WebSocket("ws://172.16.2.17:8080");

socket.onmessage = (event) => {
  const newMessages = JSON.parse(event.data);
  events.value = [...events.value, ...newMessages];
};


const username = localStorage.getItem("username") || "Guest";

const userColors = ref({});

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getUserColor = (user) => {
  if (!userColors.value[user]) {
    userColors.value[user] = generateRandomColor();
  }
  return userColors.value[user];
};

const events = ref([]);
const input = ref(null);
const nonce = ref(0);
const hoveredPost = ref(null);
const editingPost = ref(null);
const replyingTo = ref(null);
const replyInput = ref("");

const timeline = computed(() => {
  return events.value.slice().reverse();
});

onMounted(() => {
  const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  events.value = savedEvents;
  nonce.value = savedEvents.length > 0 ? savedEvents[savedEvents.length - 1].id + 1 : 0;
});

function saveToLocalStorage() {
  localStorage.setItem("events", JSON.stringify(events.value));
}

function comment() {
  if (!input.value || input.value.trim() === "") return;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const newMessage = {
    id: nonce.value++,
    username: username,
    text: input.value,
    time: time,
  };
  socket.send(JSON.stringify(newMessage));
  input.value = null;
  if (events.value.length > 20) {
    events.value.shift();
  }
  saveToLocalStorage();
  input.value = null;
}

function startEdit(id) {
  editingPost.value = id;
}

function saveEdit(event) {
  editingPost.value = null;
  saveToLocalStorage();
}

function cancelEdit() {
  editingPost.value = null;
}

function startReply(id) {
  replyingTo.value = id;
  replyInput.value = "";
}

function saveReply(id) {
  if (!replyInput.value || replyInput.value.trim() === "") return;

  const originalPost = events.value.find((event) => event.id === id);
  const truncatedText = originalPost.text.length > 30
    ? originalPost.text.slice(0, 30) + "..."
    : originalPost.text;

  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  events.value.push({
    id: nonce.value++,
    username: username,
    text: `Reply to "${truncatedText}": ${replyInput.value}`,
    time: time,
  });

  if (events.value.length > 20) {
    events.value.shift();
  }

  saveToLocalStorage();
  replyingTo.value = null;
  replyInput.value = "";
}

function cancelReply() {
  replyingTo.value = null;
  replyInput.value = "";
}

function isInteracting(id) {
  return editingPost.value === id || replyingTo.value === id;
}

function clearHover(id) {
  if (!isInteracting(id)) {
    hoveredPost.value = null;
  }
}
</script>

<style scoped>
.post-container {
  position: relative;
}

.post-text {
  flex-grow: 1;
}

.time-text {
  position: absolute;
  left: 450px;
  color: gray;
  font-size: 0.9rem;
  text-align: right;
}

.button-container {
  min-height: 36px;
}
</style>