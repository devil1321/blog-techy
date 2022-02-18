import React,{useEffect,useState,useContext,useRef} from 'react'
import axios from 'axios'
import { AsideFormDataProvider, AsideFormDataContext } from '../context'

import { gsap } from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Calendar:React.FC<any> = ({fullWidth,auto}) => {
   
  const { formData ,setFormData } = useContext(AsideFormDataContext)
  const [isErrorTime,setIsErrorTime] = useState<boolean>(false)
  const [isErrorSummary,setIsErrorSummary] = useState<boolean>(false)
  const [isErrorDescription,setIsErrorDescription] = useState<boolean>(false)
  const [isErrorDay,setIsErrorDay] = useState<boolean>(false)
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [events,setEvents] = useState<any>([])

  const [currMonth,setCurrMonth] = useState<number>(0)

  class Calendar{
    public currDate:any
    public currDay:number;
    public currMonth:number
    public currYear:number;
    public months:string[]
    public daysOfMonth:number[]
    public tempDate:any;
    public calendarRef:any
    public calendarDaysRef:any
    public calendarHeaderYearRef:any
    public monthPickerRef:any;
    public monthListRef:any
    public tooltipRef:any;

    constructor(){
      this.currDate = new Date()
      this.currDay = this.currDate.getDate()
      this.currMonth = this.currDate.getMonth()
      this.currYear = this.currDate.getFullYear()
      this.tempDate = ''
      this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      this.daysOfMonth = [31,this.getFebDays(this.currYear),31,30,31,30,31,31,30,31,30,31]
      this.calendarRef = useRef()
      this.calendarHeaderYearRef = useRef()
      this.calendarDaysRef = useRef()
      this.monthPickerRef = useRef()
      this.monthListRef = useRef()
      this.tooltipRef = useRef()
    }
    isLeapYear = (year) =>{
      return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 ===0 && year % 400 === 0)
    }
    getFebDays = (year) =>{
      return this.isLeapYear(year) ? 29 : 28
    }
    generateCalendar = (month,year) =>{
        this.calendarDaysRef.current.innerHTML = ''
        let firstDay = new Date(month,year,1)
        this.monthPickerRef.current.innerHTML = this.months[month]
        this.calendarHeaderYearRef.current.innerHTML = year
        for(let i = 0; i <= this.daysOfMonth[month] + firstDay.getDay() -1; i++){
          let day = document.createElement('div')
          day.classList.add('calendar__day-item')
          if(i >= firstDay.getDay()){
            day.classList.add('calendar__day-hover')
            const dayNR = i - firstDay.getDay() + 1
            const hours = new Date()
            this.tempDate = new Date(year,month,dayNR,1,0,0)
        
            var timeString = new Date(this.tempDate.toISOString());
            var duration = '22:59:00';
          
            var startDate = new Date(timeString);
            var msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
            var endDate = new Date(startDate.getTime() + msDuration);
            var isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
            var isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];
          


            day.setAttribute('data-start',isoStartDate)
            this.tempDate = new Date(year,month,dayNR, 24,59,59)
            day.setAttribute('data-end',isoEndDate)
            events.map(event => {
              console.log(event)
              if(event.start.date){
                var eventDate = new Date(event.start.date)
              }else{
                var eventDate = new Date(event.start.dateTime)
              }
              const isoEventDate = eventDate.toISOString()
              if(eventDate.getTime() > this.currDate.getTime()){
                if(day.dataset.start.slice(0,10) === isoEventDate.slice(0,10)){
                  day.classList.add('--unavaiable')
                }else{
                  day.classList.add('--available')
                  
                }
              }
            })

            day.innerHTML = dayNR.toString()
            day.innerHTML += ``
            day.addEventListener('click',(e:any)=>{
                this.setDay(e)
                this.showTooltip(e)
            })
          }
          if(i - firstDay.getDay() + 1 === this.currDate.getDate() && year === this.currDate.getFullYear() && month === this.currDate.getMonth()){
            day.classList.add('curr-date')
          }
          this.calendarDaysRef.current.appendChild(day)
        }
        AnimationsUI.calendarDaysComesIn()
    }
    generateMonths = () =>{
      this.monthListRef.current.innerHTML = ''
      this.months.forEach((month:string) => {
        let monthEl = document.createElement('div')
        monthEl.innerHTML = month
        monthEl.addEventListener('click',(e)=>this.hideMonths(e))
        this.monthListRef.current.appendChild(monthEl)
      })
    }
    hideMonths = (e:any) =>{
      console.log('hide')
      this.monthListRef.current.classList.remove('--show')
      const current = this.months.indexOf(e.target.textContent )
      this.currMonth = current
      setCurrMonth(current)
      this.generateCalendar(current,this.currYear)
    }
    showMonths = () =>{
      this.monthListRef.current.classList.add('--show')
    }
    nextYear = () =>{
      this.currYear++
      this.generateCalendar(currMonth,this.currYear)
    }
    prevYear = () =>{
      this.currYear--
      this.generateCalendar(currMonth,this.currYear)
    }
    showTooltip = (e) =>{
        console.log('show')
        console.log(e.clientX)
        const paragraph = this.tooltipRef.current.querySelector('p')
        const form = this.tooltipRef.current.querySelector('form')
        console.log(paragraph)
        this.tooltipRef.current.style.opacity = 1
        this.tooltipRef.current.style.visibility = 'visible'
        if(e.clientX < 1085){
            this.tooltipRef.current.style.top = e.target.offsetTop + 50 + 'px'
            this.tooltipRef.current.style.left = e.target.offsetLeft + 'px'
        }else{
            this.tooltipRef.current.style.top = e.target.offsetTop + 50 + 'px'
            this.tooltipRef.current.style.left = e.target.offsetLeft - 150 + 'px'
        }
        if(this.currDay >= this.currDate.getDate()){
            form.style.display = 'block'
            paragraph.textContent = 'Available'
            this.tooltipRef.current.classList.add('--available')
            this.tooltipRef.current.classList.remove('--unavaiable')

        }else{
            form.style.display = 'none'
            paragraph.textContent = 'Not Available'
            this.tooltipRef.current.classList.add('--unavaiable')
            this.tooltipRef.current.classList.remove('--available')


        }
    }
    hideTooltip = () =>{
       this.tooltipRef.current.style.opacity = 0
       this.tooltipRef.current.style.visibility = 'hidden'
       this.tooltipRef.current.style.top = '500px'
       this.tooltipRef.current.style.left = '-100px'
    }
    setDay = (e) =>{
        const day = e.target.textContent 
        this.currDay = parseInt(day) - 1
        setFormData((prevState)=>({
            ...prevState,

            start:{
              dateTime:e.target.dataset.start,
              timeZone:"Europe/Warsaw"
            },
            end:{
              dateTime:e.target.dataset.end,
              timeZone:"Europe/Warsaw"
            }
          })
        )
    }
    setBusyEvents = async () =>{
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
    setSummary = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            summary:e.target.value
        }))
    }
    setDescription= (e) =>{
      setFormData((prevState)=>({
          ...prevState,
          description:e.target.value
      }))
  }
    submitForm = (e) =>{
        e.preventDefault()
        const date = new Date()
        const tempDate = date.toISOString()
        date.toISOString()
        setTimeout(()=>{
          this.generateCalendar(currMonth,CalendarUI.currYear)
          this.hideTooltip()
        },4000)
        const options:any = {
          method:"POST",
          url:'https://blog-calendar.herokuapp.com/set-meeting',
          data:formData,
          headers:{
            'Content-Type':'application/json'
          }
        }
        if(formData.start.dateTime.slice(0,10) >= tempDate.slice(0,10)){
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
  }

  class Animations {
    public days:NodeListOf<HTMLDivElement>
    public tlCalendar:any;
    constructor(){
      this.tlCalendar = gsap.timeline()
    }
    calendarDaysComesIn = () =>{
      this.tlCalendar.fromTo('.calendar__day-item', {
        y: 5,
        x:-5,
        opacity:0
      },{
        x:0,
        y:0,
        opacity:1,
        stagger: { // wrap advanced options in an object
          each: 0.05,
          from: "start",
          grid: "auto",
          ease: "power2.inOut",
        }
      });
    }
  }

  const CalendarUI = new Calendar()
  const AnimationsUI = new Animations()


  useEffect(()=>{
    if(!isLoad){
      setTimeout(()=>{
        setIsLoad(true)
      },1000)
    }
    new Promise((resolve,reject)=>{
      CalendarUI.setBusyEvents()
      setCurrMonth(CalendarUI.currMonth)
      resolve('setted')
    }).then((data)=>{
      setTimeout(()=>{
        console.log(events)
      },1000)
    })
    if(isLoad){
      CalendarUI.generateMonths()
      CalendarUI.generateCalendar(currMonth,CalendarUI.currYear)
    }
  },[isLoad])

  return (
    <div className={`calendar ${fullWidth ? 'full-width' : null} ${auto ? "auto" : null}`} ref={CalendarUI.calendarRef}>
        <div className="calendar__header">
          <span onClick={()=>{CalendarUI.showMonths()}} className="calendar__month-picker" id="month-picker" ref={CalendarUI.monthPickerRef}>
            Febuary
          </span>
          <div className="calendar__year-picker">
            <span className="year-change" id="prev-year" onClick={()=>{CalendarUI.prevYear()}}>
              <span><FontAwesomeIcon icon={faChevronLeft} /></span>
            </span>
            <span id="year" ref={CalendarUI.calendarHeaderYearRef}>2022</span>
            <span className="next-change" id="next-year" onClick={()=>{CalendarUI.nextYear()}}>
              <span><FontAwesomeIcon icon={faChevronRight} /></span>
            </span>
          </div>
        </div>
        <div className="calendar__body">
          <div className="calendar__week-day">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar__days" ref={CalendarUI.calendarDaysRef}>
           
          </div>
        </div>
        <div className="calendar__month-list" ref={CalendarUI.monthListRef}></div>
        <div className="calendar__tooltip" ref={CalendarUI.tooltipRef}>
            <div className="calendar__tooltip-close" onClick={()=>{CalendarUI.hideTooltip()}}>
                <span></span>
                <span></span>
            </div>
            <form className="calendar__tooltip-form" action="" onSubmit={(e)=>CalendarUI.submitForm(e)}>
                <input type="text" placeholder="Your Name" value={formData.summary} onChange={(e)=>{CalendarUI.setSummary(e)}}/>
                <input type="email" placeholder="Your Email" value={formData.description} onChange={(e)=>{CalendarUI.setDescription(e)}}/>
                <button type="submit" onClick={()=>{
                 setTimeout(()=>{
                    CalendarUI.generateCalendar(currMonth,CalendarUI.currYear)
                 },10000)
                }}>Add Meeting</button>
            </form>
            <p></p>
            {isErrorTime && <p className="--error">Choose Future Time</p>}
            {isErrorSummary && <p className="--error">Enter Name</p>}
            {isErrorDescription && <p className="--error">Enter Email</p>}
            {isErrorDay && <p className="--error">Day Is Reserverd</p>}
        </div>
      </div>
  )
}

export default Calendar