<template>
  <div>
    <div class="progress-border">
        <div class="progress-content"  :style="{ width: width + '%' }"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  computed: {
    width() {
      return (this.$store.state.pageActive / this.$store.state.pages.length) * 100
    },
  },
};
</script>

<style scoped>
.progress-border {
  width: 100%;
  height: 18px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.progress-content {
  height: 100%;
  background-color: #437fe8;
  border-radius: 12px;
  transition: width 0.5s ease;
}
</style>