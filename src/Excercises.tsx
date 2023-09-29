import cx from 'classnames';
import Confetti from 'react-confetti';
import type { Excercise } from './useExcercises';
import type { StatusStyle } from './consts';
import styles from './practice.module.scss';
import { formatExcercise } from './tools';
import { EventHandler } from 'react';

export function Excercises({
  excercises,
  onSubmit,
  onRestart,
  onReset,
}: {
  excercises: Excercise[];
  onSubmit: EventHandler<any>;
  onRestart: EventHandler<any>;
  onReset: EventHandler<any>;
}) {
  return (
    <main className={styles.main}>
      {excercises.every(({ status }) => /^correct/i.test(status)) ? (
        <Confetti />
      ) : null}
      <h1>בהצלחה</h1>
      <form className={styles.form} onSubmit={onSubmit} onReset={onRestart}>
        {excercises.map(({ id, arg1, operator, arg2, status }) => (
          <div className={styles.excercise} key={id}>
            <span>{arg1}</span>
            <span className={styles.operand} data-testid='operator'>
              {operator}
            </span>
            <span>{arg2}</span>
            <span className={styles.operand}>=</span>
            <input
              aria-label={formatExcercise({ arg1, arg2, operator })}
              className={cx(
                styles.result,
                styles[status.toLowerCase() as StatusStyle]
              )}
              name={`result-${id}`}
              type='number'
            />
          </div>
        ))}
        <button className={styles.submit}>בדיקה</button>
        <button type='reset' className={styles.submit}>
          נקה
        </button>
      </form>
      <button className={styles.reset} onClick={onReset}>
        התחל מחדש
      </button>
    </main>
  );
}
