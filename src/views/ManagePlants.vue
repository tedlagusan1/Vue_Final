<template>
  <div class="container mt-5">
    <h2 class="text-center text-dark-violet">Manage Plants</h2>
    <form @submit.prevent="isEditing ? updatePlant() : addPlant()" class="mb-4">
      <div class="form-group mb-3">
        <label for="plantName" class="text-dark-violet">Plant Name</label>
        <input
          type="text"
          id="plantName"
          class="form-control"
          v-model="plantForm.name"
          placeholder="Enter plant name"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="plantType" class="text-dark-violet">Plant Type</label>
        <input
          type="text"
          id="plantType"
          class="form-control"
          v-model="plantForm.type"
          placeholder="Enter plant type"
          required
        />
      </div>
      <button type="submit" class="btn btn-violet w-100">
        {{ isEditing ? "Update Plant" : "Add Plant" }}
      </button>
    </form>

    <table class="table table-bordered text-center">
      <thead class="bg-light-violet text-dark-violet">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Plant Name</th>
          <th scope="col">Plant Type</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plant, index) in plants" :key="plant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ plant.name }}</td>
          <td>{{ plant.type }}</td>
          <td>
            <button @click="editPlant(plant)" class="btn btn-danger btn-sm">
              Edit
            </button>
            <button @click="deletePlant(plant.id)" class="btn btn-danger btn-sm">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import db from '../firebase';

export default {
  setup() {
    const plants = ref([]);
    const plantForm = ref({ name: '', type: '' });
    const isEditing = ref(false);
    const editingPlantId = ref(null);

    // Fetch all plants from Firestore
    const fetchPlants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'plants'));
        plants.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    // Add a new plant to Firestore
    const addPlant = async () => {
      if (plantForm.value.name && plantForm.value.type) {
        try {
          const docRef = await addDoc(collection(db, 'plants'), {
            name: plantForm.value.name,
            type: plantForm.value.type,
          });
          plants.value.push({ id: docRef.id, ...plantForm.value });
          plantForm.value = { name: '', type: '' };
          syncWithLocalStorage();
        } catch (error) {
          console.error('Error adding plant:', error);
        }
      }
    };

    // Edit a plant (populate form with selected plant data)
    const editPlant = (plant) => {
      isEditing.value = true;
      editingPlantId.value = plant.id;
      plantForm.value = { name: plant.name, type: plant.type };
    };

    // Update the plant in Firestore
    const updatePlant = async () => {
      if (editingPlantId.value) {
        try {
          const plantRef = doc(db, 'plants', editingPlantId.value);
          await updateDoc(plantRef, {
            name: plantForm.value.name,
            type: plantForm.value.type,
          });

          // Update local state
          const plantIndex = plants.value.findIndex(
            (plant) => plant.id === editingPlantId.value
          );
          if (plantIndex > -1) {
            plants.value[plantIndex] = {
              id: editingPlantId.value,
              name: plantForm.value.name,
              type: plantForm.value.type,
            };
          }

          // Reset the form
          plantForm.value = { name: '', type: '' };
          isEditing.value = false;
          editingPlantId.value = null;
          syncWithLocalStorage();
        } catch (error) {
          console.error('Error updating plant:', error);
        }
      }
    };

    // Delete a plant from Firestore
    const deletePlant = async (id) => {
      try {
        await deleteDoc(doc(db, 'plants', id));
        plants.value = plants.value.filter((plant) => plant.id !== id);
        syncWithLocalStorage();
      } catch (error) {
        console.error('Error deleting plant:', error);
      }
    };

    // Sync data with localStorage
    const syncWithLocalStorage = () => {
      localStorage.setItem('plants', JSON.stringify(plants.value));
    };

    // Load data from Firestore and localStorage on component mount
    onMounted(async () => {
      const savedPlants = JSON.parse(localStorage.getItem('plants'));
      if (savedPlants) {
        plants.value = savedPlants;
      }
      await fetchPlants();
    });

    return {
      plants,
      plantForm,
      isEditing,
      addPlant,
      editPlant,
      updatePlant,
      deletePlant,
    };
  },
};
</script>

<style scoped>
/* Styling */
.container {
  max-width: 900px;
  margin: 0 auto;
}

.text-dark-violet {
  color: #6a1b9a;
}

.bg-light-violet {
  background-color: #f8f0fc;
}

.btn-violet {
  background-color: #6a1b9a;
  color: #fff;
}

.btn-violet:hover {
  background-color: #4a148c;
}

.table {
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.table th,
.table td {
  vertical-align: middle;
}

.table th {
  background-color: #f1e4fc;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #ddd;
}

.btn-warning {
  color: #fff;
}
</style>
