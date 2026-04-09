"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loader(){

  const { progress, active } = useProgress();

  const [visible,setVisible] = useState(true);

  useEffect(()=>{

    if(progress === 100){

      setTimeout(()=>{
        setVisible(false);
      },400);

    }

  },[progress]);

  if(!visible) return null;

  return(

    <div className="loader-screen">

      <div className="loader-core">

        <div className="loader-logo">
          M
        </div>

        <div className="loader-bar">

          <div
          className="loader-fill"
          style={{width:`${progress}%`}}
          />

        </div>

        <div className="loader-percent">
          {Math.floor(progress)}%
        </div>

      </div>

    </div>

  );

}