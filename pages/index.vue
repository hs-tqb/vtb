
<template>
</template>

<script>

export default {
  asyncData({query,redirect,store}) {
    let url = '';
    if ( query.invite_code ) {
      url = `/register?lang=${(query.lang||store.state.lang)}`
      + (query.invite_code?`&invite_code=${query.invite_code}`:'');
    } else {
      url = `/login?lang=${(query.lang||store.state.lang)}`
    }

    redirect( url )
  }
}
</script>
