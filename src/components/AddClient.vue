<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          type="text"
          class="form-control"
          v-model="client.name"
          name="name"
          required
        />
      </div>

      <div class="form-group">
        <label for="Username">Username</label>
        <input
          class="form-control"
          required
          v-model="client.username"
          username="username"
        />
      </div>

      <div class="form-group">
        

        <label for="Email">Email</label>
        <input
          class="form-control"
          required
          @change="isEmailValid"
          v-model="client.email"
          type="email"
        />
        <span v-show="wrongEmail" style="color:red">Incorrect email address</span>
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input
          class="form-control"
          required   
          v-model="client.address.city"
          city="city"
        />
      </div>

      <button @click="saveClient" class="btn btn-success ">
        Submit
      </button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button type="submit" class="btn btn-success" @click="newClient">
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClientDataService from "@/services/ClientDataService";
import Client from "@/types/Client";
import ResponseData from "@/types/ResponseData";

const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default defineComponent({
  name: "add-client",
  data() {
    return {
      client: {
        id: "",
        name: "",
        username: "",
        email: "",
        address: { city: "" },
      } as unknown as Client,
      submitted: false,
      wrongEmail: false,
    };
  },
  methods: {
    saveClient() {
      let data = {
        name: this.client.name,
        username: this.client.username,
      };

      if (
        this.client.name != "" &&
        this.client.username != "" &&
        this.wrongEmail &&
        this.client.address.city != ""
      ) 
      {
        ClientDataService.create(data)
          .then((response: ResponseData) => {
            this.client.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e: Error) => {
            console.log(e);
          });
      } else{
        alert('Please complete all fields');
        this.submitted = false;
    } 
    },

    newClient() {
      this.submitted = false;
      this.client = {} as Client;
    },
    isEmailValid() { debugger;
      if (emailRe.test(this.client.email)) {
        this.wrongEmail = false;
      } else {
        this.wrongEmail = true;
      }
    },

  },
});

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
