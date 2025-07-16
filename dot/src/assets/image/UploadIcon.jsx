import * as React from "react"
import Svg, { Path } from "react-native-svg"

function UploadIcon(props) {
  return (
    <Svg
      width={35}
      height={28}
      viewBox="0 0 35 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.85 17.5l-2.844 2.844 2.45 2.45L24.5 15.75l-7.044-7.044-2.45 2.45L17.85 14H10.5v3.5h7.35zM3.5 28a3.369 3.369 0 01-2.471-1.027A3.377 3.377 0 010 24.5v-21c0-.962.343-1.786 1.029-2.471C1.715.344 2.539.001 3.5 0H14l3.5 3.5h14c.962 0 1.787.343 2.473 1.029C34.659 5.215 35 6.039 35 7v17.5c0 .962-.342 1.787-1.027 2.473-.685.686-1.51 1.028-2.473 1.027h-28zm0-3.5h28V7H16.056l-3.5-3.5H3.5v21z"
        fill="#6D6D6D"
      />
    </Svg>
  )
}

export default UploadIcon;
