export default interface Client {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
}
