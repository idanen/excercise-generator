import cx from "classnames";
import Confetti from "react-confetti";
import styles from "./practice.module.scss";

export function Excercises({ excercises, onSubmit, onReset }) {
  return (
    <main className={styles.main}>
      {excercises.every(({ status }) => /^correct/i.test(status)) ? (
        <Confetti />
      ) : null}
      <h1>בהצלחה</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        {excercises.map(({ id, arg1, arg2, status }, index) => (
          <div className={styles.excercise} key={id}>
            <span>{arg1}</span>
            <span className={styles.operand}>+</span>
            <span>{arg2}</span>
            <span className={styles.operand}>=</span>
            <input
              aria-label={`Result for excercise ${index + 1}`}
              className={cx(styles.result, styles[status.toLowerCase()])}
              name={`result-${id}`}
              type="number"
            />
          </div>
        ))}
        <button className={styles.submit}>בדיקה</button>
      </form>
      <button className={styles.reset} onClick={onReset}>
        התחל מחדש
      </button>
    </main>
  );
}
