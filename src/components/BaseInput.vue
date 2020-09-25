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
import BaseFormFieldMixin from '@/mixins/BaseFormFieldMixin'

export default {
  mixins: [BaseFormFieldMixin],
  props: {
    inputClass: {
      type: String
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
