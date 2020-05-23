
const permission = {
    inserted(el, binding){
        console.log(binding);
        // if (role !== binding.value) {
        //     el.parentElement.removeChild(el);
        // }
    }
}

export default { permission }