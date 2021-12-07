<template>
	<div>
		<block v-for="(block, index) in document" :key="index" :block="block"></block>
	</div>
</template>

<script>
import block from './Block.vue'

export default {
	props: {
		document: {
			type: Array,
			required: true,
		}
	},
	components: {
		block
	}
}
</script>