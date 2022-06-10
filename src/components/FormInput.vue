<template>
  <div class="form-control">
    <label :for="id"><slot></slot></label>
    <input
      :type="type"
      :id="id"
      :name="id"
      :value="inputValue"
      @input="handleChange"
      :placeholder="placeholder"
      :class="{ error: isError }"
    />
    <p>{{log( $store.state.errorMessage)}}</p>
    <p v-if="isError" class="message">{{ $store.state.errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: this.value,
      errorMessage: "",
    };
  },
  props: {
    type: String,
    id: String,
    value: String,
    placeholder: String,
    validFeild: Boolean,
  },
  computed: {
    isError() {
      return this.errorMessage?.length !== 0 ? true : false;
      // return this.$store.getters.isError
    },
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
        validFeild() {
      if (!this.validFeild) {
        if (!this.inputValue) {
          this.handleValidate();
        }
      }
    },
  },
  methods: {
    log(message) {
      console.log(message);
    },
    handleChange: function (event) {
      const value = event.target.value;
      this.handleValidate(value);

      this.$emit("input", {
        value: event.target.value,
        errorMessage: this.errorMessage,
        name: this.id,
      });
    },
    handleValidate(value = "") {
      if (value.trim() == "") {
        this.errorMessage = "This field is required!";
      } else if (this.type === "email") {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value)) {
          this.errorMessage = "Email invalid!";
        } else {
          this.errorMessage = "";
        }
      } else {
        this.errorMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  text-align: left;
}

label {
  color: #000;
  font-size: 16px;
  display: block;
  margin-bottom: 6px;
}

input {
  color: #586068;
  font-size: 16px;
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: 3px solid transparent;
  transition: all 0.2s ease;
}

input:focus {
  outline: 3px solid #c2d9fb;
  box-shadow: unset;
  border: 1px solid transparent;
}

.error {
  box-shadow: 0 0 4px #f4b6c1;
  border: 1px solid #aa4651;
}

.error:focus {
  outline: 3px solid #f4b6c1;
}

.message {
  color: #aa4651;
  font-size: 12px;
  margin-top: 8px;
}
</style>