<template>
  <div class="buttons">
    <confetti-button>Confirm (Default)</confetti-button>
    <confetti-button variant="white">Confirm (White)</confetti-button>
    <confetti-button variant="grey">Confirm (Grey)</confetti-button>
  </div>
</template>

<script>
import ConfettiButton from "vue-confetti-button";

export default {
  name: "App",
  components: {
    ConfettiButton
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap");

* {
  font-family: "Fira Sans", Arial;
  letter-spacing: 1px;
}
.buttons {
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f6f8ff;
}
</style>
