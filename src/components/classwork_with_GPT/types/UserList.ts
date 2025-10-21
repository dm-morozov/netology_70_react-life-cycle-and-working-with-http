export interface UserListProps {
  id: number
  name: string
  username: string
  email: string
  address: addressObj
}

export interface addressObj {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: geoObj
}

export interface geoObj {
  lat: string
  lng: string
}
