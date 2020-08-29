<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload"><i class="fas fa-car">Upload</i></a></p>
    <!-- <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2> -->
    <car-uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <car-gallery :cars="cars" />
  <div class="form">
    <input v-model="findName" placeholder="Search">
    <div class="suggestions" v-if="suggestions.length > 0">
    <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.model}}</div>
    </div>
  </div>
  <div class="flexer">
    <div class="image" v-if="findItem">
      <img :src="findItem.path" />
    </div>
    <div class="upload" v-if="findItem">
      <div class="break">
      <input v-model="findItem.brand" placeholder="Brand">
      </div>
      <div class="break">
      <input v-model="findItem.model" placeholder="Model">
      </div>
      <div class="break">
      <input v-model="findItem.horsepower" placeholder="Horsepower">
      </div>
      <div class="break">
      <input v-model="findItem.year" placeholder="Year">
      </div>
    </div>
  </div>
  <div class="actions" v-if="findItem">
    <button class="modify" @click="deleteItem(findItem)">Delete</button>
    <button class="modify" @click="editItem(findItem)">Edit</button>
  </div>
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import CarUploader from '@/components/CarUploader.vue';
import CarGallery from '@/components/CarGallery.vue';
export default {
  name: 'CarCreator',
  components: {
    CarUploader,
    CarGallery
  },
  data() {
    return {
      show: false,
      cars: [],
      error: '',
      findName: '',
      findItem: null,
    }
  },
  created() {
    this.getCars();
  },
  computed: {
    suggestions() {
      let cars = this.cars.filter(car => car.model.toLowerCase().startsWith(this.findName.toLowerCase()));
      return cars.sort((a, b) => a.name > b.name);
    }
  },
  methods: {
    async getCars() {
      try {
        this.response = await axios.get("/api/cars");
        this.cars = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getCars();
    },
    async deleteItem(item) {
        await axios.delete("/api/cars/" + item._id);
        this.findItem = null;
        this.getCars();
        return true;
    },
    async editItem(item) {
      await axios.put("/api/cars/" + item._id, {
        brand: this.findItem.brand,
        model: this.findItem.model,
        horsepower: this.findItem.horsepower,
        year: this.findItem.year,
      });
      this.findItem = null;
      this.getCars();
      return true;
    },
    selectItem(item) {
      this.findName = "";
      this.findItem = item;
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}

input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

.break{
  margin-top: 10px;
  //margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}

input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
  margin-left: 10px;
}

.break{
  margin-top: 10px;
  //margin-right: 50px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.modify{
  margin-left: 10px;
}

.break {
  margin-left: 10px;
}

.wrapper {
}

.image img {
  padding-top: 10px;
  margin-left: 10px;
  max-height: 150px;
}

.flexer {
  display: flex;
}

.actions {
  padding-top: 10px;
}
</style>
