<template>
  <div>
    <v-alert
      v-model="alert"
      v-if="!successful && message"
      type="error"
      >{{ message }}</v-alert>
    <v-card class="elevation-12" loading="loading">
      <v-toolbar color="blue darken-1" dark flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form :lazy-validation="lazy" v-model="valid">
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="Email"
            name="email"
            prepend-icon="person"
            type="text"
            required
          />
          <v-text-field
            v-model="user.password"
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
        <v-btn color="success" :disabled="!valid" @click="handler">{{ buttonLabel }}</v-btn>
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
  @Prop() message!: string;

  user: User = new User("", "");
  loading: boolean|undefined;
  valid: boolean|undefined = true;
  successful: boolean|undefined = false;

  get loggedIn(): boolean {
    return this.$store.state.auth.status.loggedIn;
  }

  get emailRules() {
    return [
      (v: any) => !!v || "L'adresse e-mail est requise",
      (v: any) => /.+@.+\..+/.test(v) || "L'adresse e-mail doit être valide",
    ];
  }

  get passwordRules() {
    return [
      (v: any) => !!v ||
        "Le mot de passe est requis",
      (v: any) => (v && v.length >= 6) ||
        "Le mot de passe doit avoir au minimum 6 caractères",
    ];
  }

  created() {
    if (this.loggedIn) {
      if (this.login === 'login') {
        this.$router.push("/about");
      } else {
        this.$router.push("/login");
      }
    }
  }

  public handler(): void {
    if (this.login ===  'true') {
      this.handleLogin();
    } else {
      this.handleRegister()
    }
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
          () => {
            this.$router.push("/about");
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
    this.message = '';
    this.$validator.validate().then(isValid => {
      if (isValid) {
        this.$store.dispatch('auth/register', this.user).then(
          data => {
            this.message = "Compte créé !";
            this.successful = true;
            this.$router.push("/login");
          },
          error => {
            this.message = error.response.data.message;
            this.successful = false;
          }
        );
      }
    });
  }
}
</script>