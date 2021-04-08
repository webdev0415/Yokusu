export default function({ app, store, redirect }) {
  // If the user is not authenticated
  if (!app.$auth.loggedIn) {
    return redirect(app.localePath('login'))
  }
}
