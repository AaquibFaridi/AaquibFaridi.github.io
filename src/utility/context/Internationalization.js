import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
//aaquib language
import messages_en from 'assets/data/en.json'
import messages_de from 'assets/data/spn.json'
import messages_fr from 'assets/data/frn.json'
import messages_pt from 'assets/data/grm.json'
import messages_in from 'assets/data/hin.json'
import messages_pk from 'assets/data/urd.json'
import messages_cn from 'assets/data/chn.json'

const menu_messages = {
  en: messages_en,
  de: messages_de,
  fr: messages_fr,
  pt: messages_pt,
  in: messages_in,
  pk: messages_pk,
  cn: messages_cn
}

const Context = React.createContext()
const IntlProviderWrapper = (props) => {
  const [locale, setlocale] = useState('en')
  const [messages, setmessages] = useState(menu_messages['en'])

  const { children } = props
  return (
    <Context.Provider
      value={{
        state: { locale, messages },
        switchLanguage: (language) => {
          setlocale(language)
          setmessages(menu_messages[language])
        }
      }}
    >
      <IntlProvider
        key={locale}
        locale={locale}
        messages={{ messages }}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
