<template>
  <div class="card xl:max-w-lg md:max-w-xl sm:max-w-md max-w-xs rounded overflow-hidden shadow-lg bg-pink-200 p-2 mb-6">
    <audio
      controls
      :src="from === 'Cambridge' ? `https://dictionary.cambridge.org${url}` : url"
      class="my-2 mx-auto outline-none"
    ></audio>
    <div class="code-content" v-html="markedContent"></div>
    <button v-clipboard:copy="content" class="btn btn-pink w-full" @click="copied">Copy</button>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'

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

.code-content {
  /deep/ pre {
    @apply rounded rounded-b-none bg-black px-2;
    min-height: 180px;
  }

  /deep/ code {
    word-wrap: break-word;
    white-space: pre-line;
  }
  /deep/ .hljs {
    display: block;
    overflow-x: auto;
    background: #2b2b2b;
    color: #f8f8f2;
    padding: 0.5em;

    &-comment,
    &-quote {
      color: #d4d0ab;
    }

    &-variable,
    &-template-variable,
    &-tag,
    &-name,
    &-selector-id,
    &-selector-class,
    &-regexp,
    &-hljs-deletion {
      color: #ffa07a;
    }

    &-number,
    &-built_in,
    &-builtin-name,
    &-literal,
    &-type,
    &-params,
    &-meta,
    &-link {
      color: #ffa07a;
    }

    &-attribute {
      color: #ffd700;
    }

    &-string,
    &-symbol,
    &-bullet,
    &-addition {
      color: #abe338;
    }

    &-title,
    &-section {
      color: #00e0e0;
    }

    /* Purple */
    &-keyword,
    &-selector-tag {
      color: #dcc6e0;
    }

    &-emphasis {
      font-style: italic;
    }

    &-strong {
      font-weight: bold;
    }

    @media screen and (-ms-high-contrast: active) {
      &-addition,
      &-attribute,
      &-built_in,
      &-builtin-name,
      &-bullet,
      &-comment,
      &-link,
      &-literal,
      &-meta,
      &-number,
      &-params,
      &-string,
      &-symbol,
      &-type,
      &-quote {
        color: highlight;
      }

      &-keyword,
      &-selector-tag {
        font-weight: bold;
      }
    }
  }
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
