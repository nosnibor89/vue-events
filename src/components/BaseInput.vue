<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input type="text"
           @input="updateValue"
           v-bind="$attrs"
           v-on="listeners"
           :class="inputClass"/>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    inputClass: {
      type: String
    }
  },
  methods: {
    updateValue($event) {
      this.$emit('input', $event.target.value)
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>
