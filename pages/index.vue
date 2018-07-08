
<template>
</template>

<script>

export default {
  asyncData({query,redirect,store}) {
    // let url = '';
    // if ( query.from ) {
    //   url = `/sign?sign=up&lang=${(query.lang||store.state.lang)}`
    //   + (query.from?`&from=${query.from}`:'');
    // } else {
    //   url = `/sign?lang=${(query.lang||store.state.lang)}`
    // }

    url = `/sign?lang=${(query.lang||store.state.lang)}`

    redirect( url )
  }
}
</script>
