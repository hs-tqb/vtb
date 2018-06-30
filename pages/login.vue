
<template>
</template>

<script>

export default {
  asyncData({query,redirect,store}) {
    let url = '';
    url = `/sign?lang=${(query.lang||store.state.lang)}`

    redirect( url )
  }
}
</script>
