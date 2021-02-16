<template>
  <q-page>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  props: {},
  setup(props, {root}) {
    void root.$router.replace('code');
    return {};
  }
});
</script>
