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
            <v-card class="elevation-12">
              <v-toolbar
                color="blue darken-1"
                dark
                flat
              >
                <v-toolbar-title>Connexion</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Mot de passe"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Connexion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script  lang="ts">

export default {
  props: {
    source: String,
  },
}
</script>
