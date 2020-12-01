import * as React from 'react'

export const { Provider: FormProvider, Consumer: FormConsumer } = React.createContext({
  form: {},
  data: {},
})

export function formConsumer(Target) {
  return function FormConsumerEntry(props) {
    return (
      <FormConsumer>
        {value => <Target {...props} {...value}/>}
      </FormConsumer>
    )
  } as any
}

