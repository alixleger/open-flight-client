<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-alert v-if="!successful && message" type="error">
          {{ message }}
        </v-alert>
        <v-alert v-if="successful && message" type="success">
          {{ message }}
        </v-alert>
        <h1>{{ decodedJWT.id }}</h1>
        <p>Connecté depuis le {{ new Date(decodedJWT.orig_iat * 1000).toLocaleString() }}</p>
        
        
        <v-form v-model="valid">
          <h2>Modifier le mot de passe</h2>
          <v-text-field
            type="password"
            v-model="user.password"
            label="Nouveau mot de passe"
            :rules="passwordRules"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="passwordConfirmation"
            label="Confirmer le mot de passe"
            :rules="confirmedPasswordRules"
            required
          ></v-text-field>
          <v-btn color="success" :disabled="!valid" @click="submit">Modifier</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script  lang="ts">
import { Component, Vue } from "vue-property-decorator";
import User from "@/models/user";
/* eslint-disable @typescript-eslint/camelcase */
import jwt_decode from "jwt-decode";

@Component
export default class Settings extends Vue {
  user: User = new User("", "");
  valid = true;
  successful = false;
  message = "";
  passwordConfirmation = "";

  get passwordRules(): Array<Function> {
    return [
      (v: any) => !!v ||
        "Le mot de passe est requis",
      (v: any) => (v && v.length >= 6) ||
        "Le mot de passe doit avoir au minimum 6 caractères",
    ];
  }

  get confirmedPasswordRules(): Array<Function> {
    return this.passwordRules.concat([
      (v: any) => this.user.password.localeCompare(v) === 0 ||
        "Les mots de passe doivent être égaux",
    ]);
  }

  get decodedJWT() {
    return jwt_decode(this.$store.state.auth.user.token)
  }

  public submit(): void {
    this.$validator.validate().then(isValid => {
      if (!isValid) {
        return;
      }

      this.$store.dispatch('user/updateInfos', this.user).then(
        async data => {
          this.message = "Mot de passe mis à jour !";
          this.successful = true;
        },
        error => {
          this.message = error.response.data.error;
          this.successful = false;
        }
      );
    });
  }
}
</script>
