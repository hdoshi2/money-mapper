import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
import {getMapdata} from './utility'
import TransactionInfo from './TransactionInfo'
import TransactionsTable from './TransactionsTable'
const token =
  'pk.eyJ1IjoiaGRvc2hpMiIsImEiOiJjang4NW9pMWYwN25kM3RwdTNtZmFzdnI3In0._DAxCZKSd5sGa9BevwtqNQ'

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
}

class Map extends Component {
  state = {
    viewport: {
      width: 1000,
      height: 600,
      latitude: 40.7128,
      longitude: -74.006,
      zoom: 12,
      bearing: 0,
      pitch: 0
    },
    popupInfo: null
  }

  _updateViewport = viewport => {
    this.setState({viewport})
  }

  _renderTransactionMarker = (transaction, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={transaction.lon}
        latitude={transaction.lat}
        offsetLeft={-10}
        offsetTop={-10}
      >
        <img
          className="mapPin"
          src="/pin.png"
          onClick={() => this.setState({popupInfo: transaction})}
        />
      </Marker>
    )
  }

  _renderPopup() {
    const {popupInfo} = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.lon}
          latitude={popupInfo.lat}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <TransactionInfo info={popupInfo} />
        </Popup>
      )
    )
  }

  render() {
    let {transactions} = this.props
    transactions = transactions.filter(({lat}) => lat !== null)
    const filteredTrans = getMapdata(this.props.transactions)
    console.log('props', this.props)
    return (
      <div className="map-container">
        <MapGL
          mapboxApiAccessToken={token}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          {...this.state.viewport}
          onViewportChange={this._updateViewport}
        >
          {filteredTrans.map(this._renderTransactionMarker)}
          {this._renderPopup()}
          <div className="navMap" style={navStyle}>
            <NavigationControl />
          </div>
          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
        </MapGL>
        <br />
        <br />
        <div>
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    transactions: state.transaction
  }
}
export default connect(mapState)(Map)
