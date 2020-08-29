<template>
<div>
  <form @submit.prevent="addMessage">
    <div class="wrapper">
      <div class="padder">
        <input v-model="subject" placeholder="Subject" />
      </div>
      <div class="padder">
        <textarea v-model="messageText"></textarea>
      </div>
      <div class="padder">
        <input v-model="username" placeholder="Username" />
      </div>
      <br />
      <button type="submit" id="button">Create a Message</button>
    </div>
  </form>
  <br>
  <div class="item" v-for="message in messages" v-bind:key="message.created">
    <p>{{message.subject}}</p>
    <p>{{message.messageText}}</p>
    <p>-- <i>{{message.username}}</i></p>
    <hr>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'MessageBoard',
  data() {
    return {
      subject: '',
      messageText: '',
      username: '',
      messages: [],
    }
  },
  created() {
    this.getMessages();
  },
  computed: {
  },
  methods: {
    async getMessages() {
      try {
        this.response = await axios.get("/api/messages");
        this.messages = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async addMessage(){
      try {
        await axios.post('/api/messages/',  {
              messageText: this.messageText,
              subject: this.subject,
              username: this.username
            });
        this.messageText = '';
        this.subject = '';
        this.username = '';
        this.$emit('uploadFinished');
        this.getMessages();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style scoped>
hr {
  height: 2px;
  background-color: black;
}
p {
  margin-left: 10px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  max-width: 200px;
}
.padder {
  padding-top: 10px;
}
textarea{
  width: 100%;
}
input{
  width: 100%;
}
#button {
  max-width: 200px;
  item-align: center;
}
</style>
