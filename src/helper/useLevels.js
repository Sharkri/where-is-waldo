import { useEffect, useState } from "react";
import getLevels from "./levels";

export default function useLevels() {
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    getLevels().then(setLevels);
  }, []);

  return levels;
}
