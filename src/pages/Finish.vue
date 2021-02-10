<template>
  <q-page>
    <div class="finish-frame">
      Session has been ended.

      Thanks for taking part.
    </div>
    <div>
      <q-btn class="finish-btn" label="Join new session" @click="routeToRoot()" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Finish',
  components: {  },
  props: {},
  setup(props, {root}) {

    function routeToRoot(): void {
      root.$router.replace('/');
    }

    return {routeToRoot};
  }
});
</script>

<style>
.finish-frame {
  margin-top: 40%;
  text-align: center;
  font-size: 30px;
}

.finish-btn {
  margin-top: 20%;
  margin-left: 30%;
  width: 40%;
}
</style>