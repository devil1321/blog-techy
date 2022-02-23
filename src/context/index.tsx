import React,{useState,createContext } from 'react'
import { AsideFormData } from '../interfaces'

interface AsideFormDataContextProps{
  formData:AsideFormData;
  setFormData:any
}

export const AsideFormDataContext = createContext<AsideFormDataContextProps>({
    formData:{
        start:{
            dateTime:'',
            timeZone:'Europe/Warsaw'
          },
        end:{
            dateTime:'',
            timeZone:'Europe/Warsaw'
          },
          summary:'',
          description:''
    },
    setFormData:()=>{}
})

export const AsideFormDataProvider = ({children}) =>{
    const [formData,setFormData] = useState<AsideFormData>({
        start:{
          dateTime:'',
          timeZone:'Europe/Warsaw'
        },
        end:{
          dateTime:'',
          timeZone:'Europe/Warsaw'
        },
        summary:'',
        description:'',
      })
      return(
          <AsideFormDataContext.Provider value={{
              formData,
              setFormData
          }}>
        {children}
          </AsideFormDataContext.Provider>
      )
}