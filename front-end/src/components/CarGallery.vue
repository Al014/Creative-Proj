<template>
<div>
  <section class="car-gallery">
    <div class="item" v-for="car in cars" v-bind:key="car._id">
      <div class="wrapper">
        <img :src="car.path" />
        <div class="carInfo">
          <p class="carBrand">Brand: {{car.brand}}</p>
          <p class="carModel">Model: {{car.model}}</p>
          <p class="carHorsepower">Horsepower: {{car.horsepower}} bhp</p>
          <p class="carYear">Year Built: {{car.year}}</p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'CarGallery',
  props: {
    cars: Array
  }
}
</script>

<style scoped>
.car-gallery{
  display: flex;
  flex-wrap: wrap;
  flex-align: stretch;
}
img{
  max-width: 250px;
  max-height: 200px;
}
.wrapper {
  padding: 25px;
}
.carInfo {
  padding-top: 10px;
}
</style>
