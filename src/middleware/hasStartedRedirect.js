export default function({ app, store, route, redirect }) {
  // Redirect to ranking when race has started
  if (store.state.selectedRace.has_started) {
    const page = route.name

    if (page.includes('race-userteams')) {
      return redirect(
        app.localePath({
          name: 'race-rankinguserteams-number',
          params: {
            race: store.state.selectedRace.slug,
            number: store.state.selectedRace.current_stage_number
          }
        })
      )
    }

    if (page.includes('race-pools')) {
      return redirect(
        app.localePath({
          name: 'race-rankingpools-number',
          params: {
            race: store.state.selectedRace.slug,
            number: store.state.selectedRace.current_stage_number
          }
        })
      )
    }

    if (page.includes('race-pool-slug')) {
      return redirect(
        app.localePath({
          name: 'race-pool-slug-ranking-number',
          params: {
            race: store.state.selectedRace.slug,
            slug: route.params.slug,
            number: store.state.selectedRace.current_stage_number
          }
        })
      )
    }
  }
}
