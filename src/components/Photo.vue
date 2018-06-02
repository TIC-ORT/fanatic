<template>
  <img :src="source" width="1280" height="1024" alt="Webcam´s still photo" id="photo" class="mask" />
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
@keyframes photoBurn {
  from {
    opacity: 0;
    filter: blur(100px) contrast(500%);
  }
  to {
    opacity: 1;
    filter: blur(0) contrast(100%);
  }
}
#photo {
  object-fit: cover;
  z-index: 1000;
  animation: photoBurn ease 1s;
}
</style>