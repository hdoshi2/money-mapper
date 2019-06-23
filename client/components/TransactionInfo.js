import React, {PureComponent} from 'react'

export default class TransactionInfo extends PureComponent {
  render() {
    const {info} = this.props

    return (
      <div>
        <div>{info.name}</div>
        <div>{info.category2}</div>
        <div>$ {info.amount}</div>
      </div>
    )
  }
}
