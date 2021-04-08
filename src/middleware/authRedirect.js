export default function({ app, redirect }) {
  // If the user is authenticated
  if (app.$auth.loggedIn) {
    return redirect(app.localePath('index'))
  }
}
