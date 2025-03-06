import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/Button";

export default function PositionButton({ setPosition, positionValue, positionDescription }) {
  function handleOnButtonClick(e) {
    setPosition(() => positionValue);
  }

  return <Button onClick={(e) => handleOnButtonClick(e)}>{positionDescription}</Button>;
}
