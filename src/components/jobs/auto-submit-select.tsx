"use client";

import type { SelectHTMLAttributes } from "react";

/**
 * Native select that re-submits its parent GET form when the value changes,
 * so archive filters apply immediately. Without JavaScript the form's
 * visible submit button still works.
 */
export function AutoSubmitSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      onChange={(event) => {
        props.onChange?.(event);
        event.currentTarget.form?.requestSubmit();
      }}
    />
  );
}
