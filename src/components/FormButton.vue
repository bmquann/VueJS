<template>
  <div>
    <button @click="click" :class="className" class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
      className : String,
      click : Function,
  },
  
};
</script>

<style scoped>
.btn {
  display: inline-block;
  border: unset;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  padding: 8px 24px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.35s ease-out;
  margin-left: 16px;
}

.btn:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4), 6px 6px 12px rgba(0, 0, 0, 0.2);
}

.btn.prev {
  background-color: #72e6b1;
}
.btn.next {
  background-color: #1e68cf;
}
.btn.reset {
  background-color: #1d719a;
}
</style>