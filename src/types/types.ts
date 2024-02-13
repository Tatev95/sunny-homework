export type LoginTypes = {
   token: string,
}

export type ToDosType = {
   userId: number,
   id: number,
   title: string,
   completed: boolean,
}[]

export type UsersType = {
   id: string,
   name: string,
   age: number,
}

export type AddUserType = {
   name: string,
   age: number,
}

export type AddorEditUserProps = {
   handleToggleAdd: (isOpen: boolean) => void;
   title: string,
   handleCloseEdit: ()=> void
}



