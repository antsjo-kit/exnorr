<template>
  <Layout>
    <div class="slideshow" :class="{ show: !loading }">
      <agile
        :nav-buttons="false"
        ref="agilecarousel"
        fade="fade"
        v-if="
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
      <div class="news-container" v-if="articles && articles.length">
        <div class="news" :key="articles[selectedIndex].url">
          <div
            v-if="articles[selectedIndex].urlToImage"
            class="news-img"
            :style="{
              backgroundImage:
                'url(' + articles[selectedIndex].urlToImage + ')',
            }"
          ></div>
          <h1
            class="news-title animate__animated animate__backInLeft"
            v-if="articles[selectedIndex].title"
          >
            {{ articles[selectedIndex].title }}
          </h1>
          <p class="news-date" v-if="articles[selectedIndex].publishedAt">
            {{ articles[selectedIndex].publishedAt | moment("LLL") }}
          </p>
        </div>

        <transition name="fade" mode="out-in">
          <div class="news-progress " :key="articles[selectedIndex].url">
            <div class="news-progress-fill"></div>
          </div>
        </transition>
      </div>
      <div class="digital-clock">
        <digital-clock :blink="true" />
        <p class="date">{{ new Date() | moment("LL") }}</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import DigitalClock from "vue-digital-clock";

export default {
  components: {
    DigitalClock,
  },
  data() {
    return {
      fact: null,
      articles: null,
      selectedIndex: 0,
      newsInterval: null,
      loading: true,
    };
  },
  mounted() {
    this.slidePageInterval = window.setInterval(() => {
      this.$router.push({ path: "/persons" });
    }, 600000);
  },
  async created() {
    this.setLanguage();
    this.getNews();
    this.fadeInLoadingInterval = window.setInterval(() => {
      this.loading = false;
    }, 1000);
  },
  computed: {
    progress: function() {
      return (this.selectedIndex / (this.articles.length - 1)) * 100;
    },
  },
  beforeDestroy() {
    clearInterval(this.newsInterval);
    clearInterval(this.slidePageInterval);
    clearInterval(this.fadeInLoadingInterval);
  },
  methods: {
    setLanguage() {
      this.$moment.locale("sv");
      console.log(this.$moment.locale());
    },

    switchNews() {
      if (this.articles && this.articles.length) {
        this.$nextTick(() => {
          this.newsInterval = window.setInterval(() => {
            if (this.selectedIndex < this.articles.length - 1) {
              this.selectedIndex++;
              this.$refs.agilecarousel.goToNext();
            } else {
              this.selectedIndex = 0;
            }
          }, 30000);
        });
      }
    },
    async getNews() {
      const url =
        "http://newsapi.org/v2/top-headlines?" +
        "country=se&" +
        `apiKey=e6351516c969426580878a07518bc70e`;
      try {
        const {
          data: { articles: articles },
        } = await axios.get(url);
        if (articles) {
          this.articles = articles;
          this.switchNews();
        }
        console.log({ news: articles });
      } catch (error) {
        console.log({ error: error });
      }
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
@keyframes newsprogress {
  0% {
    transform: scaleX(0);
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fadenews {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.digital-clock {
  position: absolute;
  bottom: 12%;
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
.news-progress {
  width: 100%;
  height: 5px;
  position: relative;
  background: rgba($color: white, $alpha: 0.1);
  backdrop-filter: blur(8px);
  animation: newsprogress 1s ease-in-out;
  transform-origin: left;

  .news-progress-fill {
    position: absolute;
    background: #ff00ff;
    left: 0;
    bottom: 0;
    height: 100%;
    opacity: 0;
    width: 100%;
    transform: scaleX(0);
    will-change: transform;
    animation: newsprogress 30s ease-in-out;
    transform-origin: left;
  }
}
.news-container {
  color: white;
  position: absolute;
  z-index: 999;
  bottom: 15%;
  left: 5%;
  width: 30%;
  .news {
    background: rgba($color: #000000, $alpha: 0.1);
    backdrop-filter: blur(8px);
    padding: 1.2rem;
    transform: scale(1);
    will-change: transform;
    animation: fadenews 30s ease-in-out;
    transform-origin: bottom left;
    .news-img {
      background-size: cover !important;
      background-position: top !important;
      background-repeat: no-repeat !important;
      height: 300px;
      width: 100%;
    }
    .news-title {
      font-size: 2.8rem;
      line-height: 3.9rem;
    }
    .news-date {
      font-size: 1rem;
      line-height: 1rem;
      opacity: 0.5;
      text-transform: uppercase;
    }
    img {
      width: 100%;
      display: block;
      max-width: 100%;
      height: auto;
      min-height: 268px;
      max-height: 500px;
      background: rgba($color: #000000, $alpha: 0.9);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slideshow {
  opacity: 0;
  transition: opacity 3s ease;
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
