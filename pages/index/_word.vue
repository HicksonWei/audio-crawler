<template>
  <div>
    <div v-if="loading" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <LoadingIcon />
    </div>
    <div v-else class="flex flex-col justify-center">
      <h1 v-if="audioObj.audioArray.length !== 0" class="sm:text-6xl text-4xl text-center my-16 text-orange-400">
        {{ audioObj.word }}
      </h1>
      <div class="flex flex-row flex-wrap justify-around items-stretch content-start">
        <Card v-for="(item, index) in audioObj.audioArray" :key="index" :url="item" :from="audioObj.from" />
        <div
          v-if="audioObj.audioArray.length > 1 && audioObj.audioArray.length % 2 === 1"
          class="card xl:max-w-lg md:max-w-xl sm:max-w-md max-w-xs rounded overflow-hidden shadow-lg opacity-0 p-2 mb-6"
        ></div>
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

.card {
  flex: 0 0 600px;

  @media (max-width: 1280px) {
    flex: 0 0 48%;
    margin: 0 1% 20px 1%;
  }

  @media (max-width: 640px) {
    flex: 0 0 100%;
    margin: 0 0 20px 0;
  }
}
</style>
