<template>
  <div class="form-step">
    <FormProgressBar />
    <div class="form-step__wrap">
      <div class="form-step__title">
        <FormTitle
          v-for="(item, index) in pages"
          :key="index"
          :className="{
            active: item.page === pageActive,
            success: item.validated,
          }"
          :page="item.page"
          >{{ item.name }}</FormTitle
        >
      </div>
    </div>
    <div class="form-step__wrap">
      <div class="form-step__group" v-if="pageActive === 1">
        <FormInput
          type="text"
          id="name"
          :value="user.name"
          @input="handleChange"
          :validFeild="validFeild"
          >Full Name
        </FormInput>
        <FormInput
          type="email"
          id="email"
          :value="user.email"
          @input="handleChange"
          :validFeild="validFeild"
          >Your Email</FormInput
        >
      </div>
      <div class="form-step__group" v-if="pageActive === 2">
        <FormInput
          type="text"
          id="company"
          :value="user.company"
          @input="handleChange"
          :validFeild="validFeild"
          >Your Company Name</FormInput
        >
        <FormInput
          type="number"
          id="employees"
          :value="user.employees"
          @input="handleChange"
          :validFeild="validFeild"
          >Number of Employees</FormInput
        >
      </div>
      <div class="form-step__group" v-if="pageActive === 3">
        <FormSelect :selected="user.selected"
          >From Where did you hear about us</FormSelect
        >
        <div class="check-term">
          <input type="checkbox" id="check-term" @input="handleCheck" />
          <label for="check-term">I accept terms & conditions</label>
          <p class="check-term__error">{{ checkError }}</p>
        </div>
      </div>
    </div>
    <div class="form-step__btns">
      <FormButton
        :click="handlePrev"
        className="prev"
        v-show="pageActive !== pages.length"
        >Previous</FormButton
      >
      <FormButton
        :click="handleNext"
        className="next"
        v-show="pageActive !== pages.length"
        >Next</FormButton
      >
      <FormButton
        :click="handleReset"
        v-if="pageActive === pages.length"
        className="reset"
        >Reset</FormButton
      >
      <FormButton
        :click="handleSubmit"
        v-if="pageActive === pages.length"
        className="prev"
        >Send</FormButton
      >
    </div>
  </div>
</template>

<script>
import FormProgressBar from "./FormProgressBar.vue";
import FormTitle from "./FormTitle.vue";
import FormInput from "./FormInput.vue";
import FormButton from "./FormButton.vue";
import FormSelect from "./FormSelect.vue";
import { mapState } from "vuex";

export default {
  components: {
    FormProgressBar,
    FormTitle,
    FormInput,
    FormButton,
    FormSelect,
  },

  computed: {
    ...mapState({
      pages: (state) => state.pages,
      pageActive: (state) => state.pageActive,
      user: (state) => state.user,
      checkError: (state) => state.checkError,
      errorMessage: (state) => state.errorMessage,
      validFeild: (state) => state.validFeild,
    }),
  },
  methods: {
    handlePrev: function () {
      if (this.pageActive > 1) {
        this.$store.commit("HANLEPREV");
      }
    },

    handleNext: function () {
      if (this.pageActive === 1) {
        if (this.user.name && this.user.email) {
          if (!this.errorMessage) {
            this.pages[0].validated = true;
            this.$store.commit("UPDATE_PAGEACTIVE", 1);
            this.$store.commit("UPDATE_VALIDATEFIELD", true);
          }
        } else {
          this.$store.commit("UPDATE_ERRORMESSAGE", "This field is required!");
          this.$store.commit("UPDATE_VALIDATEFIELD", false);
          // this.errorMessage = "This field is required!";
        }
      } else if (this.pageActive === 2) {
        if (this.user.company && this.user.employees) {
          if (!this.errorMessage) {
            this.pages[1].validated = true;
            this.$store.commit("UPDATE_PAGEACTIVE", 1);
            this.$store.commit("UPDATE_VALIDATEFIELD", true);
          }
        } else {
          this.$store.commit("UPDATE_ERRORMESSAGE", "This field is required!");
          this.$store.commit("UPDATE_VALIDATEFIELD", false);
        }
      }
    },

    handleReset: function () {
      this.$store.commit("RESET_USERSTATE");
    },
    handleChange: function (event) {
      switch (event.name) {
        case "name":
          this.$store.commit("UPDATE_NAME", event.value);
          this.$store.commit("UPDATE_ERRORMESSAGE", event.errorMessage);
          break;
        case "email":
          this.$store.commit("UPDATE_EMAIL", event.value);
          this.$store.commit("UPDATE_ERRORMESSAGE", event.errorMessage);
          break;
        case "company":
          this.$store.commit("UPDATE_COMPANY", event.value);
          this.$store.commit("UPDATE_ERRORMESSAGE", event.errorMessage);
          break;
        case "employees":
          this.$store.commit("UPDATE_EMPLOYEES", event.value);
          this.$store.commit("UPDATE_ERRORMESSAGE", event.errorMessage);
          break;
      }
    },
    handleCheck(event) {
      this.user.check = event.target.checked;

      if (this.user.check) {
        this.$store.commit("UPDATE_CHECKERROR", "");
      } else this.$store.commit("UPDATE_CHECKERROR", "This field is required!");
    },
    handleSubmit() {},

    log: function (message) {
      console.log(message);
    },
  },
};
</script>

<style scoped>
.form-step {
  width: 900px;
  margin: 0 auto;
}

.form-step__wrap {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgb(0 0 0 / 20%), 6px 12px 20px rgb(0 0 0 / 10%);
  margin-top: 15px;
  padding: 20px;
}

.form-step__btns {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.form-step__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.check-term {
  text-align: left;
  padding-top: 20px;
}
.check-term label {
  margin-left: 6px;
}

.check-term__error {
  color: #aa4651;
  font-size: 12px;
  margin-top: 8px;
}
</style>