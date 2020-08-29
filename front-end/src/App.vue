<template>
<div id="app">
  <header>
    <nav class="navbar-custom navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand">Car Query</p>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link to="/"><i class="fas fa-home">Home</i></router-link></li>
          <li><router-link to="/companies"><i class="fas fa-building">Manufacturers</i></router-link></li>
          <li><router-link to="/popular"><i class="fas fa-car">Popular Cars</i></router-link></li>
          <li><router-link to="/messageboard"><i class="fas fa-envelope-square">Message Board</i></router-link></li>
        </ul>
      </div>
    </nav>
  </header>
  <router-view />
  <footer>
    <a href="https://github.com/Al014/Creative-Proj.git">GitHub Repository</a>
  </footer>
</div>
</template>

<style>
.navbar-custom {
  background-color: #84d9ff;
}

#headSpace {
  display: flex;
  justify-content: space-around;
  margin-left: 25%;
  width: 50%;
  padding-top: 20px;
  padding-bottom: 10px;
}

footer {
  padding-left: 10px;
}

</style>
