export default function({ app, store, route, redirect }) {
  // Some routes are always public, so don't apply isPublic logic
  const page = route.name

  if (
    page !== null &&
    (page.includes('login') ||
      page.includes('register') ||
      page.includes('forgotpassword') ||
      page.includes('verify') ||
      page.includes('promo') ||
      page.includes('request'))
  ) {
    return
  }

  // If the app is not public and the user is not logged in, required auth
  if (!store.state.isPublic && !store.state.auth.loggedIn) {
    // Skip certain public routes
    return redirect(app.localePath('login'))
  }
}
