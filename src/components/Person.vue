<template>
  <div class="person-wrapper">
    <div class="person-image" :style="{ backgroundImage: 'url(' + imgSrc + ')' }" />
    <p>Person</p>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.person-wrapper {
  display: flex;
  flex-direction: column;
  .person-image {
    border-radius: 50rem;
    background-color: #cccccc;
    height: 5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: height 0.3s ease, width 0.3s ease;
  }
}
</style>