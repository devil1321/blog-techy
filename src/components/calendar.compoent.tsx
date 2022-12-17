import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import Calendar from "react-calendar";
import axios from "axios";
import moment from "moment";
import { AxiosOptions, FormDataStateCalendar } from '../interfaces'

interface FetchBusyEvents {
  method:any;
  url:string;
}

const CalendarComp: React.FC = () => {
  const [ formData, setFormData ] = useState<FormDataStateCalendar>({
    start:{
      dateTime: "",
      timeZone: "Europe/Warsaw",
    },
    end:{
      dateTime: "",
      timeZone: "Europe/Warsaw",
    },
    summary: "",
    description: "",
  });
  const [value, onChange] = useState<Date>(new Date());
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const [isErrorTime, setIsErrorTime] = useState<boolean>(false);
  const [isErrorSummary, setIsErrorSummary] = useState<boolean>(false);
  const [isErrorDescription, setIsErrorDescription] = useState<boolean>(false);
  const [isErrorDay, setIsErrorDay] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [events, setEvents] = useState<any>([]);

  const locale = "pl-PL";

  const tooltipRef = useRef<HTMLDivElement>();

  const fetchBusyEvents = async () => {
    const options: FetchBusyEvents = {
      method: "GET",
      url: "https://blog-calendar.herokuapp.com/get-events"
      }
    };
    const data = await axios
      .request(options)
      .then((res) => {
        return res.data.items;
      })
      .catch((err) => console.log(err));
    setEvents(data);
  };
  const handleBusyEvents = () => {
    const calendarItems = document.querySelectorAll(".react-calendar__tile") as NodeListOf<HTMLDivElement>
    calendarItems.forEach((day:HTMLDivElement) => {
      const abbr = day.querySelector("abbr")
      const abbrAriaLabel = abbr.getAttribute("aria-label");
      const itemDate = new Date(abbrAriaLabel);
      const itemDateISO = itemDate.toISOString();
      let eventDate: Date;
      events?.map((event) => {
        if (event.start.date) {
          eventDate = new Date(event.start.date);
        } else {
          eventDate = new Date(event.start.dateTime);
        }
        const eventDateISO = eventDate.toISOString();
        if (itemDateISO.slice(0, 10) == eventDateISO.slice(0, 10)) {
          day.style.color = "white";
          day.style.backgroundColor = "red";
        }
      });
    });
  };

  const showTooltip = (e) => {
    tooltipRef.current.style.opacity = "1";
    tooltipRef.current.style.visibility = "visible";
    if (e.clientX < 1085) {
      tooltipRef.current.style.top = e.target.offsetTop + 50 + "px";
      tooltipRef.current.style.left = e.target.offsetLeft + "px";
    } else {
      tooltipRef.current.style.top = e.target.offsetTop + 50 + "px";
      tooltipRef.current.style.left = e.target.offsetLeft - 150 + "px";
    }
  };
  const hideTooltip = () => {
    tooltipRef.current.style.opacity = "0";
    tooltipRef.current.style.visibility = "hidden";
    tooltipRef.current.style.top = "500px";
    tooltipRef.current.style.left = "-100px";
  };
  const checkDate = () => {
    const currISO = value.toISOString();
    const paragraph = tooltipRef.current.querySelector("p");
    const form = tooltipRef.current.querySelector("form");
    let eventDate: Date;
    let dates: string[] = [];

    events?.map((event) => {
      if (event.start.date) {
        eventDate = new Date(event.start.date);
      } else {
        eventDate = new Date(event.start.dateTime);
      }
      const eventDateISO:string = eventDate.toISOString();
      dates.push(eventDateISO.slice(0, 10));
    });
    if (
      currDate.getTime() <= value.getTime() &&
      !dates.includes(currISO.slice(0, 10))
    ) {
      form.style.display = "block";
      paragraph.textContent = "Available";
      paragraph.style.color = "yellowgreen";
      tooltipRef.current.classList.add("calendar__tooltip-available");
      tooltipRef.current.classList.remove("calendar__tooltip-unavaiable");
    } else {
      form.style.display = "none";
      paragraph.textContent = "Unavailable";
      paragraph.style.color = "red";
      tooltipRef.current.classList.add("calendar__tooltip-unavaiable");
      tooltipRef.current.classList.remove("calendar__tooltip-available");
    }
  };
  const setDay = (e) => {
    const abbr = e.target.querySelector("abbr");
    const date = abbr.getAttribute("aria-label");
    let duration = "01:00:00";
    let startDate = new Date(date);
    let msDuration =
      (Number(duration.split(":")[0]) * 60 * 60 +
        Number(duration.split(":")[1]) * 60 +
        Number(duration.split(":")[2])) *
      1000;
    let endDate:Date = new Date(startDate.getTime() + msDuration);
    let isoStartDate:string = new Date(
      startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split(".")[0];
    let isoEndDate:string = new Date(
      endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split(".")[0];
    setFormData((prevState) => ({
      start: {
        dateTime: isoStartDate,
        timeZone: "Europe/Warsaw",
      },
      end: {
        dateTime: isoEndDate,
        timeZone: "Europe/Warsaw",
      },
    }));
  };

  const setSummary = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      summary: e.target.value,
    }));
  };
  const setDescription = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  const submitForm = (e) => {
    e.preventDefault();
    const options: AxiosOptions = {
      method: "POST",
      url: "https://blog-calendar.herokuapp.com/set-meeting",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if ("condition date current") {
      if (formData.summary === "") {
        setIsErrorSummary(true);
        setTimeout(() => {
          setIsErrorSummary(false);
        }, 1000);
      } else if (formData.description === "") {
        setIsErrorDescription(true);
        setTimeout(() => {
          setIsErrorDescription(false);
        }, 1000);
      } else {
        axios
          .request(options)
          .then((res) => {
            if (res.data.error) {
              setIsErrorDay(true);
              setTimeout(() => {
                setIsErrorDay(false);
              }, 1000);
            } else {
              setFormData({
                start: {
                  dateTime: "",
                  timeZone: "Europe/Warsaw",
                },
                end: {
                  dateTime: "",
                  timeZone: "Europe/Warsaw",
                },
                summary: "",
                description: "",
              });
            }
          })
          .then((data) => {
            hideTooltip();
          })
          .catch((err) => console.log(err));
      }
    } else {
      setIsErrorTime(true);
      setTimeout(() => {
        setIsErrorTime(false);
      }, 1000);
    }
  };

  const handleAddDayEvent = () => {
    const calendarItems = document.querySelectorAll(".react-calendar__tile") as NodeListOf<HTMLDivElement>
    calendarItems.forEach((item:HTMLDivElement) =>
      item.addEventListener("click", (e: any) => {
        showTooltip(e);
        setDay(e);
      })
    );
  };

  const handleAddBtnsEvent = () => {
    const calendar = document.querySelector(".react-calendar") as HTMLDivElement;
    const btns = calendar.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        setTimeout(() => {
          handleBusyEvents();
        }, 10);
      })
    );
  };

  const setCalendarSize = () => {
    const calendar = document.querySelector(".react-calendar") as HTMLDivElement;
    calendar.classList.add("full-width");
  };

  useEffect(() => {
    handleAddBtnsEvent();
    handleAddDayEvent();
    checkDate();
    if (!isLoad) {
      fetchBusyEvents();
      setIsLoad(true);
    }
    if (events.length > 0) {
      handleBusyEvents();
    }
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        setCalendarSize();
      }
    }
  }, [value, events]);

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={onChange}
        formatLongDate={(locale, date) => moment(date).format()}
        value={value}
      />
      <div className="calendar__tooltip" ref={tooltipRef}>
        <div
          className="calendar__tooltip-close"
          onClick={() => {
            hideTooltip();
          }}
        >
          <span></span>
          <span></span>
        </div>
        <form
          className="calendar__tooltip-form"
          action=""
          onSubmit={(e) => submitForm(e)}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={formData.summary}
            onChange={(e) => {
              setSummary(e);
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.description}
            onChange={(e) => {
              setDescription(e);
            }}
          />
          <button type="submit">Add Meeting</button>
        </form>
        <p></p>
        {isErrorTime && (
          <p className="calendar__tooltip-error">Choose Future Time</p>
        )}
        {isErrorSummary && (
          <p className="calendar__tooltip-error">Enter Name</p>
        )}
        {isErrorDescription && (
          <p className="calendar__tooltip-error">Enter Email</p>
        )}
        {isErrorDay && (
          <p className="calendar__tooltip-error">Day Is Reserverd</p>
        )}
      </div>
    </div>
  );
};

export default CalendarComp;
