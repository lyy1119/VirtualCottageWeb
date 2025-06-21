// hooks/useAudioList.js
import { useEffect, useState } from "react";

export default function useAudioList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/audio/index.json")
      .then((res) => res.json())
      .then(setList)
      .catch(console.error);
  }, []);
  return list;
}
