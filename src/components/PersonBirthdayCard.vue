<template>
  <div class="person-birthday-card ">
    <svg
      width="663"
      height="241"
      viewBox="0 0 663 241"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M363.117 132.262L363.029 0L303.137 0.095528L303.225 132.357L363.117 132.262Z"
        fill="#FF00FF"
      />
      <path
        d="M584.773 240.729L662.117 142.748L615.121 105.667L537.777 203.647L584.773 240.729Z"
        fill="#FF00FF"
      />
      <path
        d="M123.314 204.607L47.6147 105.48L0.000109177 141.86L75.6996 240.987L123.314 204.607Z"
        fill="#FF00FF"
      />
    </svg>

    <div
      class="person-birthday-card-img"
      :style="{ backgroundImage: 'url(' + imgSrc + ')' }"
    />
    <p class="animate__animated infinite  animate__swing ">
      Grattis {{ surName }}!
    </p>
  </div>
</template>

<script>
export default {
  props: ["imgSrc", "surName"],
};
</script>

<style lang="scss">
$width: calc(100vw / 5);
svg {
  max-width: calc(100vw / 4);
  max-height: calc(100vw / 4);
}

.person-birthday-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 662px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 4vw;
  line-height: 4vw;
  text-align: center;
  .person-birthday-card-img {
    width: $width;
    height: $width;
    border-radius: 50%;
    margin: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
