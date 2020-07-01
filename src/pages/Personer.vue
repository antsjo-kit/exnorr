<template>
  <div class="personer-page">
    <!-- <hooper :settings="hooperSettings" class="personer-slider">
      <slide v-for="({ node }, i) in $page.persons.edges" :index="i" :key="i">
        <Person :imgSrc="node.bild.file.url" />
      </slide>
    </hooper> -->
    <div class="personer-slider">
      <flickity ref="flickity" :options="flickityOptions">
        <div class="carousel-cell">1</div>
        <div class="carousel-cell">2</div>
        <div class="carousel-cell">3</div>
        <div class="carousel-cell">4</div>
        <div class="carousel-cell">5</div>
        <div class="carousel-cell">6</div>
        <div class="carousel-cell">7</div>
      </flickity>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import Flickity from "vue-flickity";
import "hooper/dist/hooper.css";
import Person from "@/components/Person";

export default {
  name: "App",
  components: {
    Flickity,
  },

  data() {
    return {
      flickityOptions: {
        initialIndex: 3,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,

        // any options from Flickity can be used
      },
    };
  },

  methods: {
    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #aaa;
  counter-increment: a;
  width: 14.28%; /* half-width */
  height: 160px;
  margin-right: 10px;
}
.personer-page {
  background: black;
  height: 100%;
  min-height: 100%;

  .personer-slider {
    color: white;
    width: 1180px;
    margin: 0 auto;
  }
  .hooper-slide {
    &.is-active {
      background: green;
      &:nth-child(1) {
        margin: 5px;
      }
    }
  }
}
</style>

<page-query>
query {
  persons: allContentfulPerson {
    edges {
      node {
        id
        fornamn
        efternamn
        fodelsedatum
        bild {
          file {
            url
          },
          title
        },
      }
    }
  }
}
</page-query>
