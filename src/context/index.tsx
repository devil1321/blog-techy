import React,{useState,createContext} from 'react'
import { AsideFormData } from '../interfaces'

interface AsideFormDataContextProps{
  formData:AsideFormData;
  setFormData:any
}

export const AsideFormDataContext = createContext<AsideFormDataContextProps>({
    formData:{
        start:{
            date:''
          },
        end:{
            date:''
          },
          summary:'',
        creator:{
            email:''
        }
    },
    setFormData:()=>{}
})

export const AsideFormDataProvider = ({children}) =>{
    const [formData,setFormData] = useState<AsideFormData>({
        start:{
          date:''
        },
        end:{
          date:''
        },
        summary:'',
        creator:{
          email:''
        }
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