<template>
  <div id="defeat">
    <img class="emojis" src="/static/img/actions/defeat-emojis.svg" width="480" height="240" alt="Defeat Emojis" />
    <img class="background" src="/static/img/actions/defeat-background.svg" width="480" height="240" alt="Defeat Background" />
    <img class="text" src="/static/img/actions/defeat-text.svg" width="480" height="240" alt="Derrota" />
  </div>
</template>

<script>
export default {
  name: 'defeat'
}
</script>

<style scoped lang="scss">
  #defeat {
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
    &:hover, &.feedback {
      img.emojis {
        animation: shake ease 1s;
      }
      img.background {
        animation: fadeIn ease 1s;
        animation-fill-mode: both;
      }
    }
    &:hover {
      img.text {
        animation: swing ease 1s;
      }
    }
    &.feedback {
      img.text {
        animation: slideInDown ease 1s;
      }
    }
  }
</style>