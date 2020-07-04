<template>
  <Layout>
    <ClientOnly>
      <div class="slideshow" :class="{ show: !loading }">
        <agile
          :nav-buttons="false"
          ref="agilecarousel"
          :fade="true"
          :speed="800"
          :autoplay="true"
          :autoplay-speed="5000"
          :initial-slide="1"
          v-show="
            $page &&
              $page.images &&
              $page.images.edges &&
              $page.images.edges[0] &&
              $page.images.edges[0].node &&
              $page.images.edges[0].node.bilder
          "
        >
          <div
            :key="indx"
            v-for="(slide, indx) of $page.images.edges[0].node.bilder"
            class="slideshow-img"
            :style="{
              background:
                'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url(' +
                slide.file.url +
                '?w=1920' +
                ')',
            }"
          ></div>
        </agile>
        <div class="digital-clock">
          <digital-clock :blink="true" />
          <p class="date">{{ new Date() | moment("LL") }}</p>
        </div>
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import DigitalClock from "vue-digital-clock";

export default {
  components: {
    DigitalClock,
  },
  data() {
    return {
      selectedIndex: 0,
      loading: true,
      fadeInLoadingInterval: null,
      changeSlideInterval: null,
      slidePageInterval: null,
    };
  },
  mounted() {
    this.setLanguage();
    if (process.isClient) {
      // browser only code
      this.slidePageInterval = setInterval(() => {
        this.$router.push({ path: "/persons" });
      }, 300000);
      if (this.$refs && this.$refs.agilecarousel) {
        this.changeSlideInterval = setInterval(() => {
          this.$refs.agilecarousel.goToNext();
        }, 15000);
      }
    }
  },
  async created() {
    if (process.isClient) {
      // browser only code
      this.fadeInLoadingInterval = setInterval(() => {
        this.loading = false;
      }, 1000);
    }
  },
  beforeDestroy() {
    if (this.fadeInLoadingInterval) {
      clearInterval(this.fadeInLoadingInterval);
    }
    if (this.changeSlideInterval) {
      clearInterval(this.changeSlideInterval);
    }
    if (this.slidePageInterval) {
      clearInterval(this.slidePageInterval);
    }
  },
  methods: {
    setLanguage() {
      this.$moment.locale("sv");
      console.log(this.$moment.locale());
    },
  },
};
</script>

<page-query>
query {
  images: allContentfulBakgrundsbilder {
    edges {
      node {
        bilder {
          id
          file {
            url
          }
        }
      }
    }
  }
}

</page-query>

<style lang="scss">
.digital-clock {
  position: absolute;
  bottom: 8%;
  right: 5%;
  line-height: 7vw;
  color: white;
  z-index: 999;
  display: flex;
  flex-direction: column;
  text-align: right;
  time {
    display: inline-flex;
  }
  .date {
    line-height: 0.1rem;
    font-weight: normal;
    font-size: 2.8rem;
  }
  span {
    display: inline-flex;
    font-size: 8vw;
  }
}

.slideshow {
  opacity: 0;
  transition: opacity 3s ease;
  height: 100vh;
  &.show {
    opacity: 1;
  }
  background: black;
  position: relative;
  .fact-container {
    position: absolute;
    z-index: 9999;
    bottom: 5%;
    left: 5%;
    .fact {
      width: calc(100vh / 1);
      max-height: 35vw;
      color: white;
      font-family: Arial;
      font-style: normal;
      font-weight: normal;
      line-height: inherit;

      .fact-text {
        line-height: initial;
      }
      .fact-source {
        font-size: 14px;
        line-height: 16px;
        opacity: 0.2;
      }
    }
  }
}
.slideshow-img {
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  height: 100vh;
  width: 100%;
}
.slide {
  display: block;
  height: 100vh;
  object-fit: cover;
  width: 100%;
}
</style>
