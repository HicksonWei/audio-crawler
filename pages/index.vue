<template>
  <div class="container mx-auto">
    <div
      class="search__block flex flex-col justify-center items-center max-w-xl mx-auto"
      :class="{ dirty: afterFirstSearch }"
    >
      <!-- 查詢 block -->
      <h1 class="text-white sm:text-6xl text-4xl font-bold mb-3">Audio Searcher</h1>
      <div class="flex md:max-w-xl sm:max-w-md max-w-xs mb-2">
        <input
          :value="input"
          type="text"
          class="w-96 p-2 shadow rounded rounded-r-none bg-gray-200 border-2 focus:outline-none focus:bg-white focus:border-pink-500 appearance-none"
          placeholder="Please input some text..."
          @input="modifyInput($event)"
          @keyup.enter="submit"
        />
        <button class="btn btn-pink" @click="submit">Search!</button>
      </div>
      <select v-model="selectedSite" class="shadow rounded focus:outline-none focus:bg-white w-48 py-1 px-2">
        <option value="Cambridge">Cambridge</option>
        <option value="Oxford">Oxford</option>
      </select>
    </div>
    <div>
      <!-- 頁面切換 -->
      <nuxt-child v-if="childOpen" :audio-obj="audioObj" :loading="loading" />
      <!-- <div v-else>No Word</div> -->
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  data() {
    return {
      loading: false,
      input: '',
      audioObj: {},
      //- 控制 nuxt-child 顯示
      childOpen: false,
      //- 是否為第一次搜尋
      afterFirstSearch: false,
      selectedSite: 'Cambridge'
    }
  },
  methods: {
    modifyInput(e) {
      e.target.value = e.target.value.replace(/^[\s-]+/g, '')
      e.target.value = e.target.value.replace(/([\s-])\1+/g, '$1')
      e.target.value = e.target.value.replace(/(-)([\s]+)/g, '$1')
      e.target.value = e.target.value.replace(/(\s)([-]+)/g, '$1')
      e.target.value = e.target.value.replace(/[^A-Za-z\s-]*/g, '')
      this.input = e.target.value
    },
    submit() {
      if (this.input === '') {
        this.$toast.global.t_error({
          message: 'Please input some text!'
        })
        return
      }
      if (!this.afterFirstSearch) {
        this.firstSearch()
      }
      this.$router.push({ path: `/${this.input}`, query: { q: this.selectedSite } })
      this.input = ''
    },
    firstSearch() {
      gsap.to('.search__block', {
        duration: 0.5,
        ease: 'power1'
      })
      this.afterFirstSearch = true
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler({ params }, from) {
        const self = this
        self.loading = true
        if (params.word) {
          self.childOpen = true
          self.afterFirstSearch = true
          let obj = {}
          if (self.selectedSite === 'Oxford') {
            obj = await self.$axios.$get(`https://audiosearcher.now.sh/${params.word}?q=oxford`)
          } else {
            obj = await self.$axios.$get(`https://audiosearcher.now.sh/${params.word}?q=cambridge`)
          }
          console.log(obj)
          const { status, message, audioArray, from } = obj
          const audioSet = [...new Set(audioArray)]
          self.audioObj = { word: params.word, status, message, audioArray: audioSet, from }
        }
        self.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search__block {
  position: relative;
  transform: translateY(calc(50vh - 110px));

  @media (max-width: 640px) {
    transform: translateY(calc(50vh - 89px));
  }

  &.dirty {
    transform: inherit;
    transition: transform 0.3s ease-in-out;
  }
}

h1 {
  font-family: 'Ubuntu', sans-serif;
}
.btn {
  @apply font-bold py-2 px-4 rounded rounded-l-none;
}
.btn-pink {
  @apply bg-pink-500 text-white;
}
.btn-pink:hover {
  @apply bg-pink-700;
}
</style>
