import React, { FC, useEffect, useState } from "react"
import { Comp2 } from "../comp2"
import { timeProvider } from "../../providers/time-provider"
import { TIME_EVENTS } from "../../constants/timeConstatnts"


type Props = {
    time: number
}
// export const Comp1:FC<Props> = ({time}) => {

export const Comp1: FC = () => {

    const [time, setTime] = useState(timeProvider.time)
    useEffect(() => {
       return timeProvider.eventEmitter.on(TIME_EVENTS.ON_UPDATE, setTime)
    }, [])
console.log('1111');



    return (
        <div>
            {time}
            <Comp2 />
        </div>
    )

}