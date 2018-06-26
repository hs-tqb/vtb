
<template>
</template>

<script>

export default {
 asyncData({query,redirect,store}) {
   redirect(`/login?lang=${(query.lang||store.state.lang||'')}&invite_code=${query.invite_code||''}`)
 }
}
</script>
