import React, { FC, useEffect, useState } from "react"
import { timeProvider } from "../../providers/time-provider"
import { TIME_EVENTS } from "../../constants/timeConstatnts"

type Props = {
    time: number
}
export const Comp2:FC = () => {

    const [time, setTime] = useState(timeProvider.time)
    useEffect(() => {
    //    return timeProvider.eventEmitter.on(TIME_EVENTS.ON_UPDATE, setTime)
    }, [])
console.log('2222');


    return (
        <div>
            {time}
        </div>
    )

}