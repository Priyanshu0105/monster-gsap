"use client";

import { useProgress } from "@react-three/drei";

export default function Loader() {

  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="loader-screen">

      <div className="loader-core">

        <div className="loader-logo">
          M
        </div>

        <div className="loader-bar">
          <div
            className="loader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loader-percent">
          {progress.toFixed(0)}%
        </div>

      </div>

    </div>
  );
}