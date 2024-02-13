import React, { useEffect, useState } from "react"
import { Comp1 } from "../comp1"
import { timeProvider } from "../../providers/time-provider"

export const Timer = () => {

    // const [time, setTime] = useState(0)


    useEffect(() => {
        const interval = setInterval(() => {
            //         setTime((prevTime) => prevTime + 1)
            timeProvider.setTime(timeProvider.time + 1)
        }, 1000)
    }, [])
 
    return (
        <div>
            {/* {time} */}

            {/* <Comp1 time={time} /> */}
            <Comp1  />
        </div>
    )

}