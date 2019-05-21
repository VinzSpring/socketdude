<template>
<v-tabs v-model="active">
    
</v-tabs>    
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ResponseView",
    props: {
        activators: [] as Activator[];
    },
    data: {
        active: null,
    }
})
</script>


<style scoped>

</style>
