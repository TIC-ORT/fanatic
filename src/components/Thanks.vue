<template>
  <div id="thanks">
    <img class="emojis" src="/static/img/actions/thanks-emojis.svg" width="480" height="240" alt="Thanks Emojis" />
    <img class="background" src="/static/img/actions/victory-background.svg" width="480" height="240" alt="Confetti" />
    <img class="text" src="/static/img/actions/thanks-text.svg" width="480" height="240" alt="Gracias" />
  </div>
</template>

<script>
export default {
  name: 'thanks'
}
</script>

<style scoped lang="scss">
  #thanks {
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
    &:hover, &.pressed, &.feedback {
      img.emojis {
        animation: bounce ease 1s;
      }
      img.background {
        animation: fadeInDown ease 1s;
        animation-fill-mode: both;
      }
    }
    &:hover, &.pressed {
      img.text {
        animation: pulse ease 1s;
      }
    }
    &.feedback {
      img.text {
        animation: zoomInUp ease 1s;
      }
    }
  }
</style>