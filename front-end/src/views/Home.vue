<template>
<div class="home">
<div class="wrapper">
  <h1>Car Query</h1>
  <p id="header">A place for those who love cars. Learn, explore, and talk together about
     these marvels of engineering.
  </p>
  </div>
  <div class="introduction">
    <div id="para">
      <p>Motor vehicles were first invented in 1885. Immediately capturing the imagination of thousands of individuals,
      these vehicles promised to be more convenient and more versatile than most of the predominant forms of transportation at the time.
      Eventually coming to be called the “car,” these vehicles have changed drastically since their inception,
      gaining in power, size, speed, and complexity.
      </p>
      <p>When production methods were revolutionized by the Ford Motor Company the car became available to the everyman.
      Soon, the car became a staple commodity in American culture, being essential for work and travel.
      Once the technology became better, people wanted more speed
      and more fun from their vehicles. This led to big name luxury sports brands,
      like Shelby, Ferrari, Bugatti, and Lamborghini, some of the most recognizable vehicles in the world.
      </p>
      <p>Over time, the car has continued to evolve. More technology is included, as cars can now self-park, assist in lane control,
      and even self-drive to a certain degree. New engineering tricks cut down on emissions, whether by
      making the engine more efficient in burning fuel, using a combination of batteries and fuel, or going fully electric.
      </p>
      <p>Our favorite vehicle is constantly evolving, and in some ways the future of motor vehicles is already here.
      To learn just a bit more about some of the most iconic contributions to the industry try out our other webpages!
      </p>
    </div>
    <div id="image">
      <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/14bugatti-divo-99leadgallery-1535035005.jpg?crop=0.822xw:1.00xh;0.109xw,0&resize=640:*">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  },
}
</script>

<style scoped>
  h1 {
    padding-left: 25px;
  }
  p {
    margin-top: 20px;
    padding-left: 10px;
    margin-right: 10px;
  }
  .introduction {
    display: flex;
    padding-top: 10px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #header {
    text-align: center;
    max-width: 500px;
    font-size: 18px;
    font-weight: bold;
  }
  #para {
    flex: 1;
  }
  #image{
    flex: 1;
  }
  #image img {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }

</style>
