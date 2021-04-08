export default function({ app, store, redirect }) {
  // Allow when role contains 'admin'
  if (!store.state.auth.user.role.includes('admin')) {
    return redirect(app.localePath('index'))
  }
}
