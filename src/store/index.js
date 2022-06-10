import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

const defaultUser = () => {
    return {
        name: "",
        email: "",
        company: "",
        employees: "",
        selected: null,
        check: false,
    }
}
export default new Vuex.Store({
    state: {
        pages: [
            { page: 1, validated: false, name: "About You" },
            { page: 2, validated: false, name: "About your Company" },
            { page: 3, validated: false, name: "Finishing Up" },
        ],
        listSelectItems:["Friend","FaceBook","Website"],
        pageActive: 1,
        user: defaultUser(),
        errorMessage: "",
        checkError: "",
        validFeild:null
    },
    mutations: {
        RESET_USERSTATE(state) {
            Object.assign(state.user, defaultUser())
            state.pageActive=1
        },
        HANDLE_PERV(state) {
            state.pageActive--
        },
        UPDATE_PAGEACTIVE(state, payload) {
            state.pageActive +=payload
        },
        UPDATE_VALIDATEFIELD(state, payload) {
            state.validFeild =payload
        },
        UPDATE_ERRORMESSAGE(state, payload) {
            state.errorMessage = payload
        },
        UPDATE_CHECKERROR(state, payload) {
            state.checkError = payload
        },
        UPDATE_NAME(state, payload) {
            state.user.name = payload
        },
        UPDATE_EMAIL(state, payload) {
            state.user.email = payload
        },
        UPDATE_COMPANY(state, payload) {
            state.user.company = payload
        },
        UPDATE_EMPLOYEES(state, payload) {
            state.user.employees = payload
        },
        UPDATE_SELECTED(state, payload) {
            state.user.selected = payload
        },
        UPDATE_ACCEPTSUBMIT(state, payload) {
            state.user.acceptSubmit = payload
        },
    },
    actions: {
        resetUserState({ commit }) {
            commit('RESET_USERSTATE')
        },
    },
    getters: {
        isError(state){
            return state.errorMessage?.length !== 0? true : false;
        }
    }
});