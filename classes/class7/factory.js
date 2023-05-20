class AuthenticationFactory {
  static create(provider) {
    return new Authentication().setProvider(provider).build();
  }

  static createFirebase() {
    return new Authentication().setProvider("Firebase").build();
  }
}

const factoryAuth = AuthenticationFactory.create("Firebase");

console.log("Factory Instance", factoryAuth instanceof Authentication);
