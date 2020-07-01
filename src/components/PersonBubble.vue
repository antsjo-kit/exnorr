<template>
  <div class="person-bubble">
    <div class="person-img-container">
      <div
        class="person-img"
        :style="{ backgroundImage: 'url(' + imgSrc + ')' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
    },
    altText: {
      type: String,
    },
    surName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: String,
    },
  },
  components: {},
};
</script>

<style lang="scss">
.person-bubble {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  .person-img-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .person-img {
      border-radius: 50rem;
      background-color: #cccccc;
      height: 10rem;
      width: 10rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .person-info {
  }
}
</style>
