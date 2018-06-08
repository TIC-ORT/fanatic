<template>
  <div id="actions" class="mask">
    <h3>Enseñale a Watson cómo siente un hincha argentin@</h3>
    <h2>¿Qué sentimiento vas a hacer?</h2>
    <div class="buttons">
      <button id="victory" @click="takePicture('victory')" @mousedown="holdingAction(true, 'firstKey')" @mouseup="holdingAction(false)"><victory></victory></button>
      <button id="defeat" @click="takePicture('defeat')" @mousedown="holdingAction(true, 'secondKey')" @mouseup="holdingAction(false)"><defeat></defeat></button>
    </div>
  </div>
</template>

<script>
import Victory from './Victory'
import Defeat from './Defeat'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = process.env.FANATIC_KEY
export default {
  name: 'actions',
  components: {
    'victory': Victory,
    'defeat': Defeat
  },
  data () {
    return {
      settingKey: ''
    }
  },
  methods: {
    takePicture (category) {
      var _this = this
      _this.$parent.actionsAvailable = false
      window.setTimeout(function () {
        _this.$parent.timerSeconds = 3
        window.setTimeout(function () {
          var width = 1280
          var height = 720

          var canvas = document.createElement('canvas')
          var context = canvas.getContext('2d')

          canvas.width = width
          canvas.height = height

          context.drawImage(window.webcam, 0, 0, width, height)

          canvas.toBlob(function (blob) {
            _this.upload(blob, category).then(function (res) {
              _this.$parent.feedbackMessage = category
              _this.$parent.feedbackClass = 'success'
              window.setTimeout(function () {
                _this.$parent.feedbackMessage = ''
                _this.$parent.feedbackClass = ''
                _this.$parent.stillPhoto = ''
              }, 1000)
              window.setTimeout(function () {
                _this.$parent.actionsAvailable = true
              }, 1500)
            }).catch(function (err) {
              _this.handleError(err)
            })
          }, 'image/jpeg', 1)

          var data = canvas.toDataURL('image/jpeg')

          _this.$parent.timerSeconds = 0
          _this.$parent.stillPhoto = data
          _this.$parent.feedbackClass = 'loading'
        }, 3000)
      }, 1000)
    },
    keydown (event) {
      var _this = this
      if (_this.settingKey === '') {
        switch (event.keyCode) {
          case parseInt(localStorage.getItem('firstKey')):
            document.getElementById('victory').click()
            break
          case parseInt(localStorage.getItem('secondKey')):
            document.getElementById('defeat').click()
            break
        }
      } else {
        localStorage.setItem(_this.settingKey, event.keyCode)
        _this.settingKey = ''
      }
    },
    upload (photo, category) {
      var data = new FormData()
      data.append('photo', photo)
      data.append('category', category)
      data.append('bucket', process.env.FANATIC_BUCKET)
      return axios.post('https://fanatic-api.mybluemix.net/upload', data)
    },
    handleError (error) {
      var _this = this
      _this.$parent.feedbackMessage = 'Ha ocurrido un error al enviar la imagen'
      _this.$parent.feedbackClass = 'error'
      console.error('Uploading error!', error)
      window.setTimeout(function () {
        _this.$parent.feedbackMessage = ''
        _this.$parent.feedbackClass = ''
        _this.$parent.stillPhoto = ''
      }, 3000)
      window.setTimeout(function () {
        _this.$parent.actionsAvailable = true
      }, 3500)
    },
    holdingAction (holding, action) {
      var _this = this
      if (holding) {
        _this.keyboardTimeout = window.setTimeout(function () {
          window.alert('Presione la tecla que desea configurar a continuación.')
          _this.settingKey = action
        }, 3000)
      } else {
        clearTimeout(_this.keyboardTimeout)
      }
    },
    pushingButton (event) {
      if (this.settingKey === '') {
        if (event.type === 'keydown') {
          if (event.keyCode === parseInt(localStorage.getItem('firstKey'))) {
            this.pushAction('victory')
          } else if (event.keyCode === parseInt(localStorage.getItem('secondKey'))) {
            this.pushAction('defeat')
          }
        } else {
          if (this.actionTimeout !== undefined) {
            clearTimeout(this.actionTimeout)
          }
        }
      } else {
        localStorage.setItem(this.settingKey, event.keyCode)
        this.settingKey = ''
      }
    },
    pushAction (action) {
      this.actionTimeout = window.setTimeout(function () {
        document.getElementById(action).firstChild.classList.add('pressed')
        window.setTimeout(function () {
          document.getElementById(action).click()
        }, 1000)
      }, 500)
    }
  },
  mounted () {
    document.getElementById('actions').style.top = window.webcam.offsetTop + 'px'
    document.addEventListener('keydown', this.pushingButton, false)
    document.addEventListener('keyup', this.pushingButton, false)
  },
  destroyed () {
    // document.removeEventListener('keydown', this.keydown, true)
    // document.removeEventListener('keyup', this.keyup, true)
  }
}
</script>

<style scoped lang="scss">
#actions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h2, h3 {
    font-weight: 700;
    color: white;
    text-align: center;
    text-shadow: 0 0 .25em rgba(0,0,0,.25);
  }
  h2 {
    margin: .75em 4rem 0 4rem;
    font-size: 3em;
  }
  h3 {
    margin: 2em 4rem 0 4rem;
    font-size: 2em;
  }
  div.buttons {
    position: absolute;
    right: 0; bottom: 2em; left: 0;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-evenly;
    button {
      width: 50%;
      height: 25vh;
      appearance: none;
      border: none;
      cursor: pointer;
      transition: all .25s;
      font-family: $main-font;
      background: none;
      div {
        height: 100%;
      }
    }
  }
}
</style>
