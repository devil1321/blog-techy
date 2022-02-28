import React,{ useEffect,useRef }  from 'react'
import CalendarComp from './calendar.compoent'
import WheatherMainItem from './wheather-widget.component'




const Aside = React.forwardRef<HTMLDivElement>((props,ref) => { 

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
      <div className="aside" ref={asideRef}>
        <h2 className="aside__title">Make An Appointment</h2>
        <div className="aside__inner-wrapper">
          <CalendarComp />
          <WheatherMainItem />
        </div>
      </div>
  )
})

export default Aside