<template>
  <img :src="source" width="960" height="720" alt="Webcam´s still photo" id="photo" class="mask" />
</template>

<script>
export default {
  name: 'photo',
  props: {
    source: {
      type: String,
      default: '#'
    }
  },
  mounted () {
    document.getElementById('photo').style.top = window.webcam.offsetTop + 'px'
  }
}
</script>

<style scoped lang="scss">
@keyframes photo-burn {
  0% {
    opacity: 0;
    filter: blur(100px) contrast(500%);
  }
  10% {
    opacity: 1;
    filter: blur(0) contrast(100%);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-500%) scale(.5);
  }
}
#photo {
  object-fit: cover;
  z-index: 1000;
  background: #fff;
  animation: photo-burn ease 5s;
}
</style>
