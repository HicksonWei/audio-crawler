<template>
  <div class="card xl:max-w-lg md:max-w-xl sm:max-w-md max-w-xs rounded overflow-hidden shadow-lg bg-pink-200 p-2 mb-6">
    <audio
      controls
      :src="from === 'Cambridge' ? `https://dictionary.cambridge.org${url}` : url"
      class="my-2 mx-auto outline-none"
    ></audio>
    <div v-html="markedContent"></div>
    <button v-clipboard:copy="content" class="btn btn-pink w-full" @click="copied">Copy</button>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/a11y-dark.css'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: `
        <audio
          controls
          src="https://dictionary.cambridge.org${this.url}">
        </audio>
      `
    }
  },
  computed: {
    markedContent() {
      return marked(this.content, {
        highlight(md) {
          return highlight.highlight('html', md).value
        }
      })
    }
  },
  methods: {
    copied() {
      this.$toast.global.t_success({
        message: 'Copied!'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  flex: 0 0 30%;

  @media (max-width: 576px) {
    flex: 0 0 100%;
  }
}

/deep/ code {
  word-wrap: break-word;
  white-space: pre-line;
}

/deep/ pre {
  min-height: 10rem;
  @apply rounded rounded-b-none bg-black p-2;
}

.btn {
  @apply font-bold py-2 px-4 rounded rounded-t-none;
}
.btn-pink {
  @apply bg-pink-500 text-white;
}
.btn-pink:hover {
  @apply bg-pink-700;
}
</style>
