<template>
  <div class="container py-5">
    <!-- AdminNav -->
    <AdminNav />
    <!-- add restaurant category form -->
    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategoryName"
            type="text"
            class="form-control"
            placeholder="Add restaurant category..."
          />
        </div>
        <div class="col-auto">
          <button
            @click.stop.prevent="createCategory"
            type="button"
            class="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    </form>
    <!-- restaurant category list -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              @keydown.enter="
                updateCategory({ categoryId: category.id, name: category.name })
              "
              type="text"
              class="form-control"
            />
            <span
              v-show="category.isEditing"
              @click="handleCancel(category.id)"
              class="cancel"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              @click.stop.prevent="toggleIsEditing(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              @click.stop.prevent="
                updateCategory({ categoryId: category.id, name: category.name })
              "
              type="button"
              class="btn btn-link mr-2"
            >
              Save
            </button>
            <button
              @click.stop.prevent="deleteCategory(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AdminNav from "@/components/AdminNav.vue";
import adminAPI from "@/apis/admin.js";
import { Toast } from "@/utils/helpers.js";

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      categories: [],
      newCategoryName: "",
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await adminAPI.categories.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.categories = data.categories.map((category) => {
          return {
            ...category,
            isEditing: false,
            nameCached: "",
          };
        });
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "Can not get restaurant categories, please try it later",
        });
      }
    },
    async createCategory() {
      try {
        const { data } = await adminAPI.categories.create({
          id: crypto.randomUUID(),
          name: this.newCategoryName,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "Restaurant category created",
        });

        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
          isEditing: false,
        });

        this.newCategoryName = "";
      } catch (error) {
        console.log(error);
        this.newCategoryName = "";
        Toast.fire({
          icon: "error",
          title: "Can not created category, please try it later",
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({ categoryId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "Restaurant category deleted",
        });

        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not delete category, please try it later",
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          };
        } else {
          return category;
        }
      });
    },
    async updateCategory({ categoryId, name }) {
      try {
        const { data } = await adminAPI.categories.update({ categoryId, name });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "Category name updated",
        });

        this.toggleIsEditing(categoryId);
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "Can not change category name, please try it later",
        });
      }
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            // put the original name back
            name: category.nameCached,
          };
        }
        return category;
      });

      this.toggleIsEditing(categoryId);
    },
  },
};
</script>
<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>
