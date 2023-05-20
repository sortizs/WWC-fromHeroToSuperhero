class Authentication {
  static _instance;

  static getInstance() {
    if (!Authentication._instance) {
      Authentication._instance = new AuthenticationBuilder()
        .setProvider("Google")
        .build();
    }
    return Authentication._instance;
  }
}
