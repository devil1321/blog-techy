import React,{ useEffect,useRef,useState }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
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
      
      let firstDay = new Date(month,year,1)
      this.monthPickerRef.current.innerHTML = this.months[month]
      this.calendarHeaderYearRef.current.innerHTML = year

      for(let i = 0; i <= this.daysOfMonth[month] + firstDay.getDay() -1; i++){
        let day = document.createElement('div')
        if(i >= firstDay.getDay()){
          day.classList.add('calendar-day-hover')
          const dayNR = i - firstDay.getDay() + 1
          this.tempDate = new Date(year,month,dayNR+1)
          day.setAttribute('data-date',this.tempDate.toISOString())
          day.innerHTML = dayNR.toString()
          day.innerHTML += `<span></span><span></span><span></span><span></span>`
        }
        if(i - firstDay.getDay() + 1 === this.currDate.getDate() && year === this.currDate.getFullYear() && month === this.currDate.getMonth()){
          day.classList.add('curr-date')
        }
        this.calendarDaysRef.current.appendChild(day)
      }

    }
    generateMonths = () =>{
      this.months.forEach((month:string) => {
        let monthEl = document.createElement('div')
        monthEl.innerHTML = month
        monthEl.addEventListener('click',this.hideMonths)
        this.monthListRef.current.appendChild(monthEl)
      })
    }
    hideMonths = (e:any) =>{
      this.monthPickerRef.current.classList.remove('--show')
      const current = this.months.indexOf(e.target.textContent )
      this.currMonth = current
      this.generateCalendar(this.currMonth,this.currYear)
    }
    showMonths = () =>{
      this.monthPickerRef.current.classList.add('--show')
    }
    nextYear = () =>{
      ++this.currYear
      this.generateCalendar(this.currMonth,this.currYear)
    }
    prevYear = () =>{
      --this.currYear
      this.generateCalendar(this.currMonth,this.currYear)
    }
  }

  const CalendarUI = new Calendar()
  const AsideUI = new SetAside()

  useEffect(()=>{
    AsideUI.setAside()
    CalendarUI.generateMonths()
    CalendarUI.generateCalendar(CalendarUI.currMonth,CalendarUI.currYear)
  },[])

  return (
    <div className="aside" ref={AsideUI.asideRef}>
      {/* <div className="aside-calendar">
        <iframe src="https://calendar.google.com/calendar/embed?height=300&wkst=1&bgcolor=%23616161&ctz=Europe%2FWarsaw&showTitle=0&showTz=0&showNav=1&showTabs=0&showPrint=0&src=Y2Nhdm0wZXBmNGFvdWZkc2o5djk3ZnFmbWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23795548" style={{borderWwidth:0}} width="400" height="300" frameborder="0" scrolling="no"></iframe>
      </div> */}
      <div className="calendar" ref={CalendarUI.calendarRef}>
        <div className="calendar__header">
          <span onClick={()=>{CalendarUI.showMonths()}} className="month-picker" id="month-picker" ref={CalendarUI.monthPickerRef}>
            Febuary
          </span>
          <div className="year-picker">
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
        <div className="month-list" ref={CalendarUI.monthListRef}></div>
      </div>
    </div>
  )
})

export default Aside