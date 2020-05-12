<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <account-form
          title="Connexion"
          buttonLabel="Connexion"
          linkLabel="Créer un compte"
          componentToRedirect="Register"
          login="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountForm from "@/components/AccountForm.vue";

@Component({
  components: {
    AccountForm
  }
})
export default class Login extends Vue {}
</script>
