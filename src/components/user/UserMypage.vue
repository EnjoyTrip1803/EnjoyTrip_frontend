<script setup>

</script>

<template>
  <!-- 유저 목록 start -->
  <div class="container border border-3 mt-5 m-auto p-5" style="width: 500px;">
    <h3>My Info</h3>
    <div class="form">
      <form name="mypage-form" class="mypage-form my-3 d-grid gap-3">
        <input class="form-control" id="id" name="id" type="text" disabled />
        <input class="form-control" id="password" name="password" type="password" placeholder="password" />
        <input class="form-control" id="email" name="email" type="email" disabled />
        <input class="form-control" id="name" name="name" type="text" placeholder="name" />
        <input class="form-control" id="age" name="age" type="number" placeholder="age" />
      </form>
      <button class="btn btn-primary" onclick="editInfo()" type="button">EDIT</button>
    </div>
  </div>
</template>

<style scoped></style>