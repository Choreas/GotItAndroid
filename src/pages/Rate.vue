<template>
  <q-page>
    <div class="title-frame">
      Bewerten Sie diese Antworten in Bezug auf ihre Verständlichkeit:
    </div>
    <div v-if="!ratingsSent && isMounted" class="answer-frame">
      {{sessionInfo.answers[selectedContent].content}}
    </div>
    <div v-if="!ratingsSent && isMounted" class="row vote-frame">
      <q-btn class="col" label="-1" @click="vote(-1)" />
      <q-btn class="col" label="+1" @click="vote(1)" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from '@vue/composition-api';
import { Loading, Notify } from 'quasar';
import { IRating, RestHandler } from 'src/rest/rest-handler';

export default defineComponent({
  name: 'Rate',
  components: { },
  props: {},
  setup(props, {root}) {
    const selectedContent = ref(0);
    const ratings: Ref<IRating[]> = ref([]);
    const sessionInfo = RestHandler.getSessionState();
    const isMounted = ref(false);
    const ratingsSent = ref(false);
    let timeoutHandle: NodeJS.Timeout;

    function vote(score: -1 | 1): void {
      const rateObject = sessionInfo.answers![selectedContent.value];
      ratings.value.push({
        answerId: rateObject.id,
        rating: score
      });
      if (sessionInfo.answers!.length > selectedContent.value + 1) {
        selectedContent.value += 1;
      } else {
        send();
      }
    }

    async function send(): Promise<void> {
      if (timeoutHandle) clearTimeout(timeoutHandle);
      Loading.show({
        spinnerColor: 'green',
        message: 'Sending your ratings...'
      });
      try {
        if (await RestHandler.postRatings(ratings.value)) {
          Notify.create({
            message: 'Success!'
          });
          ratingsSent.value = true;
        }
      } catch (e) {
        console.log(JSON.stringify(e));
        Notify.create({
            message: 'Failed. Please wait for next step.'
        });
        ratingsSent.value = true;
      } finally {
        Loading.hide();
        timeoutHandle = setTimeout(pollingCallback, 8000);
      }
      if(ratingsSent.value) {
        Loading.show({
          spinnerColor: 'red',
          message: 'Waiting for next step...'
        });
      }
    }

    async function pollingCallback(): Promise<void> {
      try {
        if (await RestHandler.poll() === false) {
          if(Loading.isActive) Loading.hide();
          Notify.create( {
            message: "Fatal error when polling session's state. Please enter the code again."
          } );
          root.$router.replace('/');
          return;
        }
        
        const newState = RestHandler.getSessionState();
        switch (newState.status) {
          case 'IDLE': {
            if(Loading.isActive) Loading.hide();
            root.$router.replace('idle');
            break;
          }
          case 'RATE': {
            timeoutHandle = setTimeout(pollingCallback, 8000);
            break;
          }
          case 'QUESTION': {
            if(Loading.isActive) Loading.hide();
            root.$router.replace('question');
            break;
          }
          case 'FINISH': {
            if(Loading.isActive) Loading.hide();
            root.$router.replace('finish');
            break;
          }
          default: {
            Notify.create( {
              message: "Unknown session state. This is pretty fatal, please enter the code again."
            } );
            if(Loading.isActive) Loading.hide();
            root.$router.replace('/');
          }
        }
      } catch (e) {} 
      finally {

      }
    }

    onMounted( async () => {
      if (sessionInfo.answers!.length === 0) {
        ratingsSent.value = true;
        Loading.show({
          spinnerColor: 'red',
          message: 'Nothing to rate. Waiting for next step...'
        });
      }
      timeoutHandle = setTimeout(pollingCallback, 8000);
      isMounted.value = true;
    } );

    return {
      send,
      sessionInfo,
      selectedContent,
      vote,
      ratingsSent,
      isMounted
    };
  }
});
</script>

<style>
.title-frame {
  margin-top: 20%;
  text-align: center;
  font-size: 30px;
}
.answer-frame {
  margin-top: 50%;
  width: 60%;
  margin-left: 20%;
  font-size: 20px;
}
.vote-frame {
  margin-top: 10%;
}
.vote-up-btn {
  margin-top: 10%;
  margin-left: 40%;
  width: 20%;
}
.vote-down-btn {
  margin-top: 10%;
  margin-left: 40%;
  width: 20%;
}
</style>