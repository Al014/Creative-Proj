<template>
<div>
  <section class="company-gallery">
    <div class="item" v-for="company in companies" v-bind:key="company._id">
      <div class="wrapper">
        <img :src="company.path" />
        <div class="companyInfo">
          <p class="companyName">Company: {{company.name}}</p>
          <p class="companyNationality">Nationality: {{company.nationality}}</p>
          <p class="companyFounded">Year Founded: {{company.founded}}</p>
          <p class="companyWorth">Net Worth: {{company.worth}}</p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'CompanyGallery',
  props: {
    companies: Array
  }
}
</script>

<style scoped>
.company-gallery{
  display: flex;
  flex-wrap: wrap;
  flex-align: stretch;
}
img{
  max-width: 250px;
  max-height: 200px;
}
.wrapper{
  padding: 25px;
}
.companyInfo {
  padding-top: 10px;
}
</style>
