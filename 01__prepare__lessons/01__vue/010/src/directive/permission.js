import Vue from 'vue'


const permission = Vue.directive('permission', {
    inserted(el, binding){
        console.log(binding);
        // if (role !== binding.value) {
        //     el.parentElement.removeChild(el);
        // }
    }
})

export { permission }