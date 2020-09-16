<template>
    <div class="field">
        <label v-if="label">{{label}}</label>
        <input type="text"
               @input="$emit('input', $event.target.value)"
               v-bind="$attrs"
        />
    </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number]
    }
  }
}
</script>
