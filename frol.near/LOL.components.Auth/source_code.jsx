// if (context.accountId) {
//     return <></>;
// }

State.init({
  mode: null,
  form: {},
});

const onTextChange = (event) => {
  State.update({
    form: { ...state.form, [event.target.id]: event.target.value },
  });
};

const createNewAccount = () => {
  State.update({ isLoading: true });
  asyncFetch("https://coins.summerschool.lol/create-new-account", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...state.form,
      new_account_id: `${state.form.new_account_id}.near`,
    }),
  }).then((data) => {
    if (data.ok) {
      State.update({
        isLoading: false,
        mode: "CREATE_NEW_ACCOUNT_SUCCESS",
      });
    } else {
      State.update({
        isLoading: false,
        formError: `Трапилась помилка при створенні акаунту! Перевірте що акаунту з таким псевдонімом ще не існує, пароль введено правильно і публічний ключ відповідає формату "ed25519:..." (${JSON.stringify(
          data
        )})`,
      });
    }
  });
};

const linkExistingAccount = () => {
  State.update({ isLoading: true });
  asyncFetch("https://coins.summerschool.lol/link-existing-account", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...state.form,
      existing_account_id: context.accountId,
    }),
  }).then((data) => {
    if (data.ok) {
      State.update({
        isLoading: false,
        mode: "LINK_EXISTING_ACCOUNT_SUCCESS",
      });
    } else {
      State.update({
        isLoading: false,
        formError: `Трапилась помилка при реєстрації акаунту! Перевірте що пароль введено правильно" (${JSON.stringify(
          data
        )})`,
      });
    }
  });
};

if (state.mode === null) {
  return (
    <>
      <div>
        <button onClick={() => State.update({ mode: "CREATE_NEW_ACCOUNT" })}>
          Створити новий акаунт NEAR
        </button>
      </div>
      або
      <div>
        <button onClick={() => State.update({ mode: "LINK_EXISTING_ACCOUNT" })}>
          Увійти у ЛОЛ з моїм існуючим акаунтом NEAR
        </button>
      </div>
    </>
  );
} else if (state.mode === "CREATE_NEW_ACCOUNT") {
  return (
    <>
      <h2>Вітаємо у ЛОЛ!</h2>
      <div>
        <label>
          Псевдонім (NEAR account ID):{" "}
          <input type="text" id="new_account_id" onChange={onTextChange} />
          {state.form.new_account_id
            ? `Імʼя вашого акаунта буде ${state.form.new_account_id}.near`
            : null}
        </label>
      </div>
      <div>
        <label>
          Секретний пароль що був надісланий на електронну пошту:{" "}
          <input type="password" id="password" onChange={onTextChange} />
        </label>
      </div>
      <div>
        <label>
          Згенеруйте пару криптографічних ключів ed25519 (наприклад,{" "}
          <a href="https://near.github.io/near-seed-phrase/" target="_blank">
            тут
          </a>
          ), надійно збережіть мнемонічну фразу (Seed Phrase) для відновлення
          ключа у майбутньому, та введіть ПУБЛІЧНИЙ ключ (Public Key) у форматі
          "ed25519:...":{" "}
          <input type="text" id="new_public_key" onChange={onTextChange} />
        </label>
      </div>
      <div>
        <label>
          {state.formError ? <b>{state.formError}</b> : null}
          <button
            onClick={createNewAccount}
            disabled={
              state.isLoading ||
              !(
                state.form.new_account_id &&
                state.form.password &&
                state.form.new_public_key
              )
            }
          >
            Створити новий акаунт
          </button>
          {state.isLoading
            ? "Ваш запит обробляється, це може займати до 10 секунд, зачекайте..."
            : null}
        </label>
      </div>
    </>
  );
} else if (state.mode === "CREATE_NEW_ACCOUNT_SUCCESS") {
  return (
    <>
      <h2>Вітаємо у ЛОЛ!</h2>
      <div>
        <label>
          {`NEAR акаунт ${state.form.new_account_id}.near успішно створено!`}
        </label>
      </div>
      <h3>
        Тепер увійдіть у свій акаунт через кнопку "Sign In", що знаходиться у
        правому верхньому куті.
      </h3>
    </>
  );
} else if (state.mode === "LINK_EXISTING_ACCOUNT") {
  if (context.accountId) {
    return (
      <>
        <h2>Вітаємо у ЛОЛ!</h2>
        <div>
          <label>
            Псевдонім (NEAR account ID), що буде зареєстровано у ЛОЛ:{" "}
            {context.accountId}
          </label>
        </div>
        <div>
          <label>
            Секретний пароль що був надісланий на електронну пошту:{" "}
            <input type="password" id="password" onChange={onTextChange} />
          </label>
        </div>
        <div>
          <label>
            {state.formError ? <b>{state.formError}</b> : null}
            <button
              onClick={linkExistingAccount}
              disabled={state.isLoading || !state.form.password}
            >
              Зареєструвати мій NEAR акаунт у ЛОЛ
            </button>
            {state.isLoading
              ? "Ваш запит обробляється, це може займати до 10 секунд, зачекайте..."
              : null}
          </label>
        </div>
      </>
    );
  } else {
    return (
      <h3>
        Спочатку увійдіть у свій NEAR акаунт через кнопку "Sign In", що
        знаходиться у правому верхньому куті, або оновіть сторінку і перейдіть
        до створення нового акаунту.
      </h3>
    );
  }
}
