<template>
  <main>
    <video id="webcam" width="1280" height="720"></video>
  </main>
</template>

<script>
export default {
  name: 'home',
  mounted: function () {
    window.webcam = document.getElementById('webcam')
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
      window.webcam.srcObject = stream
      window.webcam.play()
    }).catch(function (err) {
      console.log('An error occured! ' + err)
    })
  }
}
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  video {
    width: 100%;
    height: auto;
  }
}
</style>
