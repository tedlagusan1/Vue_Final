<template>
  <div class="container mt-5">
    <h1 class="text-center text-light">Add a New Plant</h1>
    <div class="card shadow-lg p-4 rounded bg-light-violet">
      <form @submit.prevent="addPlant">
        <div class="mb-3">
          <label for="name" class="form-label text-dark-violet">Plant Name</label>
          <input
            v-model="plant.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter plant name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label text-dark-violet">Plant Type</label>
          <input
            v-model="plant.type"
            type="text"
            class="form-control"
            id="type"
            placeholder="Enter plant type"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label text-dark-violet">Description</label>
          <textarea
            v-model="plant.description"
            class="form-control"
            id="description"
            rows="3"
            placeholder="Enter plant description"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-violet w-100">Add Plant</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref } from "vue";

export default {
  name: "AddPlant",
  setup() {
    const db = getFirestore();
    const plant = ref({
      name: "",
      type: "",
      description: "",
    });

    const addPlant = async () => {
      try {
        const docRef = await addDoc(collection(db, "plants"), plant.value);

        // Save to Local Storage
        const plants = JSON.parse(localStorage.getItem("plants")) || [];
        plants.push({ ...plant.value, id: docRef.id });
        localStorage.setItem("plants", JSON.stringify(plants));

        alert("Plant added successfully!");

        // Reset form
        plant.value = { name: "", type: "", description: "" };
      } catch (error) {
        console.error("Error adding plant: ", error);
        alert("Failed to add plant!");
      }
    };

    return { plant, addPlant };
  },
};
</script>

<style scoped>
/* Light Violet Theme */
.bg-light-violet {
  background-color: #f8f0fc;
}
.text-dark-violet {
  color: #6a1b9a;
}
.btn-violet {
  background-color: #6a1b9a;
  color: #fff;
}
.btn-violet:hover {
  background-color: #4a148c;
}
.card {
  border: none;
}
h1 {
  font-weight: bold;
  color: #4a148c;
}
</style>
