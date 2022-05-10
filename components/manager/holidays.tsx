import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import IconButton from "./../iconButton";
import LabeledInput from "./../labeledInput";
import LabeledSelect from "./../labeledSelect";
import { GoCalendar } from "react-icons/go";
import { ScreenWidth } from "../screenWidth";
import OutlinedSurface from "./../outlinedSurface";

interface holidays {
    id: number;
    targetdate: string;
    holiday: string;
    daysclosed: string;
}

import React from "react";

interface props {
    show: boolean;
}

function holidays(p: props) {
    const { data: session } = useSession();
    const [holidays, setHolidays] = useState<holidays[]>([]);
    const [newHolidayDate, setNewHolidayDate] = useState("");
    const [newHolidayDescription, setNewHolidayDescription] = useState("");
    const [newDaysOff, setNewDaysOff] = useState("1");

    const screenSize = useContext(ScreenWidth);

    useEffect(() => {
        //update holidays
        if (session) {
            fetch(`/api/getHolidays`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log("response", data);
                    setHolidays(data.holidays);
                });
        } else {
            // console.log("Session not found, aborting fetch.");
        }
    }, []);

    const submitAddHoliday = () => {
        const options = {
            targetDate: newHolidayDate,
            holiday: newHolidayDescription,
            daysclosed: newDaysOff,
        };

        fetch(`/api/addHoliday`, {
            method: "POST",
            body: JSON.stringify(options),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("response", data);
                if (data?.holidays) setHolidays(data.holidays);
            });
    };

    const dayKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"].map((el) => (
        <option key={`${el}-newDay`} value={el}>
            {el}
        </option>
    ));

    const mapHolidays = Object.entries(holidays).map(([key, val]) => {
        return (
            <React.Fragment key={`${val.id}-employee-team-empty`}>
                <tr key={`${key}-table`}>
                    <td>{val.targetdate.slice(0, 10)}</td>
                    <td>{val.holiday}</td>
                    <td>{val.daysclosed}</td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={false}
                            onChange={async (e) => {
                                e.preventDefault();
                                fetch(`/api/deleteHoliday?id=${val.id}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        setHolidays(data.holidays);
                                    });
                            }}
                        />
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap  flex-row gap-2" : "col-span-12 flex  flex-row gap-2";

    const addHoliday = (
        <div className={p.show === true ? filtersFormat : "hidden"}>
            <OutlinedSurface label="Add Holiday">
                <div className={filtersFormat}>
                    <div>
                        <LabeledInput
                            fieldType="date"
                            id="fromdate"
                            label="Start Holiday"
                            value={newHolidayDate}
                            onClickCallback={setNewHolidayDate}
                            helperText="Start Date:"
                        />
                    </div>

                    <LabeledInput
                        id="newHolidayDescription"
                        label={`New Holiday Description`}
                        value={newHolidayDescription}
                        onClickCallback={setNewHolidayDescription}
                    />

                    <LabeledSelect
                        label="days"
                        value={newDaysOff}
                        onClickCallback={(e) => {
                            setNewDaysOff(e);
                        }}
                        id="newDay_ID"
                    >
                        {dayKeys}
                    </LabeledSelect>

                    <IconButton text="Add" callback={submitAddHoliday} icon={<GoCalendar className="h-7 w-7" />} />
                </div>
            </OutlinedSurface>
        </div>
    );

    const holidayContainer = (
        <div className={p.show === true ? "col-span-12 flex flex-row gap-2" : "hidden"}>
            <OutlinedSurface label="Review Holidays">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Name</td>
                            <td>Days Closed</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>{mapHolidays}</tbody>
                </table>
            </OutlinedSurface>
        </div>
    );

    return (
        <>
            {addHoliday}
            {holidayContainer}
        </>
    );
}

export default holidays;
