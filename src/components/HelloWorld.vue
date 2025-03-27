<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">Vuetify</h1>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card class="py-4" color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
            prepend-icon="mdi-rocket-launch-outline" rounded="lg" variant="outlined">
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">Get started</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                Change this page by updating <v-kbd>{{ `
                  <HelloWorld />` }}
                </v-kbd> in <v-kbd>components/HelloWorld.vue</v-kbd>.
              </div>
            </template>

            <v-overlay opacity=".12" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card append-icon="mdi-open-in-new" class="py-4" color="surface-variant" href="https://vuetifyjs.com/"
            prepend-icon="mdi-text-box-outline" rel="noopener noreferrer" rounded="lg"
            subtitle="Learn about all things Vuetify in our documentation." target="_blank" title="Documentation"
            variant="text">
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card append-icon="mdi-open-in-new" class="py-4" color="surface-variant"
            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides" prepend-icon="mdi-star-circle-outline"
            rel="noopener noreferrer" rounded="lg" subtitle="Explore available framework Features." target="_blank"
            title="Features" variant="text">
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card append-icon="mdi-open-in-new" class="py-4" color="surface-variant"
            href="https://vuetifyjs.com/components/all" prepend-icon="mdi-widgets-outline" rel="noopener noreferrer"
            rounded="lg" subtitle="Discover components in the API Explorer." target="_blank" title="Components"
            variant="text">
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card append-icon="mdi-open-in-new" class="py-4" color="surface-variant"
            href="https://discord.vuetifyjs.com" prepend-icon="mdi-account-group-outline" rel="noopener noreferrer"
            rounded="lg" subtitle="Connect with Vuetify developers." target="_blank" title="Community" variant="text">
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router"
import { onMounted, onUnmounted } from "vue";
const router = useRouter();

let box = []; 
const target = ['l', 'o', 'g', 'i', 'n'];  

const handleKeydown = (event) => {
  let value = event.key;  


  if (box.length === 0) {
    console.log("box is empty");
    box.push(value);
  } else {
    
    box.push(value);
  }

  console.log(box);

  
  const findSequence = (box, target) => {
    let targetIndex = 0;

    for (let i = 0; i < box.length; i++) {
      if (box[i] === target[targetIndex]) {
        targetIndex++;  
      }

      if (targetIndex === target.length) {
        console.log("Sequence found: true");
        router.push("/login")
        return; 
      }
    }
    console.log("Sequence not found yet.");
  };


  findSequence(box, target);
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
