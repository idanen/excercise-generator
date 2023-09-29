import { useState, Fragment, useCallback } from 'react';
import type { SyntheticEvent, ChangeEvent, EventHandler } from 'react';
import { AllowedOperations } from './consts';
import styles from './init-form.module.scss';

export function InitForm({ onInit }: { onInit: EventHandler<SyntheticEvent> }) {
  const [limit, setLimit] = useState(100);
  const [additionChecked, setAdditionChecked] = useState(true);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
    if (event.target.value !== AllowedOperations.ADDITION.id) {
      return;
    }

    setAdditionChecked(event.target.checked);
  }, []);

  const handleSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();

    const hasChecked = [
      ...(event.target as HTMLFormElement).querySelectorAll(
        'input[name="operations"]'
      ),
    ].some((input) => (input as HTMLInputElement).checked);

    if (hasChecked) {
      onInit(event);
      setErrors({});
    } else {
      setErrors((prev) => ({
        ...prev,
        operations: 'יש לבחור לפחות פעולה אחת',
      }));
    }
  }, []);

  return (
    <>
      <h1>מחולל התרגילים</h1>
      <h2>תרגילי חשבון לכיתות ב עד ה</h2>
      <h3>בחר.י את סוגי התרגילים</h3>
      <form
        className={styles['init-form']}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor='ex-count'>כמה תרגילים</label>
        <input id='ex-count' defaultValue={10} type='number' name='count' />
        <fieldset className={styles.operations} name='operations-group'>
          <legend className={styles.legend}>פעולות</legend>
          <div className={styles.group}>
            {Object.values(AllowedOperations).map(({ id, label }) => (
              <Fragment key={id}>
                <input
                  id={id}
                  value={id}
                  type='checkbox'
                  name='operations'
                  defaultChecked={id === AllowedOperations.ADDITION.id}
                />
                <label htmlFor={id}>{label}</label>
              </Fragment>
            ))}
          </div>
          {errors?.operations ? (
            <div className={styles.error} role='alert'>
              {errors?.operations}
            </div>
          ) : null}
        </fieldset>
        <fieldset
          disabled={!additionChecked}
          className={`${styles.operations} ${styles['init-form']}`}
          name='addition-config'
        >
          <label htmlFor='ex-limit'>
            גבול עליון לחיבור <em style={{ fontSize: 'smaller' }}>({limit})</em>
          </label>
          <input
            id='ex-limit'
            defaultValue={100}
            onChange={(event) => setLimit(event.target.valueAsNumber)}
            type='range'
            name='limit'
            min='30'
            max='100'
          />
        </fieldset>
        <button>התחל</button>
      </form>
    </>
  );
}
