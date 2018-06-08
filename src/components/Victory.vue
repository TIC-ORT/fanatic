<template>
  <div id="victory">
    <img class="emojis" src="/static/img/actions/victory-emojis.svg" width="480" height="240" alt="Victory Emojis" />
    <img class="background" src="/static/img/actions/victory-background.svg" width="480" height="240" alt="Confetti" />
    <img class="text" src="/static/img/actions/victory-text.svg" width="480" height="240" alt="Festejo" />
  </div>
</template>

<script>
export default {
  name: 'victory'
}
</script>

<style scoped lang="scss">
  #victory {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      display: block;
      width: auto;
      height: 100%;
      margin: 0 auto;
      right: 0; left: 0;
      &.background {
        opacity: 0;
      }
    }
    &:hover {
      img.emojis {
        animation: bounce ease 1s;
      }
      img.background {
        animation: fadeInDown ease 1s;
        animation-fill-mode: both;
      }
      img.text {
        animation: pulse ease 1s;
      }
    }
  }
</style>