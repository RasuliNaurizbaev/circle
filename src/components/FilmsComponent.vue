<template>
  <v-container>
    <NavbarComponent />
    <v-row>
      <!-- Основной контент -->
      <v-col cols="9">
        <v-text-field
          v-model="search"
          label="Search for a film"
          outlined
          class="mb-4"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>

        <v-row>
          <v-col
            v-for="film in filteredFilms"
            :key="film.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card>
              <v-img
                :src="film.image"
                height="200px"
                class="film-image"
              ></v-img>
              <v-card-title>{{ film.title }}</v-card-title>
              <v-card-subtitle>{{ film.genre }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Year:</strong> {{ film.year }}</p>
                <p><strong>Rating:</strong> {{ film.rating }}</p>
                <p><strong>Popularity:</strong> {{ film.popularity }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="openDetails(film)"
                >
                  More Details
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Боковая панель -->
      <v-col cols="3">
        <v-card class="pa-4">
          <v-card-title>Filters</v-card-title>
          <v-divider></v-divider>

          <!-- Фильтр по жанру -->
          <v-select
            v-model="selectedGenre"
            :items="genres"
            label="Filter by Genre"
            outlined
            class="mb-4"
          ></v-select>

          <!-- Фильтр по году -->
          <v-select
            v-model="selectedYear"
            :items="years"
            label="Filter by Year"
            outlined
            class="mb-4"
          ></v-select>

          <!-- Фильтр по популярности -->
          <v-select
            v-model="selectedPopularity"
            :items="popularityOptions"
            label="Sort by Popularity"
            outlined
            class="mb-4"
          ></v-select>

          <!-- Фильтр по оценке -->
          <v-select
            v-model="selectedRating"
            :items="ratingOptions"
            label="Sort by Rating"
            outlined
          ></v-select>
        </v-card>
      </v-col>
    </v-row>

    <!-- Модальное окно для деталей фильма -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ selectedFilm?.title }}</v-card-title>
        <v-card-subtitle>{{ selectedFilm?.genre }}</v-card-subtitle>
        <v-card-text>
          <v-img
            :src="selectedFilm?.image"
            height="300px"
            class="mb-4"
          ></v-img>
          <p>{{ selectedFilm?.description }}</p>
          <p><strong>Year:</strong> {{ selectedFilm?.year }}</p>
          <p><strong>Rating:</strong> {{ selectedFilm?.rating }}</p>
          <p><strong>Popularity:</strong> {{ selectedFilm?.popularity }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";

// Данные фильмов с бесплатными изображениями
const search = ref("");
const films = ref([
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    description: "A mind-bending thriller by Christopher Nolan.",
    year: 2010,
    rating: 8.8,
    popularity: 95,
    image: "https://via.placeholder.com/300x200?text=Inception",
  },
  {
    id: 2,
    title: "The Godfather",
    genre: "Crime",
    description: "A classic mafia drama.",
    year: 1972,
    rating: 9.2,
    popularity: 90,
    image: "https://via.placeholder.com/300x200?text=The+Godfather",
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    description: "A superhero film by Christopher Nolan.",
    year: 2008,
    rating: 9.0,
    popularity: 98,
    image: "https://via.placeholder.com/300x200?text=The+Dark+Knight",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Crime",
    description: "A cult classic by Quentin Tarantino.",
    year: 1994,
    rating: 8.9,
    popularity: 85,
    image: "https://via.placeholder.com/300x200?text=Pulp+Fiction",
  },
  {
    id: 5,
    title: "Interstellar",
    genre: "Sci-Fi",
    description: "A space exploration epic by Christopher Nolan.",
    year: 2014,
    rating: 8.6,
    popularity: 92,
    image: "https://via.placeholder.com/300x200?text=Interstellar",
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Sci-Fi",
    description: "A groundbreaking sci-fi film.",
    year: 1999,
    rating: 8.7,
    popularity: 89,
    image: "https://via.placeholder.com/300x200?text=The+Matrix",
  },
  {
    id: 7,
    title: "Forrest Gump",
    genre: "Drama",
    description: "A heartwarming story starring Tom Hanks.",
    year: 1994,
    rating: 8.8,
    popularity: 87,
    image: "https://via.placeholder.com/300x200?text=Forrest+Gump",
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    genre: "Drama",
    description: "A story of hope and friendship.",
    year: 1994,
    rating: 9.3,
    popularity: 97,
    image: "https://via.placeholder.com/300x200?text=The+Shawshank+Redemption",
  },
  {
    id: 9,
    title: "The Avengers",
    genre: "Action",
    description: "A superhero team-up film.",
    year: 2012,
    rating: 8.0,
    popularity: 93,
    image: "https://via.placeholder.com/300x200?text=The+Avengers",
  },
  {
    id: 10,
    title: "Fight Club",
    genre: "Drama",
    description: "A psychological drama by David Fincher.",
    year: 1999,
    rating: 8.8,
    popularity: 88,
    image: "https://via.placeholder.com/300x200?text=Fight+Club",
  },
  {
    id: 11,
    title: "The Lion King",
    genre: "Animation",
    description: "A Disney classic about the circle of life.",
    year: 1994,
    rating: 8.5,
    popularity: 91,
    image: "https://via.placeholder.com/300x200?text=The+Lion+King",
  },
  {
    id: 12,
    title: "Gladiator",
    genre: "Action",
    description: "A historical epic about a Roman general.",
    year: 2000,
    rating: 8.5,
    popularity: 86,
    image: "https://via.placeholder.com/300x200?text=Gladiator",
  },
  {
    id: 13,
    title: "Titanic",
    genre: "Romance",
    description: "A tragic love story set on the ill-fated Titanic.",
    year: 1997,
    rating: 7.8,
    popularity: 94,
    image: "https://via.placeholder.com/300x200?text=Titanic",
  },
  {
    id: 14,
    title: "Avatar",
    genre: "Sci-Fi",
    description: "A visually stunning sci-fi epic by James Cameron.",
    year: 2009,
    rating: 7.9,
    popularity: 96,
    image: "https://via.placeholder.com/300x200?text=Avatar",
  },
  {
    id: 15,
    title: "The Wolf of Wall Street",
    genre: "Comedy",
    description: "A dark comedy about greed and excess.",
    year: 2013,
    rating: 8.2,
    popularity: 84,
    image: "https://via.placeholder.com/300x200?text=The+Wolf+of+Wall+Street",
  },
]);

// Опции для фильтров
const genres = ref(["All", "Sci-Fi", "Crime", "Action", "Drama"]);
const years = ref(["All", 1994, 1999, 2008, 2010, 2012, 2014, 1972]);
const popularityOptions = ref(["All", "High to Low", "Low to High"]);
const ratingOptions = ref(["All", "High to Low", "Low to High"]);

// Выбранные фильтры
const selectedGenre = ref("All");
const selectedYear = ref("All");
const selectedPopularity = ref("All");
const selectedRating = ref("All");

// Модальное окно
const dialog = ref(false);
const selectedFilm = ref(null);

function openDetails(film) {
  selectedFilm.value = film;
  dialog.value = true;
}

// Фильтрация фильмов
const filteredFilms = computed(() => {
  let result = films.value;

  // Фильтр по жанру
  if (selectedGenre.value !== "All") {
    result = result.filter((film) => film.genre === selectedGenre.value);
  }

  // Фильтр по году
  if (selectedYear.value !== "All") {
    result = result.filter((film) => film.year === selectedYear.value);
  }

  // Сортировка по популярности
  if (selectedPopularity.value === "High to Low") {
    result = result.sort((a, b) => b.popularity - a.popularity);
  } else if (selectedPopularity.value === "Low to High") {
    result = result.sort((a, b) => a.popularity - b.popularity);
  }

  // Сортировка по оценке
  if (selectedRating.value === "High to Low") {
    result = result.sort((a, b) => b.rating - a.rating);
  } else if (selectedRating.value === "Low to High") {
    result = result.sort((a, b) => a.rating - b.rating);
  }

  // Фильтр по названию
  return result.filter((film) =>
    film.title.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.film-image {
  border-radius: 8px;
}
</style>