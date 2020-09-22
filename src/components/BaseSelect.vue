<template>
    <div class="field">
        <label v-if="label">{{label}}</label>
        <select @change="updateValue"
                v-bind="$attrs"
                v-on="$listeners"
                :class="selectClass">
            <option value="" :selected="'' === value">Select an option</option>
            <option v-for="option in options" :key="option" :selected="option === value">{{ option }}</option>
        </select>
    </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String
    },
    selectClass: {
      type: String
    },
    value: {
      type: [String, Number]
    }
  },
  methods: {
    updateValue($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
</script>
