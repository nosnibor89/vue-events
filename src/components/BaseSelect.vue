<template>
    <div class="field">
        <label v-if="label">{{label}}</label>
        <select @input="$emit('input', $event.target.value)"
                v-bind="$attrs">
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
    value: {
      type: [String, Number]
    }
  }
}
</script>
