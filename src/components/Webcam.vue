<template>
  <video id="webcam" width="1920" height="1080"></video>
</template>

<script>
export default {
  name: 'webcam',
  mounted () {
    var _this = this
    window.webcam = document.getElementById('webcam')
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { min: 1280, ideal: 1920 },
        height: { min: 720, ideal: 1080 }
      }
    }).then(function (stream) {
      window.webcam.srcObject = stream
      window.webcam.play()
      _this.$parent.feedbackMessage = ''
      _this.$parent.feedbackClass = ''
      _this.$parent.actionsAvailable = true
    }).catch(function (err) {
      console.log('An error occured! ' + err)
    })
  }
}
</script>

<style scoped lang="scss">
video {
  display: block;
  width: 80%;
  height: 65vh;
  max-width: 1280px;
  margin: 5vh auto;
  box-shadow: 0 0 0 1em rgba(255,255,255,0.25);
  border-radius: .0625em;
  object-fit: cover;
}
</style>
