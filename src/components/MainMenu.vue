<template>
<div class="account-container">
  <!-- Peamenüü -->
  <nav class="main-menu">
    <ul>
      <li><a href="#" @click="handleClick('lototron')">Lototron</a></li>
      <li><a href="#" @click="handleClick('create-lunch')">Loo lõuna</a></li>
      <li><a href="#" @click="handleClick('join-lunch')">Liitu lõunaga</a></li>
      <li><a href="#" @click="handleClick('account')">Konto</a></li>
      <li><a href="#" @click="handleClick('restaurants')">Söögikohad</a></li>
      <li><a href="#" @click="handleClick('question-generator')">Küsimuste generaator</a></li>
      <li><a href="#" @click="handleClick('faq')">KKK</a></li>
      <li><a href="#" @click="handleClick('inbox')">Inbox</a></li>
      <li><a href="#" @click="handleClick('logout')">Logi välja</a></li>
    </ul>
  </nav>

</div>
</template>


<script>
export default {
name: "MainMenu"
}
</script>
