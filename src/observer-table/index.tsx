import * as React from 'react'
import { TableProps } from 'antd/lib/table/interface'
import { Table, Tag, Tooltip } from 'antd'
import _ from 'lodash'
import { isObservableArray, computed } from 'mobx'
import { observer, Observer } from 'mobx-react'
import * as moment from 'moment'

@observer
export default class ObserverTable extends React.Component {
  static defaultProps = {
    pagination: false,
  }

  props: TableProps<Object> & {
    columns?: { [column: string]: { title: string, type?: string, observer: boolean, render?: Function } | string }
  }

  columns = this.formatColumns(this.props.columns)

  formatColumns(columns, width = 100) {
    return _.map(columns, (item, dataIndex) => {
      const column = typeof item === 'string' ? { title: item } : { ...item }
      column.key = dataIndex
      column.width = column.width || width
      column.align = column.align || 'center'

      if (_.isPlainObject(column.children)) {
        column.children = this.formatColumns(column.children, 80)
        column.width = _.sumBy(column.children, v => v.width)
        return column
      }

      const render = column.type ? this.getRenderByType(column.type) : column.render
      column.render = (text, record, index) => {
        const getResult = () => {
          text = _.get(record, dataIndex)
          const result = render ? render(text, record, index) : text
          return _.isNumber(result) || !_.isEmpty(result) ? result : <a disabled>空</a>
        }
        if (column.observer === false) {
          return getResult()
        } else {
          return (
            <Observer>
              {getResult}
            </Observer>
          )
        }
      }
      return column
    })
  }

  getRenderByType(type) {
    return {
      'boolean': text => text ? <Tag color="blue">是</Tag> : <Tag color="red">否</Tag>,
      'text': text => text && (
        <Tooltip title={text} trigger="click" overlayClassName="long-text-tooltip">
          <span
            className="long-text"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden'
            }}
          >
            {text}
            </span>
        </Tooltip>
      ),
      'date': text => text && moment(text).format('YYYY-MM-DD'),
      'datetime': text => text && (
        <React.Fragment>
          <span>{moment(text).format('YYYY-MM-DD')}</span>
          <br/>
          <span>{moment(text).format('HH:mm:ss')}</span>
        </React.Fragment>
      )
    }[type]
  }

  @computed
  get dataSource() {
    const { dataSource } = this.props
    return isObservableArray(dataSource) ? dataSource.slice() : dataSource
  }

  componentWillReceiveProps(newProps) {
    if (this.props.columns !== newProps.columns) this.columns = this.formatColumns(newProps.columns)
  }

  render() {
    const { columns, dataSource } = this
    return (
      <Table
        className="observer-table"
        rowKey={record => (record as any).id}
        scroll={{ x: _.sumBy(columns, v => v.width) + 100 }}
        columns={columns}
        dataSource={dataSource}
        {..._.omit(this.props, 'columns', 'dataSource')}
      />
    )
  }
}

declare module 'react' {
  interface AnchorHTMLAttributes<T> {
    disabled: boolean
  }
}
