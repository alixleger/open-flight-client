<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-alert v-model="alert" v-if="!successful && message" type="error">
          {{ message }}
        </v-alert>
        <v-alert v-model="alert" v-if="successful && message" type="success">
          {{ message }}
        </v-alert>
          <v-form :lazy-validation="lazy" v-model="valid">
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

@Component
export default class Settings extends Vue {
  user: User = new User("", "");
  passwordConfirmation!: string;
  valid: boolean|undefined = true;
  successful: boolean|undefined = false;
  message!: string;

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
