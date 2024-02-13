import { store } from "./store"
import { setToDos } from "./store/toDos-slice"
import { UsersType } from "./types/types"

export const getToDos = () => {

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(todos => {
            store.dispatch(setToDos(todos))
        })
}

// export const addUser = (user: UsersType) => {
// const url='http://localhost:8000/users'
// const options={
//     method: 'POST',
//     body: JSON.stringify(user),
//     heaaders: {
//         'Content-Type': 'application/json'
//     }
// }

//     fetch(url)
//     .then(res => res.json())
//     .then(users => {
//        console.log(users)
//     })
// }