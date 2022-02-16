import React,{ useEffect,useRef,useState }  from 'react'

const Aside = React.forwardRef((props,ref) => {

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
    <div className="aside" ref={AsideUI.asideRef}>Aside Component</div>
  )
})

export default Aside