<template>
  <div v-if="currentClient.id" class="edit-form">
    <h4>Client</h4>
    <form>
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          type="text"
          class="form-control"
          v-model="currentClient.name"
        />
      </div>
      <div class="form-group">
        <label for="Username">Username</label>
        <input
          type="text"
          class="form-control"     
          v-model="currentClient.username"
        />
      </div>

      <div class="form-group">
        <label for="Email">Email</label>
        <input
          class="form-control"
        
          required
          v-model="currentClient.email"
          email="email"
        />
    
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input
          type="text"
          class="form-control"     
          v-model="currentClient.address.city"
        />
      </div>


    </form>

    <button class="badge badge-danger border border-danger mr-2 px-3 py-2" @click="deleteClient">
      Delete
    </button>

    <button type="submit" class="badge badge-success border border-success px-3 py-2" @click="updateClient">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Client...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClientDataService from "@/services/ClientDataService";
import Client from "@/types/Client";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "client",
  data() {
    return {
      currentClient: {} as Client,
      message: "",
    };
  },
  methods: {
    getClient(id: any) {
      ClientDataService.get(id)
        .then((response: ResponseData) => {
          this.currentClient = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentClient.id,
        name: this.currentClient.name,
        username: this.currentClient.username,
        published: status,
      };

      ClientDataService.update(this.currentClient.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          //this.currentClient.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateClient() {
      ClientDataService.update(this.currentClient.id, this.currentClient)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The client was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteClient() {
      ClientDataService.delete(this.currentClient.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "clients" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getClient(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
