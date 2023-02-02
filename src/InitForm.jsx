import { useState, Fragment, useCallback } from 'react';
import { AllowedOperations } from './consts';
import styles from './practice.module.scss';

export function InitForm({ onInit }) {
  const [limit, setLimit] = useState(100);
  const [errors, setErrors] = useState(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const hasChecked = [
      ...event.target.querySelectorAll('input[name="operations"]'),
    ].some((input) => input.checked);

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
    <form className={styles['init-form']} onSubmit={handleSubmit}>
      <label htmlFor='ex-limit'>
        גבול עליון <em style={{ fontSize: 'smaller' }}>({limit})</em>
      </label>
      <input
        id='ex-limit'
        defaultValue={100}
        onChange={(event) => setLimit(event.target.value)}
        type='range'
        name='limit'
        min='30'
        max='100'
      />
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
          <div role='alert'>{errors?.operations}</div>
        ) : null}
      </fieldset>
      <button>התחל</button>
    </form>
  );
}
