import React, {Component} from 'react'
import ReactMapGL from 'react-map-gl'
const token =
  'pk.eyJ1IjoiaGRvc2hpMiIsImEiOiJjang4NW9pMWYwN25kM3RwdTNtZmFzdnI3In0._DAxCZKSd5sGa9BevwtqNQ'

class Map extends Component {
  state = {
    viewport: {
      width: 600,
      height: 600,
      latitude: 40.73,
      longitude: -73.93,
      zoom: 11,
      mapStyle: 'mapbox://styles/hdoshi2/cjx8atpt81ii21cmvydfh2e0i'
    }
  }

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken={token}
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
      />
    )
  }
}

export default Map
