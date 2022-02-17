import React,{ useEffect,useRef,useContext }  from 'react'
import Calendar from './calendar.compoent'
import { AsideFormDataProvider, AsideFormDataContext } from '../context'
import WheatherMainItem from './wheather-widget.component'


const Aside = React.forwardRef((props,ref) => { 
  const { formData ,setFormData } = useContext(AsideFormDataContext)
 

  class SetAside{
    public asideRef:any;
    public container:any
    constructor(){
      this.asideRef = useRef()
      this.container = ref
    }
    setAside = () =>{
      if(typeof window !== 'undefined'){
          this.asideRef.current.style.height = this.container.current.clientHeight + 'px'
      }
    }
  }

  const AsideUI = new SetAside()

  useEffect(()=>{
    AsideUI.setAside()
  },[])

  return (
    <AsideFormDataProvider>
      <div className="aside" ref={AsideUI.asideRef}>
        <h2 className="aside__title">Umów Spotkanie</h2>
        <Calendar />
        <WheatherMainItem />
      </div>
    </AsideFormDataProvider>
  )
})

export default Aside