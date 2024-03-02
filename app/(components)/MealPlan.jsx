import React from "react";

export default function MealPlan() {
  return (
    <>
      <div>MealPlan</div>
      <div className="grid grid-cols-7 grid-rows-4 gap-2">
        <div>Sunday</div>
        <div className="col-start-1 row-start-2">Breakfast</div>
        <div className="col-start-1 row-start-3">Lunch</div>
        <div className="col-start-1 row-start-4">Dinner</div>

        <div className="col-start-2 row-start-1">Monday</div>
        <div className="col-start-2 row-start-2">Breakfast</div>
        <div className="col-start-2 row-start-3">Lunch</div>
        <div className="col-start-2 row-start-4">Dinner</div>

        <div className="col-start-3 row-start-1">Tuesday</div>
        <div className="col-start-3 row-start-2">Breakfast</div>
        <div className="col-start-3 row-start-3">Lunch</div>
        <div className="col-start-3 row-start-4">Dinner</div>

        <div className="col-start-4 row-start-1">Wednesday</div>
        <div className="col-start-4 row-start-2">Breakfast</div>
        <div className="col-start-4 row-start-3">Lunch</div>
        <div className="col-start-4 row-start-4">Dinner</div>

        <div className="col-start-5 row-start-1">Thursday</div>
        <div className="col-start-5 row-start-2">Breakfast</div>
        <div className="col-start-5 row-start-3">Lunch</div>
        <div className="col-start-5 row-start-4">Dinner</div>

        <div className="col-start-6 row-start-1">Friday</div>
        <div className="col-start-6 row-start-2">Breakfast</div>
        <div className="col-start-6 row-start-3">Lunch</div>
        <div className="col-start-6 row-start-4">Dinner</div>

        <div className="col-start-7 row-start-1">Saturday</div>
        <div className="col-start-7 row-start-2">Breakfast</div>
        <div className="col-start-7 row-start-3">Lunch</div>
        <div>Dinner</div>
      </div>
    </>
  );
}
