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
import { defineComponent, ref } from '@vue/composition-api';
import { Loading, Notify } from 'quasar';
import { RestHandler } from 'src/rest/rest-handler';

export default defineComponent({
  name: 'Code',
  components: { },
  props: {},
  setup(props, {root}) {
    const code = ref('');

    async function routeToIdle(): Promise<void> {
      Loading.show({
        spinnerColor: 'red',
        message: 'Logging you in!'
      });
      try {
        if (await RestHandler.startSession(code.value)) {
          void root.$router.replace('idle');
        }
      } catch (e) {
        console.log(JSON.stringify(e));
        Notify.create({
          message: "Could not connect to session. Check the code."
        })
      } finally {
        Loading.hide();
      }
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