<template>
  <div class="select">
    <p class="select__label"><slot></slot></p>
    <div class="select__wrap" :class="{ error: isError }">
      <span class="select__title" @click="isShow = !isShow">{{
        !selected ? "-- Choose answer --" : selected
      }}</span>
      <div class="select__options" v-if="isShow">
        <div v-for="(item, index) in listSelectItems" :key="index">
          <div class="option__item" @click="handSelect(item)">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <p class="select__error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { isShow: false, errorMessage: "" };
  },
  computed: {
    isError() {
      return this.errorMessage ? true : false;
    },
    listSelectItems() {
      return this.$store.state.listSelectItems;
    },
    selected() {
      return this.$store.state.user.selected;
    },
  },
  watch: {
    selected() {
      this.isShow = !this.isShow;
    },
  },
  methods: {
    handSelect: function (value) {
      this.$store.commit("UPDATE_SELECTED", value);
    },
  },
};
</script>

<style scoped>
.select {
  text-align: left;
}
.select__label {
  font-size: 16px;
  color: #000;
  padding-bottom: 10px;
}

.select__wrap {
  border: 1px solid #ccc;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
}
.select__wrap::after {
  content: "";
  display: block;
  border: 4px solid transparent;
  border-color: #000 transparent transparent transparent;
  position: absolute;
  top: calc(50% + 3px);
  right: 22px;
  transform: translateY(-50%);
}

.select .error {
  box-shadow: 0 0 4px #f4b6c1;
  border: 1px solid #aa4651;
}

.select__title {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px 12px;
}

.select__options {
  position: absolute;
  top: calc(100% + 1px);
  background-color: #fff;
  width: 100%;
  padding: 12px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

.select__error {
  color: #aa4651;
  font-size: 12px;
  margin-top: 8px;
}
.option__item {
  padding: 8px 16px;
  background-color: #fff;
  transition: background-color 0.2s ease-in;
}
.option__item:hover {
  background-color: #ccc;
}
</style>