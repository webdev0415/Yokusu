import { localize, extend } from 'vee-validate'
import { required, email, min, max, confirmed } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import nl from 'vee-validate/dist/locale/nl.json'
import it from 'vee-validate/dist/locale/it.json'
import de from 'vee-validate/dist/locale/de.json'
import fr from 'vee-validate/dist/locale/fr.json'
import es from 'vee-validate/dist/locale/es.json'

localize({
  en,
  nl,
  it,
  de,
  fr,
  es
})

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('confirmed', confirmed)

const toLocalize = {
  en: {
    dictionary: en
  },
  nl: {
    dictionary: nl
  },
  it: {
    dictionary: it
  },
  de: {
    dictionary: de
  },
  fr: {
    dictionary: fr
  },
  es: {
    dictionary: es
  }
}

export default ({ app }) => {
  localize(app.i18n.locale, toLocalize[app.i18n.locale].dictionary)
}
