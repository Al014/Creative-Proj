<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload"><i class="fas fa-building">Upload</i></a></p>
    <!-- <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2> -->
    <company-uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <company-gallery :companies="companies" />
  <div class="wrapper">
    <div class="form">
      <input v-model="findName" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
      <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.name}}</div>
      </div>
    </div>
    <div class="flexer">
      <div class="image" v-if="findItem">
        <img :src="findItem.path" />
      </div>
      <div class="upload" v-if="findItem">
        <div class="break">
        <input v-model="findItem.name" placeholder="Name">
        </div>
        <div class="break">
        <input v-model="findItem.nationality" placeholder="Nationality">
        </div>
        <div class="break">
        <input v-model="findItem.founded" placeholder="Founded">
        </div>
        <div class="break">
        <input v-model="findItem.worth" placeholder="Net Worth">
        </div>
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
import CompanyUploader from '@/components/CompanyUploader.vue';
import CompanyGallery from '@/components/CompanyGallery.vue';
export default {
  name: 'CompanyCreator',
  components: {
    CompanyUploader,
    CompanyGallery
  },
  data() {
    return {
      show: false,
      companies: [],
      error: '',
      findName: '',
      findItem: null,
    }
  },
  created() {
    this.getCompanies();
  },
  computed: {
    suggestions() {
      let companies = this.companies.filter(company => company.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return companies.sort((a, b) => a.name > b.name);
    }
  },
  methods: {
    async getCompanies() {
      try {
        this.response = await axios.get("/api/companies");
        this.companies = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    selectItem(item) {
      this.findName = "";
      this.findItem = item;
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getCompanies();
    },
    async deleteItem(item) {
        await axios.delete("/api/companies/" + item._id);
        this.findItem = null;
        this.getCompanies();
        return true;
    },
    async editItem(item) {
      await axios.put("/api/companies/" + item._id, {
        name: this.findItem.name,
        nationality: this.findItem.nationality,
        founded: this.findItem.founded,
        worth: this.findItem.worth,
      });
      this.findItem = null;
      this.getCompanies();
      return true;
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
  max-width: 250px;
  max-height: 150px;
}

.flexer {
  display: flex;
}

.actions {
  padding-top: 10px;
}
</style>
