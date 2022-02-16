import React,{ useEffect,useRef,useState }  from 'react'
import { gsap } from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Aside = React.forwardRef((props,ref) => {

  const [formData,setFormData] = useState({
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
  useEffect(()=>{
    console.log(formData)
  },[formData])
  class Calendar{
    public currDate:any
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

    constructor(){
      this.currDate = new Date()
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
          this.tempDate = new Date(year,month,dayNR+1)
          day.setAttribute('data-date',this.tempDate.toISOString())
          day.innerHTML = dayNR.toString()
          day.innerHTML += ``
          day.addEventListener('click',(e:any)=>{setFormData((prevState)=>({
                ...prevState,
                start:{
                  date:e.target.dataset.date
                },
                end:{
                  date:e.target.dataset.date
                }
              })
            )
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
      this.generateCalendar(this.currMonth,this.currYear)
    }
    showMonths = () =>{
      this.monthListRef.current.classList.add('--show')
    }
    nextYear = () =>{
      this.currYear++
      this.generateCalendar(this.currMonth,this.currYear)
    }
    prevYear = () =>{
      this.currYear--
      this.generateCalendar(this.currMonth,this.currYear)
    }
  }

  class Animations {
    public days:NodeListOf<HTMLDivElement>
    constructor(){
      this.tl = gsap.timeline()
    }
    calendarDaysComesIn = () =>{
      gsap.fromTo('.calendar__day-item', {
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
  const AsideUI = new SetAside()
  const AnimationsUI = new Animations()

  useEffect(()=>{
    AsideUI.setAside()
    CalendarUI.generateMonths()
    CalendarUI.generateCalendar(CalendarUI.currMonth,CalendarUI.currYear)
  },[])

  return (
    <div className="aside" ref={AsideUI.asideRef}>
      <h2 className="aside__title">Umów Spotkanie</h2>
      <div className="calendar" ref={CalendarUI.calendarRef}>
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
      </div>
    </div>
  )
})

export default Aside