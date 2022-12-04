<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">First Name</label>
        <input
          type="text"
          class="form-control"   
          v-model="client.name"
          name="name" required
        />
      </div>

      
      <div class="form-group">
        <label for="description">Username</label>
        <input
          class="form-control"   
          required
          v-model="client.username"
          username="username"
        />
      </div>

 
      <div class="form-group">
        <label for="description">Email</label>
        <input
          class="form-control" @change="isEmailValid"
        
          required
          v-model="client.email"
          type="email"
        />
        <!-- <span v-show="wrongEmail" style="color:red">Incorrect email address</span> -->
      </div>

       
      <div class="form-group">
        <label for="description">City</label>
        <input
          class="form-control"

          required
          v-model="client.address.city"
          city="city"
        />
      </div>



      <button @click="saveClient" class="btn btn-success btn-submit"  >Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button type="submit" class="btn btn-success" @click="newClient" >Add</button>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import ClientDataService from "@/services/ClientDataService";
import Client from "@/types/Client";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-client",
  data() {
    return {
      client: {
  
        name: "",
        username: "",
        email: "",
        // wrongEmail: false,
        address:{city:""}
      } as Client,
      submitted: false,
    };
  },
  methods: {
    saveClient() {
      let data = {
        title: this.client.name,
        description: this.client.username,
      };
 
if(this.client.name!="" && this.client.username!=""
&& this.client.email!="" && this.client.address.city!="")
{
  ClientDataService.create(data)
        .then((response: ResponseData) => {
          this.client.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });}
    },

    newClient() {
      this.submitted = false;
      this.client = {} as Client;
    },
  
    
    // isEmailValid(){
    //   if (emailRe.test(this.client.email)) {
    //     this.wrongEmail = false;
    //   } else {
    //     this.wrongEmail = true;
    //   }
    // }

  },
  
 


});


// const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
