import React from 'react'
import {Donut, Legend, ResponsiveContainer} from 'britecharts-react'

class LegendDonut extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {highlightedSlice: null}
  }

  _handleMouseOver(data) {
    this.setState({
      highlightedSlice: data.data.id
    })
  }

  _handleMouseOut() {
    this.setState({
      highlightedSlice: 99999
    })
  }

  render() {
    const legendMargin = {
      top: 10,
      bottom: 10,
      left: 0,
      right: 30
    }

    const {data} = this.props
    const width = 600
    return (
      <div className="legend-donut">
        <Donut
          data={data}
          height={width}
          width={width}
          externalRadius={width / 2.5}
          internalRadius={width / 5}
          isAnimated={false}
          highlightSliceById={this.state.highlightedSlice}
          hasFixedHighlightedSlice={true}
          customMouseOver={this._handleMouseOver.bind(this)}
          customMouseOut={this._handleMouseOut.bind(this)}
        />
        <Legend
          data={data}
          height={200}
          width={width}
          margin={legendMargin}
          highlightEntryById={this.state.highlightedSlice}
          unit=" Dollar"
          numberFormat=","
        />
      </div>
    )
  }
}

export default LegendDonut
