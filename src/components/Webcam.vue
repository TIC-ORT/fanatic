<template>
  <video id="webcam" width="960" height="720"></video>
</template>

<script>
export default {
  name: 'webcam',
  mounted () {
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
video {
  width: auto;
  max-height: 60vh;
  box-shadow: 0 0 0 1em rgba(255,255,255,0.25);
  border-radius: .0625em;
}
</style>
