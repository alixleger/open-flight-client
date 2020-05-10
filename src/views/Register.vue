<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
            <account-form
              title="Création de compte"
              buttonLabel="Enregistrer"
              linkLabel="Connexion"
              componentToRedirect="Login"
              login=false />
      </v-col>
    </v-row>
  </v-container>
</template>

<script  lang="ts">
import AccountForm from "@/components/AccountForm.vue";

export default {
  name: "Register",
  components: {
    AccountForm
  },
}
</script>
