<template>
  <div id="actions" class="mask">
    <h2>¿Qué gesto vas a hacer?</h2>
    <div class="buttons">
      <button id="neutral" @click="takePicture('neutral')">Neutral</button>
      <button id="happy" @click="takePicture('happy')">Feliz</button>
      <button id="angry" @click="takePicture('angry')">Enojado</button>
      <button id="sad" @click="takePicture('sad')">Triste</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'actions',
  methods: {
    takePicture (category) {
      var _this = this
      _this.$parent.actionsAvailable = false
      window.setTimeout(function () {
        _this.$parent.timerSeconds = 5
        window.setTimeout(function () {
          var width = 960
          var height = 720

          var canvas = document.createElement('canvas')
          var context = canvas.getContext('2d')

          canvas.width = width
          canvas.height = height

          context.drawImage(window.webcam, 0, 0, width, height)

          canvas.toBlob(function (blob) {
            _this.getURL(category).then(function (presigned) {
              _this.upload(blob, presigned.data.url).then(function (res) {
                _this.$parent.stillPhoto = ''
                window.setTimeout(function () {
                  _this.$parent.actionsAvailable = true
                }, 1000)
              }).catch(function (err) {
                console.log('Uploading error!', err)
              })
            }).catch(function (err) {
              console.log('Presigned URL error!', err)
            })
          }, 'image/jpeg', 1)

          var data = canvas.toDataURL('image/jpeg')

          _this.$parent.timerSeconds = 0
          _this.$parent.stillPhoto = data
        }, 5000)
      }, 1000)
    },
    keydown (event) {
      switch (event.keyCode) {
        case 65:
          document.getElementById('neutral').click()
          break
        case 49:
          document.getElementById('happy').click()
          break
        case 66:
          document.getElementById('angry').click()
          break
        case 50:
          document.getElementById('sad').click()
          break
      }
    },
    getURL (category) {
      return axios.post('https://openwhisk.ng.bluemix.net/api/v1/web/tic%40ort.edu.ar_TIC/default/upload.json', {
        content_type: 'image/jpeg',
        category: category
      })
    },
    upload (photo, destiny) {
      return axios({
        method: 'put',
        url: destiny,
        headers: { 'content-type': photo.type },
        data: photo
      })
    }
  },
  mounted () {
    document.getElementById('actions').style.top = window.webcam.offsetTop + 'px'
    document.addEventListener('keydown', this.keydown, false)
  },
  destroyed () {
    document.removeEventListener('keydown', this.keydown, true)
  }
}
</script>

<style scoped lang="scss">
#actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    margin: 0 2em 1em 2em;
    font-size: 4em;
    font-weight: 700;
    color: white;
    text-align: center;
    text-shadow: 0 0 .25em rgba(0,0,0,.25);
  }
  div.buttons {
    margin: 0 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 10em;
      height: 10em;
      appearance: none;
      border-radius: 100%;
      border: none;
      cursor: pointer;
      box-shadow: 0 .25em .25em rgba(0,0,0,.25);
      transition: all .25s;
      font-family: $main-font;
      background-size: 95%;
      background-position: center;
      background-repeat: no-repeat;
      text-indent: -9000px;
      &#neutral {
        background-color: #eee;
        // border-color: darken(#eee, 5%);
        // color: darken(#eee, 50%);
        background-image: url('/static/img/twemoji/1f610.svg');
      }
      &#happy {
        background-color: #7ed321;
        // border-color: darken(#7ed321, 5%);
        // color: darken(#7ed321, 15%);
        background-image: url('/static/img/twemoji/1f603.svg');
      }
      &#angry {
        background-color: #b0021b;
        // border-color: darken(#b0021b, 5%);
        // color: darken(#b0021b, 15%);
        background-image: url('/static/img/twemoji/1f621.svg');
      }
      &#sad {
        background-color: #4a90e2;
        // border-color: darken(#4a90e2, 5%);
        // color: darken(#4a90e2, 15%);
        background-image: url('/static/img/twemoji/1f622.svg');
      }
      &:hover {
        transform: scale(1.15);
        box-shadow: 0 .5em .25em rgba(0,0,0,.25);
      }
      &:active {
        transform: scale(1);
        box-shadow: 0 .25em .25em rgba(0,0,0,.25), inset 0 0 .25em rgba(0,0,0,.25);
      }
    }
  }
}
</style>
