import * as React from "react"
import Svg, { Path } from "react-native-svg"

function UpSmall(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.2 14l-1.625 1.625 1.4 1.4L16 13l-4.025-4.025-1.4 1.4L12.2 12H8v2h4.2zM4 20c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 012 18V6c0-.55.196-1.02.588-1.412A1.93 1.93 0 014 4h6l2 2h8c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v10c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0120 20H4zm0-2h16V8h-8.825l-2-2H4v12z"
        fill="#888"
      />
    </Svg>
  )
}

export default UpSmall
