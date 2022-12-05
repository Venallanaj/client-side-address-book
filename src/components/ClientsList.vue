<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by Full Name"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Clients List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(client, index) in clients"
          :key="index"
          @click="setActiveClient(client, index)"
        >
          {{ client.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentClient.id">
        <h4>Client</h4>
        <div>
          <label><strong>First Name:</strong></label> {{ currentClient.name }}
        </div>
        <div>
          <label><strong> Username:</strong></label>
          {{ currentClient.username }}
        </div>
        <div>
          <label><strong>City:</strong></label>
          {{ currentClient.address.city }}
        </div>
        <div>
          <label><strong>Email:</strong></label>
          {{ currentClient.email }}
        </div>

        <router-link
          :to="'/clients/' + currentClient.id"
          class="badge badge-warning px-3 py-2"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Client...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClientDataService from "@/services/ClientDataService";
import Client from "@/types/Client";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "clients-list",
  data() {
    return {
      clients: [] as Client[],
      currentClient: {} as Client,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveClients() {
      ClientDataService.getAll()
        .then((response: ResponseData) => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveClients();
      this.currentClient = {} as Client;
      this.currentIndex = -1;
    },

    setActiveClient(client: Client, index = -1) {
      this.currentClient = client;
      this.currentIndex = index;
    },

  
    searchName() {
      ClientDataService.findByName(this.name)
        .then((response: ResponseData) => {
          this.clients = response.data;
          this.setActiveClient({} as Client);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveClients();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
