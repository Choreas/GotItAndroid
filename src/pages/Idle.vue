<template>
  <q-page>
    <div class="idle-frame">
      Waiting for next step...
    </div>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Idle',
  components: { ExampleComponent },
  props: {},
  setup(props, {root}) {

    return {};
  }
});
</script>

<style>
.idle-frame {
  margin-top: 20%;
  text-align: center;
  font-size: 30px;
}
</style>