<template>
  <section class="row mb-4">
    <div class="col-12 col-sm-5 __avatar_container">
      <div class="mx-auto __avatar_wrapper">
        <img
          class="img-thumbnail __avatar"
          :src="user.avatarUrl ? user.avatarUrl : '@/assets/icons/user.svg'"
          alt="Avatar image"
        />
      </div>
    </div>

    <div class="col-12 col-sm-7">
      <table>
        <tr>
          <th>Name</th>
          <td>{{ user.fname }} {{ user.lname }}</td>
        </tr>
        <tr>
          <th>DOB</th>
          <td>{{ user.DOB || '-' }}</td>
        </tr>
        <tr>
          <th>Title</th>
          <td>{{ user.title || '-' }}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

<style scoped>
.__avatar_wrapper,
.__avatar {
  width: 200px;
  height: 200px;
}

.__avatar {
  border-radius: 50%;
}
</style>
