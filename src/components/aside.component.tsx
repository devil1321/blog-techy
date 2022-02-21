import React,{ useEffect,useRef,useContext, MutableRefObject, RefObject }  from 'react'
import Calendar from './calendar.compoent'
import { AsideFormDataProvider, AsideFormDataContext } from '../context'
import WheatherMainItem from './wheather-widget.component'
import { AsideFormData } from '../interfaces';




const Aside = React.forwardRef<HTMLDivElement>((props,ref) => { 
  const { formData ,setFormData } = useContext(AsideFormDataContext)

  const asideRef = useRef<HTMLDivElement>()

  const setAside = () =>{
    if(typeof window !== 'undefined'){
        asideRef.current.style.height = ref.current.clientHeight + 'px'
    }
  }

  useEffect(()=>{
    setAside()
  },[])

  return (
    <AsideFormDataProvider>
      <div className="aside" ref={asideRef}>
        <h2 className="aside__title">Make An Appointment</h2>
        <div className="aside__inner-wrapper">
          <Calendar />
          <WheatherMainItem />
        </div>
      </div>
    </AsideFormDataProvider>
  )
})

export default Aside