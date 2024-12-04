<template>
  <div class="about">
    <h1>About Plants</h1>
    <p>
      Plants are an essential part of life on Earth. They provide oxygen, food, and habitat
      for countless species, including humans.
    </p>
    <p>
      They come in various shapes, sizes, and colors, from towering trees to delicate flowers.
      Plants are not only vital for the environment but also bring beauty and tranquility
      to our lives.
    </p>
    <p>
      Whether you're a gardening enthusiast, a nature lover, or just curious, learning about
      plants is a rewarding experience. Start your journey into the world of flora today!
    </p>
    <img src="@/assets/plants.jpg" alt="Beautiful plants" class="plant-image" />
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  text-align: center;
  color: #2d3436;
}

.about h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #16a085;
}

.about p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.plant-image {
  margin-top: 1.5rem;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
