import * as React from 'react'
import { Icon } from 'antd'
import './index.less'

const iconMap = {
  error: <Icon className="error" type="close-circle"/>,
  success: <Icon className="success" type="check-circle"/>,
}

export default class Result extends React.Component {
  props: {
    type: 'success' | 'error',
    title: string,
    className?: string,
    description?: any,
    extra?: any,
    actions?: any,
  }

  render() {
    const { className = '', type, title, description, extra, actions, ...restProps } = this.props
    return (
      <div className={`c-result ${className}`} {...restProps}>
        <div className="icon">{iconMap[type]}</div>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
        {extra && <div className="extra">{extra}</div>}
        {actions && <div className="actions">{actions}</div>}
      </div>
    )
  }
}
