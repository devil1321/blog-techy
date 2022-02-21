import React,{useEffect,useState,useContext,useRef,useCallback} from 'react'
import Calendar from 'react-calendar';
import axios from 'axios'
import { AsideFormDataProvider, AsideFormDataContext } from '../context'

import { gsap } from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


const CalendarComp:React.FC = () => {
   
  const { formData ,setFormData } = useContext(AsideFormDataContext)
  const [value, onChange] = useState(new Date());
  const [currDate,setCurrDate] = useState(new Date())
  const [isErrorTime,setIsErrorTime] = useState<boolean>(false)
  const [isErrorSummary,setIsErrorSummary] = useState<boolean>(false)
  const [isErrorDescription,setIsErrorDescription] = useState<boolean>(false)
  const [isErrorDay,setIsErrorDay] = useState<boolean>(false)
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [events,setEvents] = useState<any>([])

  const tooltipRef = useRef<HTMLDivElement>()
  
  const parseDate = () =>{
    const newDate = new Date(value)
    setParsedDate(newDate.toISOString())
  }
  const checkDate = () =>{
    const currISO = value.toISOString()
    const paragraph = tooltipRef.current.querySelector('p')
    const form = tooltipRef.current.querySelector('form')
    let eventDate
    let dates:string[] = []
    events.map(event =>{
        if(event.start.date){
          eventDate = new Date(event.start.date)
        }else{
          eventDate = new Date(event.start.dateTime)
        }
        const eventDateISO = eventDate.toISOString()
        dates.push(eventDateISO.slice(0,10))
      })
      if(currDate.getTime() <= value.getTime() && !dates.includes(currISO.slice(0,10))){
        form.style.display = 'block'
        paragraph.textContent = 'Available'
        tooltipRef.current.classList.add('calendar__tooltip-available')
        tooltipRef.current.classList.remove('calendar__tooltip-unavaiable')
        
      }else{
        form.style.display = 'none'
        paragraph.textContent = 'Not Available'
        tooltipRef.current.classList.add('calendar__tooltip-unavaiable')
        tooltipRef.current.classList.remove('calendar__tooltip-available')
      }
  }
  const fetchBusyEvents = async () =>{
      const options:any = {
        method:"GET",
        url:'https://blog-calendar.herokuapp.com/get-events'
      }
      const data = await axios.request(options)
        .then(res => {
           return res.data.items
        })
        .catch(err => console.log(err))
        setEvents(data)
  }

  const setDay = () =>{}

  const setSummary = (e) =>{
      setFormData((prevState)=>({
          ...prevState,
          summary:e.target.value
      }))
  }
  const setDescription= (e) =>{
    setFormData((prevState)=>({
        ...prevState,
        description:e.target.value
    }))
  }
  const showTooltip = (e) =>{
    tooltipRef.current.style.opacity = '1'
    tooltipRef.current.style.visibility = 'visible'
    if(e.clientX < 1085){
        tooltipRef.current.style.top = e.target.offsetTop + 50 + 'px'
        tooltipRef.current.style.left = e.target.offsetLeft + 'px'
    }else{
        tooltipRef.current.style.top = e.target.offsetTop + 50 + 'px'
        tooltipRef.current.style.left = e.target.offsetLeft - 150 + 'px'
    }
  
}
 const hideTooltip = () =>{
 tooltipRef.current.style.opacity = '0'
 tooltipRef.current.style.visibility = 'hidden'
 tooltipRef.current.style.top = '500px'
 tooltipRef.current.style.left = '-100px'
 }  
  const submitForm = (e) =>{
        e.preventDefault()
       
        const options:any = {
          method:"POST",
          url:'https://blog-calendar.herokuapp.com/set-meeting',
          data:formData,
          headers:{
            'Content-Type':'application/json'
          }
        }
        if('condition date current'){
          if(formData.summary === ''){
            setIsErrorSummary(true)
            setTimeout(()=>{
              setIsErrorSummary(false)
            },1000)
          }
          else if(formData.description === ''){
            setIsErrorDescription(true)
            setTimeout(()=>{
              setIsErrorDescription(false)
            },1000)
          }
          else{
          axios.request(options)
          .then(res => {
            if(res.data.error){
                setIsErrorDay(true)
                setTimeout(()=>{
                  setIsErrorDay(false)
                },1000)
            }else{
              setFormData({
                start:{
                dateTime:'',
                timeZone:"Europe/Warsaw"
              },
              end:{
                dateTime:'',
                timeZone:"Europe/Warsaw"
              },
              summary:'',
              description:'',
            })
          
          } 
          }).catch(err => console.log(err))
        }
      }else{
    
        setIsErrorTime(true)
        setTimeout(()=>{
          setIsErrorTime(false)
        },1000)
      }
  }

  const handleAddListener = () =>{
    const calendarItems = document.querySelectorAll('.react-calendar__tile')
    calendarItems.forEach(item => item.addEventListener('click',(e:any)=>{
      showTooltip(e)
    }))
  }
  

  useEffect(()=>{
    handleAddListener()
    checkDate()
    if(!isLoad){
      fetchBusyEvents()
      setIsLoad(true)
    }
  },[value])

  return (
    <div className='calendar-wrapper'>
         <Calendar onChange={onChange} value={value} />
        <div className="calendar__tooltip" ref={tooltipRef}>
            <div className="calendar__tooltip-close" onClick={()=>{hideTooltip()}}>
                <span></span>
                <span></span>
            </div>
            <form className="calendar__tooltip-form" action="" onSubmit={(e)=>submitForm(e)}>
                <input type="text" placeholder="Your Name" value={formData.summary} onChange={(e)=>{setSummary(e)}}/>
                <input type="email" placeholder="Your Email" value={formData.description} onChange={(e)=>{setDescription(e)}}/>
                <button type="submit" >Add Meeting</button>
            </form>
            <p></p>
            {isErrorTime && <p className="calendar__tooltip-error">Choose Future Time</p>}
            {isErrorSummary && <p className="calendar__tooltip-error">Enter Name</p>}
            {isErrorDescription && <p className="calendar__tooltip-error">Enter Email</p>}
            {isErrorDay && <p className="calendar__tooltip-error">Day Is Reserverd</p>}
        </div>
      </div>
  )
}

export default CalendarComp