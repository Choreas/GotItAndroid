<template>
  <q-page>
    <div class="code-frame">
      CODE:
      <q-input class="code-input" v-model="code" clearable />
    </div>
    <q-btn label="SUBMIT" class="submit-btn" @click="routeToIdle()" />
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Code',
  components: { ExampleComponent },
  props: {},
  setup(props, {root}) {
    const code = ref('');

    function routeToIdle(): void {
      void root.$router.replace('idle');
    }

    return {
      code, 
      routeToIdle
    };
  }
});
</script>

<style>
.code-frame {
  margin-top: 20%;
  text-align: center;
  font-size: 30px;
}
.code-input {
  width: 60%;
  height: 20%;
  margin-top: 5%;
  margin-left: 20%;
  border: 2px red solid;
  font-size: 20px;
}

.submit-btn {
  margin-left: 40%;
  margin-top: 25%;
  width: 20%;
}
</style>