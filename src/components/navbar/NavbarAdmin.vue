<template>
  <b-navbar type="is-dark" class="is-transparent is-spaced">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" :to="localePath('admin')">
        <strong>Admin</strong>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="localePath('admin-users')">
        {{ $t('navbar_item_admin_users') }}
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link :to="localePath('index')" class="button is-warning">
            {{ $t('navbar_item_exit_admin') }}
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
