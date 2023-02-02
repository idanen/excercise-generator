import { useState } from "react";
import styles from "./practice.module.scss";

export function InitForm({ onInit }) {
  const [limit, setLimit] = useState(100);

  return (
    <form className={styles["init-form"]} onSubmit={onInit}>
      <label htmlFor="ex-limit">
        גבול עליון <em style={{ fontSize: "smaller" }}>({limit})</em>
      </label>
      <input
        id="ex-limit"
        defaultValue={100}
        onChange={(event) => setLimit(event.target.value)}
        type="range"
        name="limit"
        min="30"
        max="100"
      />
      <label htmlFor="ex-count">כמה תרגילים</label>
      <input id="ex-count" defaultValue={10} type="number" name="count" />
      <button>התחל</button>
    </form>
  );
}
