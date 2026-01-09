<script setup>
  import { defineEmits } from 'vue';
  const props = defineProps({
    modelValue: Boolean
  })
  const emit = defineEmits(['menuChange',"update:modelValue"])
  const changeState =()=>{ 
      emit("menuChange",)
  }
</script>
<style scoped>
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: .3s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: var(--text);
    border-radius: 5px;
    transition-duration: .3s;
  }

  /* #checkbox:checked + .toggle .bars {
    margin-left: 13px;
  } */

  #checkbox:checked + .toggle #bar2 {
    transform: translateY(14px) rotate(60deg);
    margin-left: 0;
    transform-origin: right;
    transition-duration: .3s;
    z-index: 2;
  }

  #checkbox:checked + .toggle #bar1 {
    transform: translateY(28px) rotate(-60deg);
    transition-duration: .3s;
    transform-origin: left;
    z-index: 1;
  }

  #checkbox:checked + .toggle {
    transform: rotate(-90deg);
  }
  /* #checkbox:checked + .toggle #bar3 {
    transform: rotate(90deg);
    transition-duration: .3s;
    transform-origin:right;
  } */
@media (max-width:768px){
    .toggle{
        display: flex;
        margin: 0 .5rem;
    }
}
</style>

<template>
  <input id="checkbox" type="checkbox" @click="changeState" :checked="props.modelValue" @change="emit('update:modelValue', $event.target.checked)">
      <label class="toggle" for="checkbox">
          <div id="bar1" class="bars"></div>
          <div id="bar2" class="bars"></div>
          <div id="bar3" class="bars"></div>
      </label>
</template>
