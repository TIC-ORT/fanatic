<template>
  <div id="photo" class="mask">
    <img :src="source" width="960" height="720" alt="Webcam´s still photo" />
  </div>
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
  from {
    opacity: 0;
    filter: blur(100px) contrast(500%);
  }
  to {
    opacity: 1;
    filter: blur(0) contrast(100%);
  }
}
@keyframes loading {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
#photo {
  z-index: 1000;
  background: #fff;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::after {
    content: '';
    display: block;
    width: 2em;
    height: 2em;
    position: absolute;
    top: 1em; right: 1em;
    border: solid .125em white;
    border-radius: 100%;
    animation: loading ease 1s infinite;
    box-shadow: 0 0 .5em rgba(0,0,0,.25);
    transition: all ease .5s;
  }
  &.animated::after {
    background-color: white;
    animation: none;
  }
}
.burnIn {
  animation: photo-burn ease 1s;
}
</style>
