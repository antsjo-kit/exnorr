<template>
  <div class="layout">
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
  </div>
</template>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  overflow: hidden;
  padding: 0;
  line-height: 1.5;
  height: 100vh;
}
.layout {
  height: 100vh;
  background: black;
}
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
main {
  height: 100vh;
}
</style>
