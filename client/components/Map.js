import React, {Component} from 'react'
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
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
      width: 600,
      height: 600,
      latitude: 40.73,
      longitude: -73.93,
      zoom: 11,
      bearing: 0,
      pitch: 0
      // mapStyle: 'mapbox://styles/hdoshi2/cjx8atpt81ii21cmvydfh2e0i'
    },
    popupInfo: null
  }

  _updateViewport = viewport => {
    this.setState({viewport})
  }

  _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        {/* <CityPin size={20} onClick={() => this.setState({popupInfo: city})} /> */}
        <img className="mapPin" src="/pin.png" />
      </Marker>
    )
  }

  // _renderPopup() {
  //   const {popupInfo} = this.state

  //   return (
  //     popupInfo && (
  //       <Popup
  //         tipSize={5}
  //         anchor="top"
  //         longitude={popupInfo.longitude}
  //         latitude={popupInfo.latitude}
  //         closeOnClick={false}
  //         onClose={() => this.setState({popupInfo: null})}
  //       >
  //         <div>Hello</div>
  //         {/* <CityInfo info={popupInfo} /> */}
  //       </Popup>
  //     )
  //   )
  // }

  render() {
    return (
      <MapGL
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/hdoshi2/cjx8atpt81ii21cmvydfh2e0i"
        {...this.state.viewport}
        onViewportChange={this._updateViewport}
      >
        <div className="navMap" style={navStyle}>
          <NavigationControl />
        </div>
        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <Marker
          anchor="bottom"
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
        >
          <img className="mapPin" src="/pin.png" />
        </Marker>
      </MapGL>
    )
  }
}

export default Map
