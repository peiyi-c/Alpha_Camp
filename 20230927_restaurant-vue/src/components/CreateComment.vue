<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">Leave Comment:</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        Back
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    handleSubmit() {
      // TODO: 向 API 發送 POST 請求
      // 伺服器新增 Comment 成功後...
      this.$emit("after-create-comment", {
        // 尚未串接 API 暫時使用隨機的 id
        commentId: crypto.randomUUID(),
        restaurantId: this.restaurantId,
        text: this.text,
      });
      // empty textarea
      this.text = "";
    },
  },
};
</script>
