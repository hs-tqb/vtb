
<template>
</template>

<script>

export default {
  asyncData({query,redirect,store}) {
    let url = '';
    // url = `/sign?sign=up&lang=${(query.lang||store.state.lang)}`
    // + (query.from?`&from=${query.from}`:'');


    url = `/sign?lang=${(query.lang||store.state.lang)}`

    redirect( url )
  }
}
</script>
