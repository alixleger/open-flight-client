<template>
  <div>
    <v-alert v-if="!successful && this.message" type="error">{{
      this.message
    }}</v-alert>
    <v-alert v-if="successful && this.message" type="success">{{
      this.message
    }}</v-alert>
    <v-card class="elevation-12" :loading="loading">
      <v-toolbar color="blue darken-1" dark flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model.trim="user.email"
            :rules="emailRules"
            label="Email"
            name="email"
            prepend-icon="person"
            type="text"
            required
          />
          <v-text-field
            v-model.trim="user.password"
            :rules="passwordRules"
            id="password"
            label="Mot de passe"
            name="password"
            prepend-icon="lock"
            type="password"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <router-link :to="{ name: componentToRedirect }">
          {{ linkLabel }}
        </router-link>
        <v-spacer />
        <v-btn color="success" :disabled="!valid" @click="handler">{{
          buttonLabel
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from "@/models/user";

@Component
export default class AccountForm extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly buttonLabel!: string;
  @Prop() readonly componentToRedirect!: string;
  @Prop() readonly linkLabel!: string;
  @Prop() readonly login!: string;

  user: User = new User("", "");
  loading = false;
  valid = true;
  successful = false;
  message = "";

  get loggedIn(): boolean {
    return this.$store.state.auth.status.loggedIn;
  }

  get emailRules() {
    return [
      (v: string) => !!v || "L'adresse e-mail est requise",
      (v: string) => /.+@.+\..+/.test(v) || "L'adresse e-mail doit être valide"
    ];
  }

  get passwordRules() {
    return [
      (v: string) => !!v || "Le mot de passe est requis",
      (v: string) =>
        (v && v.length >= 6) ||
        "Le mot de passe doit avoir au minimum 6 caractères"
    ];
  }

  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  }

  public handler(): void {
    this.login === "true" ? this.handleLogin() : this.handleRegister();
  }

  public handleLogin(): void {
    this.loading = true;
    this.$validator.validateAll().then(isValid => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          async () => {
            this.message = "Connexion réussie !";
            this.successful = true;
            await new Promise(r => setTimeout(r, 750));
            this.$router.push("/home");
          },
          error => {
            this.loading = false;
            this.message = error.response.data.message;
            if (error.response.data.code === 401) {
              this.message = "Email ou mot de passe incorrect";
            }
          }
        );
      }
    });
  }

  public handleRegister(): void {
    this.loading = true;
    this.$validator.validate().then(isValid => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      this.$store.dispatch("auth/register", this.user).then(
        async () => {
          this.message = "Compte créé !";
          this.successful = true;
          await new Promise(r => setTimeout(r, 750));
          this.$router.push("/login");
        },
        error => {
          this.loading = false;
          this.message = error.response.data.error;
          this.successful = false;
        }
      );
    });
  }
}
</script>
