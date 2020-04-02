<template>
  <div>
    <div v-if="loading" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <LoadingIcon />
    </div>
    <div v-else>
      <h1 v-if="audioObj.audioArray.length !== 0" class="sm:text-6xl text-4xl text-center my-16 text-orange-400">
        {{ audioObj.word }}
      </h1>
      <div class="flex flex-row flex-wrap sm:justify-start justify-center items-stretch content-start">
        <Card v-for="(item, index) in audioObj.audioArray" :key="index" :url="item" :from="audioObj.from" />
      </div>
      <p v-if="audioObj.audioArray.length === 0" class="text-center text-red-500 font-bold mt-12">
        Sorry, your search terms did not match any definitions.
      </p>
    </div>
  </div>
</template>

<script>
import LoadingIcon from '~/components/LoadingIcon'
import Card from '~/components/Card'

export default {
  components: {
    LoadingIcon,
    Card
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    audioObj: {
      default() {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'Bree Serif', serif;
}
</style>
