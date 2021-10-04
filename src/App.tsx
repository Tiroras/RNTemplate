import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'

import { RootNavigation } from 'src/navigation/root'

import { client } from './api/client'
import { AlertProvider } from './modules/alert-context'

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <AlertProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </AlertProvider>
    </ApolloProvider>
  )
}
