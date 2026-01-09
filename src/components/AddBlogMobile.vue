<style scoped>
  .Btn {
    align-items: center;
    justify-content: flex-start;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 0px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    margin-right: .5vw;
    margin-bottom: 1vh;
  }

  /* plus sign */
  .sign {
    width: 100%;
    font-size: 2em;
    color: var(--text);
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: var(--text);
    font-size: 1em;
    font-weight: 500;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 115px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 20px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }
  @media (max-width: 768px){
    .Btn{
        display: flex;
    }
  }
</style>

<template>
  <button class="Btn">

    <div class="sign">+</div>

    <div class="text">Create</div>
  </button>
</template>
