<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <account-form 
              title="Connexion"
              buttonLabel="Connexion"
              linkLabel="Créer un compte"
              componentToRedirect="Register"
              login=true />
          </v-col>
        </v-row>
      </v-container>
</template>

<script  lang="ts">
import AccountForm from "@/components/AccountForm.vue";

export default {
  name: "Login",
  components: {
    AccountForm
  },
}
</script>
