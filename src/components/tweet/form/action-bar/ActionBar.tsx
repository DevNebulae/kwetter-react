import * as React from "react";
import { RowSpacer } from "../../../layout/row-spacer/RowSpacer";

import "./styles.css";

interface Props {
  characterLimit?: number;
  onSubmit: () => void;
}

export const ActionBar: React.StatelessComponent<Props> = ({
  characterLimit,
  onSubmit
}) => (
  <div className="tweet__form__action-bar">
    <span>{characterLimit}</span>

    <RowSpacer />

    <button type="button" onClick={onSubmit}>
      Tweet
    </button>
  </div>
);
