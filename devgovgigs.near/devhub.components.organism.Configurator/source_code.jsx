const Struct = VM.require("devgovgigs.near/widget/core.lib.struct");

if (!Struct) {
  return <p>Loading modules...</p>;
}
/* INCLUDE: "core/lib/gui/form" */
const defaultFieldUpdate = ({
  input,
  lastKnownValue,
  params: { arrayDelimiter },
}) => {
  switch (typeof input) {
    case "boolean":
      return input;

    case "object": {
      if (Array.isArray(input) && typeof lastKnownValue === "string") {
        return input.join(arrayDelimiter ?? ",");
      } else {
        return Array.isArray(lastKnownValue)
          ? [...lastKnownValue, ...input]
          : { ...lastKnownValue, ...input };
      }
    }

    case "string":
      return Array.isArray(lastKnownValue)
        ? input.split(arrayDelimiter ?? ",").map((string) => string.trim())
        : input;

    default: {
      if ((input ?? null) === null) {
        switch (typeof lastKnownValue) {
          case "boolean":
            return !lastKnownValue;

          default:
            return lastKnownValue;
        }
      } else return input;
    }
  }
};

const useForm = ({ initialValues, onUpdate, stateKey, uninitialized }) => {
  const initialFormState = {
    hasUnsubmittedChanges: false,
    values: initialValues ?? {},
  };

  const formState = state[stateKey] ?? null,
    isSynced = Struct.isEqual(formState?.values ?? {}, initialFormState.values);

  const formReset = () =>
    State.update((lastKnownComponentState) => ({
      ...lastKnownComponentState,
      [stateKey]: initialFormState,
      hasUnsubmittedChanges: false,
    }));

  const formUpdate =
    ({ path, via: customFieldUpdate, ...params }) =>
    (fieldInput) => {
      const updatedValues = Struct.deepFieldUpdate(
        formState?.values ?? {},

        {
          input: fieldInput?.target?.value ?? fieldInput,
          params,
          path,

          via:
            typeof customFieldUpdate === "function"
              ? customFieldUpdate
              : defaultFieldUpdate,
        }
      );

      State.update((lastKnownComponentState) => ({
        ...lastKnownComponentState,

        [stateKey]: {
          hasUnsubmittedChanges: !Struct.isEqual(
            updatedValues,
            initialFormState.values
          ),

          values: updatedValues,
        },
      }));

      if (
        typeof onUpdate === "function" &&
        !Struct.isEqual(updatedValues, initialFormState.values)
      ) {
        onUpdate(updatedValues);
      }
    };

  if (
    !uninitialized &&
    (formState === null || (!formState.hasUnsubmittedChanges && !isSynced))
  ) {
    formReset();
  }

  return {
    ...(formState ?? initialFormState),
    isSynced,
    reset: formReset,
    stateKey,
    update: formUpdate,
  };
};
/* END_INCLUDE: "core/lib/gui/form" */

const ValueView = styled.div`
  & > p {
    margin: 0;
  }
`;

const fieldParamsByType = {
  array: {
    name: "components.molecule.text-input",
    inputProps: { type: "text" },
  },

  boolean: {
    name: "components.atom.toggle",
  },

  string: {
    name: "components.molecule.text-input",
    inputProps: { type: "text" },
  },
};

const defaultFieldsRender = ({ schema, form, isEditable }) => (
  <>
    {Object.entries(schema).map(
      (
        [key, { format, inputProps, noop, label, order, style, ...fieldProps }],
        idx
      ) => {
        const fieldKey = `${idx}-${key}`,
          fieldValue = form.values[key];

        const fieldType = Array.isArray(fieldValue)
          ? "array"
          : typeof (fieldValue ?? "");

        const isDisabled = noop ?? inputProps.disabled ?? false;

        const viewClassName = [
          (fieldValue?.length ?? 0) > 0 ? "" : "text-muted",
          "m-0",
        ].join(" ");

        return (
          <>
            <div
              className={[
                "d-flex gap-3",
                isEditable || noop ? "d-none" : "",
              ].join(" ")}
              key={fieldKey}
              style={{ order }}
            >
              <label className="fw-bold w-25">{label}</label>

              <ValueView className={[viewClassName, "w-75"].join(" ")}>
                {format !== "markdown" ? (
                  <span>
                    {(fieldType === "array" && format === "comma-separated"
                      ? fieldValue
                          .filter((string) => string.length > 0)
                          .join(", ")
                      : fieldValue
                    )?.toString?.() || "none"}
                  </span>
                ) : (fieldValue?.length ?? 0) > 0 ? (
                  <Widget
                    // TODO: LEGACY.
                    src={
                      "devgovgigs.near/widget/devhub.components.molecule.MarkdownViewer"
                    }
                    props={{
                      text: fieldValue,
                    }}
                  />
                ) : (
                  <span>none</span>
                )}
              </ValueView>
            </div>
            <Widget
              // TODO: LEGACY.
              src={`devgovgigs.near/widget/gigs-board.${fieldParamsByType[fieldType].name}`}
              props={{
                ...fieldProps,

                className: [
                  "w-100",
                  fieldProps.className ?? "",
                  isEditable && !noop ? "" : "d-none",
                ].join(" "),

                disabled: isDisabled,
                format,
                key: `${fieldKey}--editable`,
                label,
                onChange: form.update({ path: [key] }),
                style: { ...style, order },

                value:
                  fieldType === "array" && format === "comma-separated"
                    ? fieldValue.join(", ")
                    : fieldValue,

                inputProps: {
                  ...(inputProps ?? {}),
                  disabled: isDisabled,

                  title:
                    noop ?? false
                      ? "Temporarily disabled due to technical reasons."
                      : inputProps.title,

                  ...(fieldParamsByType[fieldType].inputProps ?? {}),
                  tabIndex: order,
                },
              }}
            />
          </>
        );
      }
    )}
  </>
);

const Configurator = ({
  actionsAdditional,
  cancelLabel,
  classNames,
  externalState,
  fieldsRender: customFieldsRender,
  formatter: toFormatted,
  isValid,
  isActive,
  onCancel,
  onChange,
  onSubmit,
  schema,
  submitIcon,
  submitLabel,
}) => {
  const fieldsRender = customFieldsRender || defaultFieldsRender;

  const initialValues = Struct.typeMatch(schema)
    ? Struct.pick(externalState ?? {}, Object.keys(schema))
    : {};

  const form = useForm({ initialValues, onUpdate: onChange, stateKey: "form" });

  const formFormattedValues = toFormatted
    ? toFormatted(form.values)
    : form.values;

  const isFormValid = isValid ? isValid(formFormattedValues) : true;

  const onCancelClick = () => {
    form.reset();
    if (onCancel) onCancel();
  };

  const onSubmitClick = () => {
    if (onSubmit && isFormValid) {
      onSubmit(formFormattedValues);
    }
  };

  return (
    <div className="flex-grow-1 d-flex flex-column gap-4">
      <div className={`d-flex flex-column gap-${isActive ? 1 : 4}`}>
        {fieldsRender({
          form,
          isEditable: isActive,
          schema,
        })}
      </div>
      {isActive && (
        <div className="d-flex align-items-center justify-content-end gap-3 mt-auto">
          {actionsAdditional ? (
            <div className="me-auto">{actionsAdditional}</div>
          ) : null}

          <Widget
            src={"devgovgigs.near/widget/devhub.components.molecule.Button"}
            props={{
              classNames: { root: "btn-outline-danger shadow-none border-0" },
              label: cancelLabel || "Cancel",
              onClick: onCancelClick,
            }}
          />
          <Widget
            src={"devgovgigs.near/widget/devhub.components.molecule.Button"}
            props={{
              classNames: { root: classNames.submit || "btn-success" },
              disabled: !form.hasUnsubmittedChanges || !isFormValid,
              icon: submitIcon || {
                type: "bootstrap_icon",
                variant: "bi-check-circle-fill",
              },
              label: submitLabel || "Submit",
              onClick: onSubmitClick,
            }}
          />
        </div>
      )}
    </div>
  );
};

return Configurator(props);
