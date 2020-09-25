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
import BaseFormFieldMixin from '@/mixins/BaseFormFieldMixin'

export default {
  mixins: [BaseFormFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    selectClass: {
      type: String
    }
  }
}
</script>
