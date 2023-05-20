class Authentication {
  constructor() {
    this.authentication = {};
    return this;
  }

  setProvider(provider) {
    this.authentication.provider = provider;
    return this;
  }

  build() {
    // Process settings
    return this;
  }
}

const authentication = new Authentication().setProvider("Firebase").build();

console.log("New Instance", authentication instanceof Authentication);
