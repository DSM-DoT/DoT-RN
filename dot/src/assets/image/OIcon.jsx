import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function OIcon(props) {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={30} cy={30} r={25} stroke="#23EB00" strokeWidth={10} />
    </Svg>
  )
}

export default OIcon
