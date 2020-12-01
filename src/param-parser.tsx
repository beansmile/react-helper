import * as React from 'react'
import _ from 'lodash'
import * as qs from 'qs'
import decoder from './decoder'

function paramParser(Page: React.ComponentType): React.ComponentType
function paramParser(pageKey?: string): ((Page: React.ComponentType) => React.ComponentType)

function paramParser(arg) {
  if (['string', 'undefined'].includes(typeof arg)) return Page => paramParserDecorator(Page, arg)
  else return paramParserDecorator(arg)
}

function paramParserDecorator(Page: React.ComponentType, pageKey?: string): any {
  return function ParamParser(props) {
    const { location, match } = props
    const params = _.mapValues(match.params, decoder)
    const query = qs.parse(location.search.replace(/^\?/, ''), { decoder })
    Object.assign(params, query, location.state, { location_key: location.key })
    return <Page key={params[pageKey]} {...props} params={params}/>
  }
}

export default paramParser
